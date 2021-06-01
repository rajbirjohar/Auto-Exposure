import nc from "next-connect";
import { all } from "@/middlewares/index";
import multer from "multer";
import { updatePost, deleteElement, deletePost } from "@/db/index";
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
