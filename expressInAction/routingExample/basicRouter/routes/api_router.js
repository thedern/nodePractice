var express = require('express');

// configure allowed IPs
var ALLOWED_IPS = [
    "127.0.0.1",
    "123.456.7.89"

];

// create express's built in router object
var api = express.Router();

api.use((req, resp, next) => {
    var userIsAllowed = ALLOWED_IPS.indexOf(req.ip) !== -1;
    if(!userIsAllowed) {

        // end of communication, exit router
        resp.status(401).send("not authorized!");

    } else {
        next();
    }
});

// routes
api.get('/users', (req, resp) => {/* ... */});
api.get('/messages', (req, resp) => {/* ... */});
api.post('/users', (req, resp) => {/* ... */});
api.post('/messages', (req, resp) => {/* ... */});

// export router mini app for use by other files
module.exports = api;