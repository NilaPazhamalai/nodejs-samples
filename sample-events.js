/*  Even trigger implemented with arguments*/
var events = require('events');
var eventEmitter = new events.EventEmitter();

var triggerHandler = (a)=>{
    console.log('add function called with nos: '+ a[0] + ' and ' + a[1]);
}

var endHandler = (c)=>{
    console.log('add function returned value: '+ c[0] );
}

eventEmitter.addListener("trigger", triggerHandler);
eventEmitter.addListener("end", endHandler);


var addTwoNumbers = (a,b)=> {
    eventEmitter.emit("trigger",[a,b]);
    var  c = a+b;
    eventEmitter.emit("end",[c]);
    return c;
}

console.log(addTwoNumbers(48454,4545));