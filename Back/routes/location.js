const express = require('express');
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
require('dotenv').config();

const router = express.Router();

const client = new MongoClient(process.env.MONGODB_URI);

const locationStorage = {
    locations: []
};

router.post('/add-location', (req, res, next) => {
    const id = Math.random();
    client.connect(function (err, client) {
        const db = client.db('Locations');

        // Insert a single document
        db.collection('locations').insertOne(
            {
                address: req.body.address,
                coords: {lat: req.body.lat, lng: req.body.lng}
            },
            function (err, r) {
              res.json({message: 'Stored location!', locId: r.insertedId})
            });
    });
});

router.get('/location/:locId', (req, res, next) => {
    const locationId = req.params.locId;

  client.connect(function (err, client) {
    const db = client.db('Locations');

    // Insert a single document
    db.collection('locations').findOne(
        {
          _id: new mongodb.ObjectId(locationId)
        },
        function (err, doc) {
          if (!doc) {
            res.status(404).json({message: 'not found!'})
          }
          res.json({address: doc.address, coordinates: doc.coords});
        });
  });
});

module.exports = router;
