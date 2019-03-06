var express = require('express');
var path = require('path');
var fs = require('fs');
var logger = require('morgan');


/* 
    this express app will be made of 3 functions (in order)
    - logger
    - static file sender
    - 404 handler
*/

// create express app
var app = express();


/* ==========================================================================
   Middleware
   ========================================================================== */

// create custom logger
// 'next' is required cuz express/node is asynchronous and we need to manually tell express what to do next
/*
app.use( (req, resp, next) => {
    console.log(`request IP:  ${req.url}`);
    console.log(`request date:  ${new Date()}`);
    next();
});
*/

// use morgan logger
app.use(logger('short'));

// custom serve static files middlware
/*
app.use((req, resp, next) => {
    let filePath = path.join(__dirname, 'static', req.url);
    // fs.stat will get information about the file
    fs.stat(filePath, (err, fileInfo) => {
        // if fs.stat fails, go to next middleware
        if (err) {
            next();
            return;
        }

        if (fileInfo.isFile()) {
            // if file exists, send it (there is also isDirectory())
            console.log(fileInfo);
            resp.sendFile(filePath);
        } else {
            next();
        }
    });
});
*/


/* 
    express built in serve static files middleware (replacement for custom function above)
    does the same as the code above but faster, more securely, with less code
    allowas access to all static file in the dir named. Checks for existance, file info etc
*/
var staticPath = path.join(__dirname, 'static');
app.use(express.static(staticPath));

// error message for no file
app.use( (req, resp) => {
    resp.status(404);
    resp.send("file not found");
});

/* ==========================================================================
   Start Server
   ========================================================================== */

app.listen(3000, () => {
    console.log('server started on port 3000');
});




