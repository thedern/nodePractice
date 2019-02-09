// utility module for counting
// takes an array as an argument
var counter = function(arr) {
    return 'there are ' + arr.length + ' elements in the array';
};

// make the counter function available to all that call this module
module.exports = counter;