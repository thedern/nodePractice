// exported api referenced by app.js
var express = require('express');

// creates a new router mini application
var api = express.Router();

api.get("/timezone", (req, resp) => {
    resp.send("API 2, new response for timezone");
});

module.exports = api;