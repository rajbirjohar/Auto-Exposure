import { nanoid } from "nanoid";

export async function getPosts(db, from = new Date(), by, limit) {
  return db
    .collection("posts")
    .find({
      // Pagination: Fetch posts from before the input date or fetch from newest
      ...(from && {
        createdAt: {
          $lte: from,
        },
      }),
      ...(by && { creatorId: by }),
    })
    .sort({ createdAt: -1 })
    .limit(limit || 10)
    .toArray();
}

export async function insertPost(db, { caption, postPicture, creatorId }) {
  return db
    .collection("posts")
    .insertOne({
      _id: nanoid(12),
      caption,
      creatorId,
      postPicture,
      createdAt: new Date(),
    })
    .then(({ ops }) => ops[0]);
}
