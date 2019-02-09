
const axios = require('axios');
const md5 = require('md5');
const mysql = require('mysql');
const inquirer = require('inquirer');

// public key
const public = '7ce818ce8265920a5c178f1db7562fa5'
// hash = md5(ts+private+public) - hash is sent in GET request
const hash = md5(1+'8be2308ef05e5ee98caca01e0d7858189a93f4ed'+'7ce818ce8265920a5c178f1db7562fa5');
// initalize characher
var character = '';
// response variables
var res, charID, charName, des, thumb;


/* ==========================================================================
   Connect to DB
   ========================================================================== */

// create database object
const db = mysql.createConnection({
    // configuration object
    host : 'localhost',
    user : 'root',
    password : 'MYSQL4thewin!',
    
    // this line added AFTER the db has been created else, error
    database : 'marvel_db'
});

// connect to database
db.connect((err) => {
    if(err) {
        throw err;
    }
});

/* ==========================================================================
   Request Character
   ========================================================================== */

   inquirer
   .prompt([
     // Here we create a basic text prompt.
     {
       type: "input",
       message: "enter marvel character to search:  ",
       name: "character"
     }])
     .then(function(inquirerResponse) {
        character = inquirerResponse.character;
        // I need to concatenate the two word names
        charSearch(character);
     });

/* ==========================================================================
   API Request
   ========================================================================== */

function charSearch(character) {
    var url = 'http://gateway.marvel.com/v1/public/characters?name='+character+'&ts=1&apikey='+public+'&hash='+hash;
    //console.log(url);
    axios.get(url).then(function(response){
        
        res = response.data.data.results[0];
        console.log(res);
        charID = res.id;
        charName = res.name;
        des = res.description;
        thumb = res.thumbnail.path+'/portrait_xlarge'+'.jpg';

        console.log('id:', charID,'\n',
                   'name:', charName,'\n',
                   'description:', des,'\n',
                   'portrait url:', thumb); 

        /*
        // insert data
        let hero = {id: charID, name: charName, description: des, thumbnail: thumb};
        // create sql with placeholder '?'
        let sql = 'INSERT INTO characters SET ?';
        db.query(sql, hero, (err, result) => {
            if(err) throw err;
            console.log("record inserted");
        }); */
                    
    }).catch(function (error) {
        console.log(error);
    });

}







