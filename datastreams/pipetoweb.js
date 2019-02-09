

var http = require('http');
var fs = require('fs');

// create web server    
var server = http.createServer(function(req, res) {
    console.log('request was made: ' + req.url);
    res.writeHead(200, {'Content-type': 'text/plain'});
    // use utf8 to get actual text using file system and readstream
    var myreadstream = fs.createReadStream(__dirname + '/readme.txt', 'utf8'); 
    // pipe read data to web server response.  Will display in browser.
    // sending data in stream has better performance than sending whold file's worth of data at once
    myreadstream.pipe(res);     
});

// start server
server.listen(3000, '127.0.0.1');
console.log('server running on port 3000');
