// requires
var express = require('express');

// import the api Routers from api1.js and api2.js
var apiVersion1 = require('./api1.js');
var apiVersion2 = require('./api2.js');

// create expres app
var app = express();

// middleware, route all v1 to Version1 and v2 to Version2
app.use("/v1", apiVersion1);
app.use("/v2", apiVersion2);

// start server
app.listen(7000, () => {
    console.log("app started on port 7000")
});