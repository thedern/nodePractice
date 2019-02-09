
// need to fix this
var num = process.argv;

var arr1 = [];

for (var i = 2; i < arr1.length; i++) {
    arr1.push(parseFloat(arr1[i]));
}

console.log(arr1);
arr1.sort(function(x, y){
    //console.log(x, y);
    return x - y; }
);
console.log(arr1);