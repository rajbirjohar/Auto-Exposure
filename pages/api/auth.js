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
    collection.findOne({email}, callback);
}

function authUser(db, email, password, hash, callback) {
    const collection = db.collection('user');
    bcrypt.compare(password, hash, callback);
}

export default(req, res) => {
    if (req.method === 'POST') {
        try {
            assert.notEqual(null, req.body.email, 'Your email is required');
            assert.notEqual(null, req.body.password, 'Your password is required');
        } 
        catch (bodyError) {
            res.status(403).send(bodyError.message);
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
                res.status(404).json({error: true, message: 'The user was not found'});
            }
            else{
                authUser(db, email, password, user.password, function(err, match) {
                    if (err) {
                        res.status(500).json({error: true, message: "Authentication Failed"});
                    }
                    if (match) {
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
                    else {
                        res.status(401).json({error: true, message: "Authentication Failed"});
                        return;
                    }
                });
            }
          });
        });
    }
    else {
        res.statusCode = 401;
        res.end();
    }
};