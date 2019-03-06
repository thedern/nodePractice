// main.js uses routes/api_router
var express = require('express');
var path = require('path');

// import the router mini app from ./routes/api_router
var apiRouter = require('./routes/api_router');

// create express application
var app = express();

/* ==========================================================================
   Middleware
   ========================================================================== */

// create path to static files
var staticPath = path.resolve(__dirname, 'staticFiles');
// any URL that contains '/nonAPI' will be served content from the staticFiles dir
app.use('/nonAPI', express.static(staticPath));

// use imported requires router, send all requests for '/api' to the api router.
app.use('/api', apiRouter);


/* ==========================================================================
   start the server
   ========================================================================== */

// start the server
app.listen(3000);