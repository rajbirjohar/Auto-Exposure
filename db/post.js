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
      likes: [],
      createdAt: new Date(),
    })
    .then(({ ops }) => ops[0]);
}

export async function findPostById(db, userId) {
  return db
    .collection("posts")
    .findOne({
      _id: userId,
    })
    .then((post) => post || null);
}

export async function updatePost(db, { postId, id }) {
  return db
    .collection('posts').updateOne(
      { "_id": postId },
      { $push: { "likes": id } })
    .then(({ value }) => value);
}

export async function insertComment(db, { postId, message }) {
  return db
    .collection('posts').updateOne(
      { "_id": postId },
      { $push: { "comments": message } })
    .then(({ value }) => value);
}

export async function deleteElement(db, { postId, id }) {
  return db
    .collection('posts').updateOne(
      { "_id": postId },
      { $pull: { "likes": id } })
    .then(({ value }) => value);
}

export async function deletePost(db, { postId }) {
  return db
    .collection("posts")
    .deleteOne({
      "_id": postId,
    })
    .then(({ value }) => value);
}
