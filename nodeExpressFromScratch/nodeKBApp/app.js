
// requires
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// create express app
const app = express();

/* ==========================================================================
   dabase connection
   ========================================================================== */

// eliminate "DeprecationWarning for URL string parser
mongoose.set('useNewUrlParser', true);

// connect to database
mongoose.connect('mongodb://localhost/nodekb');
let db = mongoose.connection;

// check connection
db.once('open', () => {
    console.log('connected to mongodb');
});

// check for db errors
db.on('error', (err) => {
    console.log(err);
});

/* ==========================================================================
   Middleware
   ========================================================================== */

//body parser is included with express v4, no need to install, just require and create middleware
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

// set static content folder
app.use(express.static(path.join(__dirname, 'public')));

// bring in model js file
let Article = require('./models/article');

// use pug for views engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

/* ==========================================================================
   Routes
   ========================================================================== */


/*
    get a listing of all articles via home page.
    See index.pug
*/

app.get('/', (req, resp) => {
    // get all articles from mongodb
    Article.find({}, function(err, articles) {
        if(err) {
            console.log(err)
        } else { resp.render('index', {
                 title: 'Articles',
                 articles: articles
            });
        } // end else
        
    });  
});

//-----------------------------------------------------//

/*
    route to get specific article via clicking on article
    title. index.pug --> article.pug
*/

app.get('/article/:id', (req, resp) => {
    Article.findById(req.params.id, (err, article) => {
        if (err) {
            console.log(err);
        } else {
            // console.log(article);
            // render a new view where the whole article is sent, key article : value article
            resp.render('article', {article : article});

        }
    });
});

//-----------------------------------------------------//

/*
    Update article, load edit form.
    article.pug --> edit_article.pug
*/

app.get('/article/edit/:id', (req, resp) => {
    
    Article.findById(req.params.id, (err, article) => {
        if (err) {
            console.log(err);
        } else {
            // send whole article
            resp.render('edit_article', {title: 'Edit Article', 
                                         article : article
                                        });
        }
    });
});

//-----------------------------------------------------//

/*
    get the add articles input form
    add_article.pug
*/

app.get('/articles/add', (req, resp) => {
    resp.render('add_article', {title: 'Add Articles'});
});


/*
    POST route using the article form.
    Adds a new article, add_article.pug
    Returns user to 'index.pug' upon success

*/

app.post('/articles/add', (req, resp) => {
    // get
    let article = new Article();
    // bodyParser allows for access to req.body
    article.title = req.body.title;
    article.author = req.body.author;
    article.body = req.body.body;

    // save new db object
    article.save((err) => {
        if(err) {
            console.log(err);
            return;
        } else {
            // go to home page, index.pug
            resp.redirect('/');
        }
        
    });
});

//-----------------------------------------------------//

/* 
    Edit existing article, update using POST
    via a html form.

    NOTE: Must use AJAX for all non GET or POST
    as only GET/POST methods are supported via
    html form

    article.pug --> edit_article.pug
*/

app.post('/articles/edit/:id', (req, resp) => {
    
    //console.log('editing article', req.params.id)

    //create empty object
    let article = {};

    // add data to article object
    article.title = req.body.title;
    article.author = req.body.author;
    article.body = req.body.body;

    let query = {_id:req.params.id}

    // run update query against mongodb using model
    Article.updateOne(query, article, (err) => {
        if(err) {
            console.log(err);
        } else {
            resp.redirect('/');
        } // end else
    });
});

//-----------------------------------------------------//

/* 
    Ajax call as it is triggerd by a 'delete'
    button.  The 'delete' method is supported via ajax

*/

app.delete('/article/:id', (req, resp) => {
    let query = {_id:req.params.id}
    Article.remove(query, (err) => {
        if(err) {
            console.log(err);
        } else {
            resp.send('SUCCESS');
        } // end else
    });
});



/* ==========================================================================
   Server Start
   ========================================================================== */

// start server
app.listen(9000, () => {
    console.log("server started");
});