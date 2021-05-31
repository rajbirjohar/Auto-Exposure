import nc from "next-connect";
import { all } from "@/middlewares/index";
import { findPostById } from "@/db/index";
import { extractPost, extractUser } from "@/lib/api-helpers";

const handler = nc();

handler.use(all);

const maxAge = 4 * 60 * 60; // 4 hours

handler.get(async (req, res) => {
    // const post = extractPost(await findPostById(req.db, req.query.userId));
    const post = await findPostById(req.db, req.query.userId);
    if (post) res.setHeader("cache-control", `public, max-age=${maxAge}`);
    res.send({ post });
});

export default handler;