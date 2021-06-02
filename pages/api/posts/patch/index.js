import nc from "next-connect";
import { all } from "@/middlewares/index";
import multer from "multer";
import {
  getPosts,
  insertComment,
  updatePost,
  deleteElement,
  deletePost,
  getComments,
} from "@/db/index";
import { ReplSet } from "mongodb";
import { extractPost } from "@/lib/api-helpers";
import { v2 as cloudinary } from "cloudinary";

const upload = multer({ dest: "/tmp" });
const handler = nc();

const {
  hostname: cloud_name,
  username: api_key,
  password: api_secret,
} = new URL(process.env.CLOUDINARY_URL);

cloudinary.config({
  cloud_name,
  api_key,
  api_secret,
});

handler.use(all);

const maxAge = 1 * 24 * 60 * 60;

handler.get(async (req, res) => {
  const posts = await getComments(req.db, req.query.id);
  if (req.query.from && posts.length > 0) {
    // This is safe to cache because from defines
    //  a concrete range of posts
    res.setHeader("cache-control", `public, max-age=${maxAge}`);
  }
  res.send({ posts });

  // const posts = await getPosts(
  //     req.db,
  //     req.query.from ? new Date(req.query.from) : undefined,
  //     req.query.by,
  //     req.query.limit ? parseInt(req.query.limit, 10) : undefined
  // );
  // if (req.query.from && posts.length > 0) {
  //     // This is safe to cache because from defines
  //     //  a concrete range of posts
  //     res.setHeader("cache-control", `public, max-age=${maxAge}`);
  // }
  // res.send({ posts })
});

handler.post(async (req, res) => {
  // handler.post(async (req, res) => {
  console.log("In message upload...");
  //console.log(req.body);
  if (!req.body.message) return res.status(400).send("You must type a message");
  const { postId, message } = req.body;
  //const { _id } = req.user;

  const msg = await insertComment(req.db, {
    message: message,
    creatorId: req.user._id,
    postId: postId,
  });
  //console.log(req.post._id)

  return res.json({ msg });
});

handler.patch(async (req, res) => {
  if (!req.user) {
    req.status(401).end();
    return;
  }

  console.log(req.body.postId);
  const { _id } = req.user;
  const { postId, choice } = req.body;

  if (choice === "Add") {
    const like = await updatePost(req.db, {
      postId: postId,
      id: _id,
    });
  } else if (choice === "Remove") {
    const like = await deleteElement(req.db, {
      postId: postId,
      id: _id,
    });
  }
});

handler.delete(async (req, res) => {
  console.log(req.body);
  const del = await deletePost(req.db, {
    postId: req.body.postId,
  });
  return res.status(200).send("Uploaded");
});

export default handler;
