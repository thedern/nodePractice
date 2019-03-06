// requires
const express = require('express'); 
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// create express application
const app = express();

/*
 connect to mongo db.  If the db does not exist yet
 mongoose creates it for us.  Overwrite depricated
 mongo promise with global promise
 { useNewUrlParser: true } fixes body-parser deprication error
*/
mongoose.connect('mongodb://localhost/ninjago', { useNewUrlParser: true });
mongoose.Promise = global.Promise;

// staic route folder
app.use(express.static('public'));

/*
 body parser middleware (must go before routes)
 this will give us access to the request body
 and pass that to the routes middlware
*/
app.use(bodyParser.json());

/*
 routes are NOT placed in the index file, see 'routes folder'
 can combine the app's use method with the require statement for routes
 to produce more concise.
 */
app.use('/api', require('./routes/api'));

/*
 error handler middleware
 this is a custom handler which can take up to 4 arguments
 must be placed after the routes as it handles errors due
 to routed requests.
*/

app.use((err, req, resp, next) => {
    // send status coude and message from err object
    // console.log(err);
    resp.status(422).send({error: err.message});
});

// listener, start express application
app.listen(process.env.port || 4000, () => {
    console.log('applications server running');
});


