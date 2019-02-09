// basic web server in node which serves index.html page.  From Traversy
// note he does not use 'writeHead' but uses 'setHeader' instead.
// does not use createReadStream from fs to collect the html, but simply does a res.write(html)

// use http module that comes packaged with default node
const http = require('http');
// use file system module, built in so that web pages can be served
const fs = require('fs');

const hostname = '127.0.0.1';
const port = 4000;

fs.readFile('index.html', (err, html) => {
    if(err) {
        throw err;
    } else {
        // user http module and its built-in createServer function
        // req = request;  res = respose; then arrow function cuz using es6 where possible
        const server = http.createServer((req, res) => {
            console.log('request was made: ' + req.url);
            // res status code
            res.statusCode = 200;
            // res.setHeader('Content-type', 'text/plain');
            // replace text/plain with text/html so the html tags are interpreted and not shown on screen as plain text.
            res.setHeader('Content-type', 'text/html');
            // message sent to browser after successful request/response
            res.write(html);
            //res.end('Hello World');
            res.end();
        });

        // set server to listen on port and hostname
        server.listen(port, hostname, () => {
            console.log('server started on port ', port);
        });

    } // end else

}); // end readfile





