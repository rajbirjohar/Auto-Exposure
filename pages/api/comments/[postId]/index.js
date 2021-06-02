import nc from "next-connect";
import { all } from "@/middlewares/index";
import { findPostById, deleteComment } from "@/db/index";
import { extractPost, extractUser } from "@/lib/api-helpers";

const handler = nc();

handler.use(all);

const maxAge = 4 * 60 * 60; // 4 hours

handler.get(async (req, res) => {
  // const post = extractPost(await findPostById(req.db, req.query.userId));
  //console.log(req.query);
  const post = await findPostById(req.db, req.query.userId);
  //console.log("In API post");
  //console.log(post);
  if (post) res.setHeader("cache-control", `public, max-age=${maxAge}`);
  res.send({ post });
});

handler.delete(async (req, res) => {
  const del = await deleteComment(req.db, {
    postId: req.body.postId,
  });
  return res.status(200).send("Uploaded");
});

export default handler;
