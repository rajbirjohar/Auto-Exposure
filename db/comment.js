import { nanoid } from "nanoid";

export async function getComments(db, id) {
  return db
    .collection("comments")
    .find({
      postId: id,
    })
    .sort({ createdAt: -1 })
    .toArray();
}

export async function insertComment(db, { postId, message, creatorId }) {
  return db
    .collection("comments")
    .insertOne({
      _id: nanoid(12),
      message,
      creatorId,
      postId,
      createdAt: new Date(),
    })
    .then(({ ops }) => ops[0]);
}
