// function expressions

// normal
function greeting() {
    console.log('hi');
}
// call by name
greeting();


// function expression

var sayBye = function() {
    console.log('bye');
}
// call by variable
sayBye();


// pass function to function
function callFunction(funct) {
    funct();
};
// callFunction executed with sayBye function as argument
callFunction(sayBye);
    