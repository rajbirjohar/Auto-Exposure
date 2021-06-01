import nc from "next-connect";
import { all } from "@/middlewares/index";
import multer from "multer";
import { deletePost, getPosts, insertPost } from "@/db/index";
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
  // console.log(req.body);
  let postPicture;
  if (req.file) {
    if (
      !(
        req.file.mimetype === "image/png" ||
        req.file.mimetype === "image/jpeg" ||
        req.file.mimetype === "image/jpg"
      )
    ) {
      return res.status(415).send("Your image must be a png or jpg/jpeg");
    }
    const image = await cloudinary.uploader.upload(req.file.path);
    postPicture = image.secure_url;
  }
  if (!req.body.caption) {
    return res.status(400).send("You must write something");
  }
  // if (!req.body.postPicture)
  //   return res.status(400).send("You must upload a url");
  const post = await insertPost(req.db, {
    caption: req.body.caption,
    creatorId: req.user._id,
    postPicture: postPicture,
  });

  return res.json({ post });
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
