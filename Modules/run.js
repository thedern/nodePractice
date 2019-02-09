// reads in band names and prints

var bandsList = require('./bands');
// console.log(bandsList);


// for key in object...
for (var x in bandsList) {
    // log object[key]
    console.log(bandsList[x]);
}

// the 'js' extension is optional

// nums is returning 'counter' to us therefore we must capture in variable
var count = require('./nums');
console.log(count(['darren','misty','lego']));

// stuff returns object with 3 properties (counter adder and pi)
var stuffer = require('./stuff');
// access the stuff functions via the object's properties
console.log(stuffer.counter(['griff','tristan','hws','cappy']));
console.log(stuffer.adder(4,5));
console.log(stuffer.pi);
console.log(stuffer.adder(stuffer.pi, 21));

