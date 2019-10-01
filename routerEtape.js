const express = require('express'),
    router = express.Router();
const db = require('./database');
const url = require('url');
const querystring = require('querystring');
const ObjectId = require('mongodb').ObjectID;


// GET ALL

router.get('/etapes', (req, res, next) => {

    const localdb = db.client.db(process.env.DB_NAME);
    const collection = localdb.collection(process.env.COLL_ETAPE);
    collection.find({}).toArray(function (err, docs) {
        if (err) throw err
        res.status(200).send(docs);
    });
});

// GET ONE

router.get('/etapes/:id', (req, res, next) => {
    let id = req.params.id
    const localdb = db.client.db(process.env.DB_NAME);
    const collection = localdb.collection(process.env.COLL_ETAPE);
    collection.findOne({ "_id": ObjectId(id) }, function (err, docs) {
        if (err) throw err
        res.status(200).send(docs);
    });
});

// POST ONE

router.post('/etapes', (req, res, next) => {
    const localdb = db.client.db(process.env.DB_NAME);
    const collection = localdb.collection(process.env.COLL_ETAPE);
    let newEtape = req.body;
    collection.insertOne(newEtape, function (err) {
        if (err) throw err
        res.status(201).send(true);
       
    });
});

// DELETE ONE

router.delete('/etapes/:id', (req, res, next) => {
    let id = req.params.id;
    const localdb = db.client.db(process.env.DB_NAME);
    const collection = localdb.collection(process.env.COLL_ETAPE);
    collection.deleteOne({ "_id": ObjectId(id) }, function (err) {
        if (err) throw err
        res.status(200).send(true)
    
    })
});

// PUT ONE

router.put('/etapes/:id', (req, res, next) => {
    let id = req.params.id
    const localdb = db.client.db(process.env.DB_NAME);
    const collection = localdb.collection(process.env.COLL_ETAPE);
    collection.updateOne({  "_id": ObjectId(id) }, { $set: req.body }, function (err) {
        if (err) throw err
        res.status(201).send(true);
    });

});

module.exports = router;