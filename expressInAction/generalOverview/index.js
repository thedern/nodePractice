var express = require('express');
var app = express();
var logger = require('morgan');
var path = require('path');

// middleware Examples (stack runs in order)

/*  middlware (denoted by app.use)
    passive, no changes to req/resp
    active, alters req/resp
    next() is required in order to go to next function
    must be passed as a function arguement */


/* hand-made logger
app.use( (req, resp, next) => {
    console.log('here comes a request to ' + req.url);        
    next();
});
*/

// set ejs as views engine
app.set('views', path.resolve(__dirname, 'views'));
app.set('view engine', 'ejs');

/* static path resolution with express built-in 'static'
   this could be used to serve static files such as images 
   path.resolve accounts for cross platform (win/posix)*/
var publicPath = path.resolve(__dirname, 'public');
app.use(express.static(publicPath));
// http://localhost:4000/me.jpg  - will display

/* 3rd party plugin logger using 'morgan' */
app.use(logger('short'));

// active middleware interferes with req/resp
// for example: this middlware only serves a response on an even numbered minute
/*
app.use((req, resp, next) => {
    var min = (new Date()).getMinutes();
    if ((min % 2) === 0) {
        next();
    } else {
        resp.statusCode = 403;
        resp.end('forbidden');
    }
});
*/


// response middleware
/*
app.use( (req, resp) => {
    // any request for '/' responds with 'hello!'
    resp.end('hello!');

    // can redirect responses as well, should try this with FriendFinder for /api/friends endpoint
    //resp.redirect('http://thedern.github.io');
    
    
});
*/

app.get('/test1', (req, resp) => {
    // use render, tell it page and data in the form of an object
    resp.render('index', {message: 'hey this is a message created via ejs templating'});
});

app.listen(4000);