const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");
const bcrypt = require("bcryptjs");
const v4 = require("uuid").v4;
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;

const saltRounds = 10;
const url = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB;

const client = new MongoClient(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

function findUser(db, email, username, callback) {
  const collection = db.collection("user");
  collection.findOne({ username }, callback);
}

function createUser(db, email, password, username, callback) {
  const collection = db.collection("user");
  bcrypt.hash(password, saltRounds, function (err, hash) {
    // Store hash in your password DB.
    collection.insertOne(
      {
        userId: v4(),
        email,
        password: hash,
        username,
      },
      function (err, userCreated) {
        assert.equal(err, null);
        callback(userCreated);
      }
    );
  });
}

export default (req, res) => {
  if (req.method === "POST") {
    // signup
    try {
      assert.notEqual(null, req.body.email, "Email required");
      assert.notEqual(null, req.body.password, "Password required");
      assert.notEqual(null, req.body.username, "Username required");
    } catch (bodyError) {
      res.status(403).json({ error: true, message: bodyError.message });
    }

    // verify email does not exist already
    client.connect(function (err) {
      assert.equal(null, err);
      console.log("Connected to MongoDB server =>");
      const db = client.db(dbName);
      const email = req.body.email;
      const password = req.body.password;
      const username = req.body.username;

      findUser(db, email, username, function (err, user) {
        if (err) {
          res.status(500).json({ error: true, message: "Error finding User" });
          return;
        }
        if (!user) {
          // proceed to Create
          createUser(db, email, password, username, function (creationResult) {
            if (creationResult.ops.length === 1) {
              const user = creationResult.ops[0];
              const token = jwt.sign(
                { userId: user.userId, email: user.email, username: user.username },
                jwtSecret,
                {
                  expiresIn: 3000, //50 minutes
                }
              );
              res.status(200).json({ token });
              return;
            }
          });
        } else {
          // User exists
          res.status(403).json({ error: true, message: "Email exists" });
          return;
        }
      });
    });
  } else {
    // Handle any other HTTP method
    res.status(200).json({ users: ["John Doe"] });
  }
};
