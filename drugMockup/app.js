
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
var unirest = require('unirest');

const app = express();

//body parser is included with express v4, no need to install, just require and create middleware
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

// set static content folder
app.use(express.static(path.join(__dirname, 'public')));

// use pug for views engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


// get home page
app.get('/', (req, resp) => {
    resp.render('index', {
        title: 'Drugs Finder',
    });
});  

// post request to get drug name(s); recieves data from ajax call in appLogic.js
app.post('/api/getDrug', (req, resp) => {
    // gets drug's name from request body and query API
    unirest.get("https://iterar-mapi-us.p.rapidapi.com/api/autocomplete?query="+req.body.DrugNameText)
    // send api key in header
    .header("X-RapidAPI-Key", "0xAyFD96WlmshBNnpLcUfgSrWzCvp15QZAnjsnwA8grd2AfWRB")
    .end(function (result) {
        console.log(result.body.suggestions);

        drugs= '';
        for (var i = 0; i < result.body.suggestions.length; i++) {
            drugs += result.body.suggestions[i] + ' || '
        }

        // return json object to calling page
        resp.render('index', {drugList: drugs});
    });
});

// start server
app.listen(29000, () => {
    console.log("server started");
});