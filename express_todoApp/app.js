/* ==========================================================================
   app.js is the entry point into the todo-list application
   ========================================================================== */
/*
    Using Model-View-Contoller (MVC) methodology.   File contents will be limited
    to their duties within the app.   
    Model -> data files; 
    View -> ejs and display files; 
    Controller -> js files
*/

// require express
var express = require('express');

// create express app
var app = express();

// import exported function from todoController.js so app.js has access to it
var todoController = require('./controllers/todoController');


/* ==========================================================================
   Middleware
   ========================================================================== */

// create template engine
app.set('view engine', 'ejs');

/*
    static files route and folder assignment.
    no specific route provided so ./public will
    default to static content folder for ALL
    routes.
*/

// static files route
app.use(express.static('./public'));

/* 
    execute imported function contained in the todoController (via todoControllers.js)  
    passing in the express 'app' as an argument

    express app passed in so that todoController can create our routes
*/
todoController(app);

app.listen(3000);
console.log('server started on 3000');



