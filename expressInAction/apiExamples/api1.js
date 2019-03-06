// exported api referenced by app.js
var express = require('express');

// creates a new router mini application
var api = express.Router();

// Routes
api.get("/timezone", (req, resp) => {
    resp.send("Sample response for timezone");
});

api.get("/all_timezones", (req, resp) => {
    resp.send("Sample response for /all_timezones")
});

module.exports = api;