
require('dotenv').config();

// requires
var path = require('path');
var express = require('express');

// postal lookup package
var zipdb = require('zippity-do-dah');
// darkskies package
var ForeCastIo = require('forecastio');

// create express
var app = express();


/* ==========================================================================
   Middleware
   ========================================================================== */

// create weather object using process.env to protect api key
var weather = new ForeCastIo(process.env.darkSkiesAPI);

// static path, provides routing access to both main.css and main.js
app.use(express.static(path.resolve(__dirname, 'public')));

// set views engine
app.set('views', path.resolve(__dirname, 'views'));
app.set('view engine', 'ejs');


/* ==========================================================================
   Routes
   ========================================================================== */

// route to home page
app.get('/', (req, resp) => {
    // using ejs so rendering the responses
    resp.render('index');
});

// zip code route (5 digits)
app.get(/^\/(\d{5})$/, (req, resp, next) => {
    // get zip
    var zipcode = req.params[0];
    //console.log(zipcode);

    // get location from zip database
    var location = zipdb.zipcode(zipcode);
    // console.log(location.state);
    
    if(!location.zipcode) {
        next();
        return;
    }

    // get coordinates based on zip
    var latitude = location.latitude;
    var longitude = location.longitude;

    // use darkskies to get forcast based on coordinates
    weather.forecast(latitude, longitude, (err, data) => {
        if(err) {
            next();
            return;
        }

        // response JSON object to be processed via ajax in main.js
        resp.json({

            zipcode: zipcode,
            city: location.city,
            state:  location.state,
            temperature: data.currently.temperature
        });
    });
});



// start server
app.listen(8000);