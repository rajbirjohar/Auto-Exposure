const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const bcrypt = require('bcrypt');
const v4 = require('uuid').v4;
const jwebtok = require('jsonwebtoken');
const jwebtokSecret = 'SUPERSECRET2021';

const saltRounds = 5;
const dbName = 'auto-exposure-db'
const url = 'mongodb+srv://danial:autoexposure@auto-exposure.d7v4d.mongodb.net/test';

const client = new MongoClient(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

function findUser(db, email, callback) {
    const collection = db.collection('user');
    bcrypt.hash(password, saltRounds, function(err, hash) {
        collection.insertOne(
            {
                userId: v4(),
                email,
                password: hash,
            },
            function(err, userCreated) {
                assert.equal(err, null);
                callback(userCreated);
            },
        );
    });
}

export default (req, res) => {
    if (req.method === 'POST') {
      try {
        assert.notEqual(null, req.body.email, 'Your email is required');
        assert.notEqual(null, req.body.password, 'Your password is required');
      } 
      catch (bodyError) {
        res.status(403).json({error: true, message: bodyError.message});
      }
  
      client.connect(function(err) {
        assert.equal(null, err);
        console.log('Connected to the server');
        const db = client.db(dbName);
        const email = req.body.email;
        const password = req.body.password;
  
        findUser(db, email, function(err, user) {
          if (err) {
            res.status(500).json({error: true, message: 'There was an error finding the user'});
            return;
          }
          if (!user) {
            createUser(db, email, password, function(creationResult) {
              if (creationResult.ops.length === 1) {
                const user = creationResult.ops[0];
                const token = jwebtok.sign(
                  {userId: user.userId, email: user.email},
                  jwebtokSecret,
                  {
                    expiresIn: 1000,
                  },
                );
                res.status(200).json({token});
                return;
              }
            });
          } else {
            res.status(403).json({error: true, message: 'The email already exists'});
            return;
          }
        });
      });
    }
  };
  