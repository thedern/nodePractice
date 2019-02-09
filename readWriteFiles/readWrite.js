// file system
var fs = require('fs');

//read file - will fully read file before moves on (sync); therefore blocking
var readMe = fs.readFileSync('./readme.txt','utf8');
console.log(readMe);

//write to new file from variable.  Synchronous so it is blocking
fs.writeFileSync('./writeMe.txt', readMe);
