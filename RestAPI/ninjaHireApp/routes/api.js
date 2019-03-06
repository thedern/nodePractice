// require express
const express = require('express');

// create express router object
const router = express.Router();

// require ninja model, which provides the structure of the ninja object
const Ninja = require('../models/ninja');

/* ==========================================================================
   Mount routes below using express Router object
   ========================================================================== */

router.get('/ninjas', (req, resp, next) => {
    /* select all
        Ninja.find({}).then((req, resp, next) => {
            resp.send(ninjas);
    }); */

    /* 
     url query string to provide coordinates
     use goeNear to find ninjas near what is pass in
     following code from tutorial causes error 'geoNear' not a function
    
     Ninja.geoNear({type: 'Point', coordinates: [parseFloat(req.query.lng), parseFloat(req.query.lat)]}, {maxDistance: 100000, spherical: true}).then((ninjas) => {
        resp.send(ninjas);
    });

    use the following instead: https://github.com/iamshaunjp/rest-api-playlist/issues/13
    */
    Ninja.aggregate([{ $geoNear: { near: { type: 'Point', coordinates: [parseFloat(req.query.lng), parseFloat(req.query.lat)] }, 
                                   spherical: true, 
                                   maxDistance: 100000, 
                                   distanceField: "dist.calculated" } }]).then((ninjas) => { resp.send(ninjas); }).catch(next);
    });

router.post('/ninjas', (req, resp, next) => {
    /* 
     use mongoose's create method to create a new ninja 
     based on req.body (via body-parser middleware in index.js)
     and automatically save record to database.
     use promise with callback function (arrow) to send 
     a response back to client when save is complete
    */ 
    Ninja.create(req.body).then((ninja) => {
        resp.send(ninja);

    // if error catch and go to 'next' middleware defined in index.js
    }).catch(next);
});

router.put('/ninjas/:id', (req, resp, next) => {
    /* 
     finds record by id that is passed in via the url, 
     and updates the record via the req.body
    */
    Ninja.findByIdAndUpdate({_id: req.params.id}, req.body).then(() => {
        /* 
         re-find updated ninja and send output. 
         Do this else will send record with pre-updated data
        */
        Ninja.findOne({_id: req.params.id}).then((ninja) => {
            resp.send(ninja);
        });
    }); // end outer callback
});

router.delete('/ninjas/:id', (req, resp, next) => {
    // findByIdAndRemove is a method from mongoose, returns record removed in promise
    Ninja.findByIdAndRemove({_id: req.params.id}).then((ninja) => {
        resp.send(ninja);
    });
});

// export router for use by index.js
module.exports = router;