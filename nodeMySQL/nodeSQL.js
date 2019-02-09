
/* ==========================================================================
   General Section
   ========================================================================== */

// import required packages
const express = require('express');
const mysql = require('mysql');

// create mysql connection
const db = mysql.createConnection({
    // configuration object
    host : 'localhost',
    user : 'root',
    password : 'MYSQL4thewin!',
    
    // this line added AFTER the db has been created else, error
    database : 'nodemysql'
});

// connect to database
db.connect((err) => {
    if(err) {
        throw err;
    }
    // if no err
    console.log('msql connected');
});

// create express server
const app = express();



/* ==========================================================================
   Create DB
   ========================================================================== */

// create database via express route.  DB will be created when route is called
// will error if called 2x since already created
app.get('/createdb', (req, res) => {
    // standard sql for db creation
    let sql = 'CREATE DATABASE nodemysql'
    // use db variable from msql
    db.query(sql, (err, result) => {
        if(err) throw err;

        // If successful, db should be available in mysql workbench
        console.log(result);
        // send to browser.  
        res.send('database created');
        
    });
});



/* ==========================================================================
   Create Table
   ========================================================================== */

// create table via express route.  Table will be created when route is called
// will error if called 2x since alreadt created
app.get('/createpoststable', (req, res) => {
    let sql = 'CREATE TABLE posts(id int AUTO_INCREMENT, title VARCHAR(255), body VARCHAR(255), PRIMARY KEY (id))';
    db.query(sql, (err, result) => {
        if(err) throw err;

        console.log(result);
        res.send('posts table created');
    });
});



/* ==========================================================================
   Insert Data
   ========================================================================== */

app.get('/createpost1', (req, res) => {
    // create post object
    let post = {title: 'post one', body: 'This is post number one!'}
    // create sql with placeholder '?'
    let sql = 'INSERT INTO posts SET ?';
    db.query(sql, post, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('post entered into POSTS table');
    });
});

app.get('/createpost2', (req, res) => {
    // create post object
    let post = {title: 'post two', body: 'this is post number two!'}
    let sql = 'INSERT INTO posts SET ?';
    db.query(sql, post, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('post 2 entered into POSTS table');
    });
});


/* ==========================================================================
   Select Data
   ========================================================================== */

// select all data from posts table
app.get('/getposts', (req, res) => {
    let sql = 'SELECT * FROM posts';
    db.query(sql, (err, results) => {
        if(err) throw err;
        console.log(results);
        res.send('requested posts returned');
    });
});

// can return posts based on a variable '/1' , '/2'
app.get('/getpost/:id', (req, res) => {
    let sql1 = `SELECT * FROM posts WHERE ID = ${req.params.id}`;
    db.query(sql1, (err, results) => {
        if(err) throw err;
        console.log(results);
        res.send(`requested post returned, post id ${req.params.id}`);
    });
});



/* ==========================================================================
   Update
   ========================================================================== */

// can return posts based on a variable '/1' , '/2'
app.get('/updatepost/:id', (req, res) => {
    let newTitle = 'Updated Title';
    let sql1 = `UPDATE posts SET title = '${newTitle}' WHERE ID = ${req.params.id}`;
    db.query(sql1, (err, results) => {
        if(err) throw err;
        console.log(results);
        res.send(`post updated ${req.params.id}`);
    });
});


/* ==========================================================================
   Delete
   ========================================================================== */

// can return posts based on a variable '/1' , '/2'
app.get('/deletepost/:id', (req, res) => {
    let sql1 = `DELETE FROM posts WHERE ID = ${req.params.id}`;
    db.query(sql1, (err, results) => {
        if(err) throw err;
        console.log(results);
        res.send(`post ${req.params.id} deleted`);
    });
});




/* ==========================================================================
   Start Server
   ========================================================================== */

// start server
app.listen('3000', () => {
    console.log('server listening on port 3000');
});



