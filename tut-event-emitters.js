/* 
* Even trigger implemented with arguments - tryout with available methods
*/

var events = require('events');
var eventEmitter = new events.EventEmitter();


var triggerHandler = ()=>{
    console.log('trigger 1');
    console.log('add function called with nos: argument not available');
}
var triggerHandlerWithArguments = (a)=>{
    console.log('trigger 2');
    console.log('add function called with nos: '+ a[0] + ' and ' + a[1]);
}

var endHandler = (c)=>{
    console.log('add function returned value: '+ c[0] );
}

// listeners added in order
eventEmitter.addListener("trigger", triggerHandler);
eventEmitter.on("trigger", triggerHandlerWithArguments);
eventEmitter.addListener("end", endHandler);


var addTwoNumbers = (a,b)=> {
    eventEmitter.emit("trigger",[a,b]);
    var  c = a+b;
    eventEmitter.emit("end",[c]);
    return c;
}

var noOfListeners = events.EventEmitter.listenerCount(eventEmitter,'trigger');
console.log('No of Listeners : '+ noOfListeners);
console.log(addTwoNumbers(48454,4545));

// remove listener
console.log('----------------------');
console.log('Listener removed');
console.log('----------------------');
eventEmitter.removeListener('trigger', triggerHandler);
var noOfListeners = events.EventEmitter.listenerCount(eventEmitter,'trigger');
console.log('No of Listeners after removing : '+ noOfListeners);
console.log();
console.log(addTwoNumbers(4,7));

console.log('----------------------');
console.log('Listener added again');
console.log('----------------------');
eventEmitter.addListener("trigger", triggerHandler);var noOfListeners = events.EventEmitter.listenerCount(eventEmitter,'trigger');
console.log('No of Listeners : '+ noOfListeners);
console.log(addTwoNumbers(8,4));