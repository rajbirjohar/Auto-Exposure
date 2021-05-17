const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");
const bcrypt = require("bcryptjs");
const v4 = require("uuid").v4;
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;

// const saltRounds = 10;
const url = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB;

const client = new MongoClient(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

function createPost(db, name, username, caption, image_url, callback) {
  const collection = db.collection("posts");
  collection.insertOne(
    {
      postId: v4(),
      name,
      username,
      caption,
      image_url,
    },
    function (err, postCreated) {
      assert.equal(err, null);
      callback(postCreated);
    }
  );
}

export default (req, res) => {
  if (req.method === "POST") {
    // signup
    try {
      assert.notEqual(null, req.body.name, "Name required");
      assert.notEqual(null, req.body.username, "Username required");
      assert.notEqual(null, req.body.caption, "Caption required");
      assert.notEqual(null, req.body.image_url, "Image url required");
    } catch (bodyError) {
      res.status(403).json({ error: true, message: bodyError.message });
    }

    client.connect(function (err) {
      assert.equal(null, err);
      console.log("Connected to MongoDB server =>");
      const db = client.db(dbName);
      const name = req.body.name;
      const username = req.body.username;
      const caption = req.body.caption;
      const image_url = req.body.image_url;

      createPost(
        db,
        name,
        username,
        caption,
        image_url,
        function (creationResult) {
          if (creationResult.ops.length === 1) {
            const post = creationResult.ops[0];
            const token = jwt.sign(
              {
                postId: post.postId,
                username: post.username,
                caption: post.caption,
                image_url: post.image_url,
              },
              jwtSecret,
              {
                expiresIn: 3000, //50 minutes
              }
            );
            res.status(200).json({ token });
            return;
          }
        }
      );
    });
  } else {
    // Handle any other HTTP method
    res.status(200).json({ users: ["John Doe"] });
  }
};
