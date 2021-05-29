import nc from "next-connect";
import { all } from "@/middlewares/index";
import multer from "multer";
import { getPosts, insertPost, updatePost } from "@/db/index";
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
  const posts = await getPosts(
    req.db,
    req.query.from ? new Date(req.query.from) : undefined,
    req.query.by,
    req.query.limit ? parseInt(req.query.limit, 10) : undefined
  );
  if (req.query.from && posts.length > 0) {
    // This is safe to cache because from defines
    //  a concrete range of posts
    res.setHeader("cache-control", `public, max-age=${maxAge}`);
  }
  res.send({ posts });
});

handler.post(upload.single("postPicture"), async (req, res) => {
  // handler.post(async (req, res) => {
  console.log("In post upload...");
  let postPicture;
  if (req.file) {
    const image = await cloudinary.uploader.upload(req.file.path);
    postPicture = image.secure_url;
  }
  if (!req.body.caption) {
    return res.status(400).send("You must write something");
  } if (!req.body.postPicture)
    return res.status(400).send("You must upload a url");

  const post = await insertPost(req.db, {
    caption: req.body.caption,
    creatorId: req.user._id,
    likes: [],
    postPicture: req.body.postPicture,
  });
  //console.log(req.post._id)

  return res.json({ post });
});

handler.patch(async (req, res) => {
  if (!req.user) {
    req.status(401).end();
    return;
  }

  console.log(req.body);
  const postId = req.body;
  const { _id } = req.user;

  const like = await updatePost(req.db, {
    postId: postId,
    id: _id
  });

  //res.json({ post: extractPost(like) });
  //console.log(req.post.count);
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
