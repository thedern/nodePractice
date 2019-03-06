const mongoose = require('mongoose');

// schema
const Schema = mongoose.Schema;

// eliminate "DeprecationWarning: collection.ensureIndex is deprecated. Use createIndexes instead"
mongoose.set('useCreateIndex', true);

// create geolocation schema to locate nearby ninjas
const GeoSchema = new Schema({
    type: {
        type: "String",
        default: "Point"
    },
    coordinates: {
        type: [Number],

        /* 
         takes into account circumference of globe 
         as no two points are in a perfect line
        */
        index: "2dsphere"
    }
});


// create schema object

/* 
    schema oject conatains a number of JSON objects.
    the values of the name/value pairs are themselves
    objects
*/

const NinjaSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name field required']
    },

    rank: {
        type: String
    },

    available: {
        type: Boolean,
        default: false
    },

    geometry: GeoSchema
});

// create Model ==> ninja collection in DB, based on NinjaSchema
const Ninja = mongoose.model('ninja', NinjaSchema);

// export Ninja model for use by other files
module.exports = Ninja;

