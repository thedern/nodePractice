
// load express
var express = require('express');

// load body parser for POST requests
var bodyParser = require('body-parser');

// instantiate an express app that provides access to all express's methods
// this is analogous to http.createServer
var app = express();

/* 
 need to set up ejs as middleware, needs to be BEFORE the routes.  
 When views are called, the default behavior is to look for then in /views folder
*/

app.set('view engine', 'ejs');

/* 
  middleware is code that runs between the request and response.  
  It can be applied to specific routes OR if no route is coded, it applies to ALL routes
*/

/* 
  point all static content requests for route: 'assets' to dir css, where the stylesheet lives
  the entry below will allow the link to the stylesheet in each web pages' head to work as expected.
  <link rel="stylesheet" href="./assets/style.css">
*/
app.use('/assets', express.static('css'));

/* 
    body parser for route specific POST requests.  Create application/x-www-form-urlencoded parser 
    urlencodedParser provides us access to the request body (req.body)
*/

var urlencodedParser = bodyParser.urlencoded({ extended: false })

// respond to requests 
// request verbs: GET POST DELETE PUT

// app.get('route', function)
app.get('/', (req, res) => {
    // headers do not need to be manuall set, express is smart and does it for us
    res.send('this is ths home page');
});


// dynamic request via routes.  The ':' indicates a parameter passed into the url in browser address
app.get('/usergoodness/:id', (req, res) => {
    // spit that dynamic bit back out on page
    res.send(`you requested to see usergoodness with id of ${req.params.id}`);
});


// templating engines, send back a whole page
app.get('/testies', (req, res) => {
    // headers do not need to be manuall set, express is smart and does it for us
    res.sendFile(__dirname + '/test1.html');
});


/* 
    templating engines, dynamic content
    templating engines allow for injection of dynamic 'content'
    use ejs via res.render
    automatically looks in views folder for file named in render method
*/

// anything that follows the colon ':' in a request is a variable
app.get('/profile/:name', (req, res) => {

    // create info object
    let info = {age: 29, job: 'turtle', hobbies: ['art','reading','gardening']};

    // pass information to view file in form of  an object
    res.render('profile',{person: req.params.name, data: info});
});

// render view and query strings '?'
// example: http://localhost:5000/contact?dept=marketing&contact=joe
app.get('/contact', (req, res) => {
    // shows query object in console
    console.log(req.query);
    // pass the request query to view
    res.render('contact',{qs: req.query});
});


/*
  partial view save coding if have multiple pages with same header nav footer etc
  see views/partials dir.  Also see how paritals are referenced in the profile.ejs file
*/

// express posts
app.post('/contact', urlencodedParser,(req, res) => {
    console.log(req.body);
    // render a success page showing the data entered into the form
    res.render('contact-success', {data: req.body})
});


// listen to port
app.listen(5000);





