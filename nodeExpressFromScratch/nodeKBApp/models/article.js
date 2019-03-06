
// requires
const mongoose = require('mongoose');

// eliminate "DeprecationWarning: collection.ensureIndex is deprecated. Use createIndexes instead"
mongoose.set('useCreateIndex', true);

// create schema
let articleSchema = mongoose.Schema({
    title : {
        type: String,
        required: true
    },
    author : {
        type: String,
        required: true
    },
    body : {
        type: String,
        required: true
    }
});

// create model
let Article = mongoose.model('Article', articleSchema);

// export model for use
module.exports = Article;
