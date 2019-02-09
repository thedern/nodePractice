// filter duplicates out of array
var arr = ['cat','dog','cat','mouse'];
console.log(arr);

var arr2;


// filter on item and position
arr2 = arr.filter(function(item, pos) {

    // The filter() method creates an array filled with all array elements that pass a test (provided as a function).
    // return only the first instance of any item found
    return arr.indexOf(item) === pos;
});

console.log(arr2);
