// testing aruments

var a = process.argv[2];
var b = process.argv[3];

console.log(a.length);
console.log(b.length);

if (a.length > b.length) {
    console.log('a is longer ', a.length);
} else if (a.length < b.length) {
    console.log('b is longer ', b.length);

} else {
    console.log("they are equal");
}