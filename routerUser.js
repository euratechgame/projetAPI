const express = require('express'),
    router = express.Router();
const db = require('./database');
const url = require('url');
const querystring = require('querystring');
const ObjectId = require('mongodb').ObjectID;



// GET

// Get all users

router.get('/users', (req, res, next) => {

    const localdb = db.client.db(process.env.DB_NAME);
    const collection = localdb.collection(process.env.COLL_USER);

    const parsed = url.parse(req.url);
    const query = querystring.parse(parsed.query);
    
    if (query.email != undefined) {
        collection.findOne({"email": query.email}, function(err, docs) {
            if (err) throw err
            res.status(200).send(docs);
        });
    } else {
        collection.find({}).toArray(function(err, docs) {
            if (err) throw err
            res.status(200).send(docs);
        });

    }
});

// Get an user dy his/her id

router.get('/users/:id', (req, res, next) => {
    let id = req.params.id
    const localdb = db.client.db(process.env.DB_NAME);
    const collection = localdb.collection(process.env.COLL_USER);
    collection.findOne({ "_id": ObjectId(id) }, function (err, docs) {
        if (err) throw err
        res.status(200).send(docs);
    });
});

//  POST

// create a user in db

router.post('/users', (req, res, next) => {
    const localdb = db.client.db(process.env.DB_NAME);
    const collection = localdb.collection(process.env.COLL_USER);
    let newUser = req.body;
    collection.insertOne(newUser, function (err) {
        if (err) throw err
        res.status(201).send("OK");
       
    });
});

// PUT

router.put('/users/:id', (req, res, next) => {
    let id = req.params.id
    const localdb = db.client.db(process.env.DB_NAME);
    const collection = localdb.collection(process.env.COLL_USER);
    collection.updateOne({  "_id": ObjectId(id) }, { $set: req.body }, function (err) {
        if (err) throw err
        res.status(201).send(true);
    });
});

//DELETE

// delete an user by his/her email

router.delete('/users', (req, res, next) => {

    const localdb = db.client.db(process.env.DB_NAME);
    const collection = localdb.collection(process.env.COLL_USER);

    const parsed = url.parse(req.url);
    const query = querystring.parse(parsed.query);
   
    collection.deleteOne({"email": query.email}, function(err) {
            if (err) throw err
            res.status(200).send(true);
        });
  
       
});

// delete an user by his/her id

router.delete('/users/:id', (req, res, next) => {
    let id = req.params.id;
    const localdb = db.client.db(process.env.DATABASE);
    const collection = localdb.collection(process.env.COLL_USER);
    collection.deleteOne({ "_id": ObjectId(id) }, function (err) {
        if (err) throw err
        res.status(200).send(true);
    })
});


module.exports = router;