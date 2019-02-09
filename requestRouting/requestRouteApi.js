
var http = require('http');
var fs = require('fs');

var server = http.createServer(function(req, res){
    console.log('request was made: ', req.url);

    // check url and respond if correct url was provided.
    if (req.url === '/home' || req.url === '/') {
        res.writeHead(200, {'Content-Type': 'text/html'});
        // get local html file using file system and readstream (buffer)
        fs.createReadStream(__dirname + '/index.html').pipe(res);

        /* above is shorthand for the following
            var myreadStream = fs.createReadStream(__dirname + '/index.html','utf8');
            myreadStream.pipe(res);
        */
    
    // if contact page requested
    } else if (req.url === '/contact') {
        res.writeHead(200, {'Content-Type': 'text/html'});
        // get local html file using file system and readstream (buffer)
        fs.createReadStream(__dirname + '/contact.html').pipe(res);

    // if api requested
    } else if (req.url === '/api/dern') {
        // create array of objects
        var dern = [{name: 'darren', age: 44}, {name: 'lego', age: 5}];
        // change content type
        res.writeHead(200, {'Content-Type': 'application/json'});
        // return json to end object, must be stringified as end expects string or buffer
        res.end(JSON.stringify(dern));

    } else {
        res.writeHead(404, {'Content-Type': 'text/html'});
        // get local html file using file system and readstream (buffer)
        fs.createReadStream(__dirname + '/error.html').pipe(res);
    }
    
});

// start the server
server.listen(3000, '127.0.0.1');
console.log('server started on port 3000');


