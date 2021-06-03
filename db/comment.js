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

export async function deleteComments(db, id) {
  return db
    .collection("comments")
    .deleteMany({
      postId: id,
    })
    .then(({ value }) => value);
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

export async function deleteComment(db, { postId }) {
  return db
    .collection("comments")
    .deleteOne({
      _id: postId,
    })
    .then(({ value }) => value);
}
