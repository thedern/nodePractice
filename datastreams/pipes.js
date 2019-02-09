

var http = require('http');
var fs = require('fs');

// Since readstream/writestream is so common, pipes are a more elegant way to do the same.
// there is no event listener that needs to fire, pipe is constant flow

// use utf8 to get actual text
var myreadstream = fs.createReadStream(__dirname + '/readme.txt', 'utf8');

// write stream
var mywritestream = fs.createWriteStream(__dirname + '/writeme.txt');

// pipe method
myreadstream.pipe(mywritestream);

// this short syntax replaces the following code:

/*
myreadstream.on('data', function(stuff) {
    console.log('new chunk recieved');
    console.log(stuff);
    // every time we recieve a chunk of data we are writing to the file
    mywritestream.write(stuff);
});
*/
