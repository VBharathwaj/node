var logger = require('./logger');
var path = require('path');
var os = require('os');
var EventEmitter = require('events');
var emitter = new EventEmitter();

function sayHello(name){
    console.log('Hello, ' + name);
}

sayHello('Stark');
logger.logging('Hey There');
//log('Buddy');
logger('Buddy');

console.log('Directory: ' + __filename );

//Parse Path
var pathObj = path.parse(__filename);
console.log(pathObj);


//Memory
console.log('Free Memory: ' + os.freemem());
console.log('Total Memory: ' + os.totalmem());

emitter.on('logging', (arg) => {
    console.log('Log event', arg);
});

console.log('Passed');
emitter.emit('logging', { id: 1, url: 'http' });

