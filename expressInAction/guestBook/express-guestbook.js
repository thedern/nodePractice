// requires
var express = require('express');
var logger = require('morgan');
var bodyParser = require('body-parser');
var path = require('path');

// create express app
var app = express();

// set views engine
app.set("views", path.resolve(__dirname, "views"));

// view is singular when setting the engine
app.set("view engine", "ejs");

// create global
var entries = [];

// make array available to all views
app.locals.entries = entries;

// middleware
app.use(logger('dev'));

// post request body parser. allows access to req.body (extended: false, dont follow tree path)
app.use(bodyParser.urlencoded({extended: false}));

// routes
app.get('/', (req, resp) => {
    resp.render('index');
});

app.get('/new-entry', (req, resp) => {
    resp.render('new-entry');
});

app.post('/new-entry', (req, resp) => {
    // if user submits with no title or body
    if(!req.body.title || !req.body.body) {
        resp.status(400).send('Entries must have a title and a body.');
        return;
    }
    // populate array
    entries.push({
        title: req.body.title,
        content: req.body.body,
        published: new Date()
    });
    // redirect back to home page
    resp.redirect('/');
});

app.listen(4000, () => {
    console.log('guestbook started on tcp port 4000');
})