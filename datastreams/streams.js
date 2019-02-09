// read and write data streams


var http = require('http');
var fs = require('fs');

// read stream, split data into chunks and pass to 'myreadstream
// __dirname is object for current dir
// fill up buffer with binary if no encoding is added
// var myreadstream = fs.createReadStream(__dirname + '/readme.txt');

// use utf8 to get actual text
var myreadstream = fs.createReadStream(__dirname + '/readme.txt', 'utf8');

// write stream
var mywritestream = fs.createWriteStream(__dirname + '/writeme.txt');

/* difference between fs.readFile and fs.createReadStream:   readFile will read the whole file into memory
at one time.  createReadStream only reads data into the buffer to the ammount the buffer can hold.  Whole
file is not read in */

// data listener that fires on receiving data.  The word 'data' is required, tried other words and fail
// argument passed to function 'stuff' is arbitrary... can use whatever you wish
myreadstream.on('data', function(stuff) {
    console.log('new chunk recieved');
    console.log(stuff);
    // every time we recieve a chunk of data we are writing to the file
    mywritestream.write(stuff);
});



