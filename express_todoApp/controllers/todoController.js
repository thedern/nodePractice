 /* ==========================================================================
    Controller file that 'controls' the todo-list portion of the application
    ========================================================================== */
 
/* 
    exported function for use within the overall application for route access

    express 'app' passed in from app.js so that routes may be
    created by this function and then exported back to app.js

    this creates a circular, dependent relationship between
    app.js and todoController.js

    ...very James Cameron, Terminator timeline-like

    app.js imports the todoController function an executes its.
    app.js passes the express app as an argument to the controller function
    when executed so that routes my be created and passed back to app.js

    in short, app.js passes express to controller so controller can create
    routes that app.js can then access...
    
*/

// import body parser
var bodyParser = require('body-parser');

// will hook this to a db later for CRUD operations
var dataArry = [{item: 'walk dog'},{item: 'workout'},{item: 'code'}];

// required to capture data from form body, see body-parser page
var urlencodedParser = bodyParser.urlencoded({ extended: false });

module.exports = function(app) {

    // routes below

    // get and view list
    app.get('/todo', (req, res) => {
        
        /* 
            dynamic update of html using array,
            pass in data to view, must be in form of an object
        */

        // JSON format (object)
        res.render('todo', {todos: dataArry});

    }),

    // add to list
    app.post('/todo', urlencodedParser, (req, res) => {
        /* 
            urlencodedParser allows access to req.body
            push captured form data to array, adding a new todo item
        */
        dataArry.push(req.body);

        /*
            send response back to front end js file, todo-list.js, sending array 'dataArry'
            note this is res.json, not res.render, so not calling the ejs view
            respose will cause the todo-list.js to render page with updated list data

            data returned in JSON format (object)
        */
        res.json(dataArry);

    });

    // delete from list
    app.delete('/todo/:item', (req, res) => {
        dataArry = dataArry.filter(function(todo){
            /* 
                returns TRUE if item from array does NOT equal selected item
                if returns FALSE if does equal, will then 'filter' item out of dataArry
            */

            // replace and spaces with dashes
            return todo.item.replace(/ /g, '-') !== req.params.item;
        });
        // update frontend js file, todo-list.js, sending array 'dataArray in response'
        res.json(dataArry);
    });

};  // end exported function