// file system
var fs = require('fs');

//read file - asynchronous, therefore non-blocking. Uses callback function to read data
fs.readFile('./readme.txt','utf8', function(err, data) {
    //write to new file from variable.  asynchronous, therefore non-blocking
    fs.writeFile('./writeMeAsync2.txt', data);
});

// since async, this console.log can execute while the file is being read and will most likely log first, although it is second in the code.
console.log('test2');

