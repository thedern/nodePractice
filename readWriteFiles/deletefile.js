
// import file system module
var fs = require('fs');


// delete file
fs.unlink('./writeMe.txt');
// better idea is to use 'argv' and pass file in by name