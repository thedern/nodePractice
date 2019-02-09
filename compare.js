
var a = parseInt(process.argv[2])
var b = parseInt(process.argv[3])

if (a === b) {
	console.log(a, b, 'same');
} else {
	console.log(a, b, 'not same');
}

console.log('array is ', process.argv);

for (var i =0; i < process.argv.length; i++) {
	console.log(process.argv[i]);
}
