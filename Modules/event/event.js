// events is a built in, returns events emmitter for custom events
var event = require('events');
var utility = require('util');


// Person object constructor
var Person = function(name) {
    this.name = name;
};

// inherit event emitter - Person inherits event.EventEmitter
utility.inherits(Person, event.EventEmitter);

// make people using Person constructor
var darren = new Person('darren');
var lego = new Person('lego');
var misty = new Person('misty');
// store people in array
var people = [darren, lego, misty];

// event listenters via inherited event.EventEmitter
people.forEach(function(person){
    // create an event listener for each person in array, listening for 'speak'
    person.on('speak', function(msg){
        // if speak caught, console.log
        console.log(person.name + ' said: ' + msg);
    });
});

// call events
lego.emit('speak', 'hey dude');
misty.emit('speak', 'clean your room');
darren.emit('laugh', 'did laugh work since it was not speak?');