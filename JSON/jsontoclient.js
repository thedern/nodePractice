
var http = require('http');
var fs = require('fs');

var server = http.createServer(function(req, res){
    console.log('request was made: ', req.url);
    // change content type
    res.writeHead(200, {'Content-Type': 'application/json'});

    // create object
    var myObj = {
        vehicle: 'jeep',
        cylinders: 6,
        color: 'yellow'
    };

    // send back object via the 'end' method
    // end expects a string or buffer so mus stringify content
    res.end(JSON.stringify(myObj));
});

// start the server
server.listen(3000, '127.0.0.1');
console.log('server started on port 3000');


