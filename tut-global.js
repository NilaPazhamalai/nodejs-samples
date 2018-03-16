var fs = require('fs');

/*
Global objects
*/

console.log(__filename);
console.log(__dirname);


var delayFn = ()=>{
    console.log("Hello after 2 seconds");
}
console.log('call delayFn');
var t =setTimeout(delayFn,2000);
/*
clearTimeout(t);
console.log('call delayFn');
var t = clearTimeout(delayFn,2000);
*/

//console

console.info("Program Started");

var counter = 10;
var test = "Rock"
console.log("Counter: %d and %s (like printf statement %d and %s)", counter, test);

console.time("READ_DATA_TIME_TAKEN");
var fileName = './june2012.txt';
var writeData = '';


var addDataListener = (data) => {
    writeData += data;
}
var printOutputListener = () => {
    console.timeEnd("READ_DATA_TIME_TAKEN");
    printOperation("READ");
    console.log(writeData);
    
}
var printErrorListener = (error) => {
    console.log('Error stack trace : ' + error.stack);
}
// to add operation in error listener.

var printOperation = (operation) => {
    console.log('------------------------------');
    console.log(operation + '   operation: ');
    console.log('------------------------------');
}
//Read stream

var readStream = fs.createReadStream(fileName);
readStream.on('data', addDataListener);
readStream.on('end', printOutputListener);
readStream.on('error', printErrorListener);


console.info("Program Ended")
