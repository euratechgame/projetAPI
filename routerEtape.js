const express = require('express'),
    router = express.Router();
const db = require('./database');
const url = require('url');
const querystring = require('querystring');
const ObjectId = require('mongodb').ObjectID;


// GET

router.get('/etapes', (req, res, next) => {

    const localdb = db.client.db(process.env.DB_NAME);
    const collection = localdb.collection(process.env.COLL_ETAPE);
    collection.find({}).toArray(function (err, docs) {
        if (err) throw err
        res.status(200).send(docs);
    });
});


router.post('/etapes', (req, res, next) => {
    const localdb = db.client.db(process.env.DB_NAME);
    const collection = localdb.collection(process.env.COLL_ETAPE);
    let newEtape = req.body;
    collection.insertOne(newEtape, function (err) {
        if (err) throw err
        res.status(201).send("OK");
       
    });
});

// router.delete('/todos/:id', (req, res, next) => {
//     let id = req.params.id;
//     const localdb = db.client.db(process.env.DATABASE);
//     const collection = localdb.collection(collectionTodos);
//     collection.deleteOne({ "_id": ObjectId(id) }, function (err) {
//         if (err) throw err
//         collection.find({}).toArray(function (err, docs) {
//             if (err) throw err
//             res.status(200).send(docs);
//         });
//     })
// });

// router.delete('/todos', (req, res, next) => {
//     const parsed = url.parse(req.url);
//     const query = querystring.parse(parsed.query);
//     const localdb = db.client.db(process.env.DATABASE);
//     const collection = localdb.collection(collectionTodos);
//     const completed = JSON.parse(query.completed)
//     collection.deleteMany({ "completed": completed }, function (err) {
//         if (err) throw err
//         collection.find({}).toArray(function (err, docs) {
//             if (err) throw err
//             res.status(200).send(docs);
//         });
//     })
// });

// router.put('/todos/:id', (req, res, next) => {
//     let id = req.params.id
//     const localdb = db.client.db(process.env.DATABASE);
//     const collection = localdb.collection(collectionTodos);
//     collection.updateOne({  "_id": ObjectId(id) }, { $set: req.body }, function (err) {
//         if (err) throw err
//         collection.find({}).toArray(function (err, docs) {
//             if (err) throw err
//             res.status(200).send(docs);
//         });
//     });

// });

module.exports = router;