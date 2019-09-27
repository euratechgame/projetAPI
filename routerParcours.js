const express = require('express'),
    router = express.Router();
const db = require('./database');
const url = require('url');
const querystring = require('querystring');
const ObjectId = require('mongodb').ObjectID;



// GET

router.get('/parcours', (req, res, next) => {

    const localdb = db.client.db(process.env.DB_NAME);
    const collection = localdb.collection(process.env.COLL_PARCOURS);
    collection.find({}).toArray(function (err, docs) {
        if (err) throw err
        res.status(200).send(docs);
    });
});

router.get('/parcours/:id', (req, res, next) => {
    let id = req.params.id
    const localdb = db.client.db(process.env.DB_NAME);
    const collection = localdb.collection(process.env.COLL_PARCOURS);
    collection.findOne({ "_id": ObjectId(id)}, function (err, docs) {
        if (err) throw err
        res.status(200).send(docs);
    });
});

router.post('/parcours', (req, res, next) => {
    const localdb = db.client.db(process.env.DB_NAME);
    const collection = localdb.collection(process.env.COLL_PARCOURS);
    let newParcours = req.body;
    collection.insertOne(newParcours, function (err) {
        if (err) throw err
        res.status(201).send("OK");
       
    });
});


router.delete('/parcours/:id', (req, res, next) => {
    let id = req.params.id;
    const localdb = db.client.db(process.env.DATABASE);
    const collection = localdb.collection(process.env.COLL_PARCOURS);
    collection.deleteOne({ "_id": ObjectId(id) }, function (err) {
        if (err) throw err
        res.status(200).send(true);
    })
});



// router.put('/todos/:id', (req, res, next) => {
//     let id = req.params.id
//     const localdb = db.client.db(process.env.DATABASE);
//     const collection = localdb.collection(process.env.COLL_PARCOURS);
//     collection.updateOne({  "_id": ObjectId(id) }, { $set: req.body }, function (err) {
//         if (err) throw err
//         res.status(201).send(true);
//     });
// });

module.exports = router;