
module.exports.counter = function(arr) {
    return 'there are ' + arr.length + ' elements in the array';
};

module.exports.adder = function(a, b) {
    return `the sum of the two numbers is ${a+b}.`;
};

module.exports.pi = 3.142;

/* If you did not export in-place like above, you could declare varibles and assign functions to them
   like in nums.js.
   
   module.export is itself an object that can be filled with the functons defined

    module.exports = {
        counter: counter,
        adder: adder,
        pi: pi
    };
*/