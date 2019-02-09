// import file system
var fs = require('fs');

// synchronous, blocking dir create
fs.mkdirSync('./subdir3');
fs.rmdirSync('./subdir3');


// asynchronous, non-blocking dir create. Must use callback function with asynchronous function call
fs.mkdir('./subdir3', function(){
    console.log('done');
    // can do other stuff since async, stuff like read or write other files
});

// this is asynchronous so happens so fast it will appear on the fs that dir was never created.
// console.log is contents of the async function in this example, can be other things...
fs.rmdir('./subdir3', function(){
    console.log('delete done');
});

// must remove all directory contents before rmdir or get an error.  
// unlink is async so callback for the file remove
// can be the directory removal.  see below

/*
    fs.unlink('./stuff/file1.txt', function(){
        fs.rmdir('./stuff');
    });

*/
