var http = require('http');
var fs = require('fs');

var server = http.createServer(function(req, res){
    console.log('requests was made: ' + req.url);
    res.writeHead(200, {'Content-type': 'text/html'});
    // get the html file and pipe it to the response.  File is not read at one time but streamed in
    var myreadStream = fs.createReadStream(__dirname + '/index.html','utf8');
    myreadStream.pipe(res);
});

// start the server
server.listen(5000, '127.0.0.1');
console.log('server listening on 5000');


/* Note if you were not reading in via stream, you would read file all at once

// Here we use the fs package to read our index.html file
    fs.readFile(__dirname + "/index.html", function(err, data) {

    // We then respond to the client with the HTML page by specifically telling the browser that we are delivering
    // an html file.
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(data);
  });
}

*/
