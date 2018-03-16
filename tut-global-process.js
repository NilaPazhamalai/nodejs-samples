
var executeOnExit = (code)=>{
    setTimeout(timeoutHandler, 2000); // this will not run
    console.log('Program gonna exit with code : ' + code);
}

var executeOnBeforeExit = (code)=>{
    setTimeout(timeoutHandler, 2000); // this will  run
    console.log('Program before exit : ' + code);
}

var timeoutHandler = ()=>{
    console.log("TimeoutHandler");
    process.removeListener('beforeExit',executeOnBeforeExit); // if this is not done , program always trigger before exit and keeps on running
}
process.on('exit',executeOnExit);
process.on('beforeExit',executeOnBeforeExit);


// Printing to console
process.stdout.write("Hello World!" + "\n");

// Reading passed parameter
process.argv.forEach(function(val, index, array) {
   console.log(index + ': ' + val);
});

// Getting executable path
console.log(process.execPath);

// Platform Information 
console.log(process.platform);


// abort
/*
console.log('Process abort: will not emit exit event');
process.abort();
*/

// Print the current directory
console.log('Current directory: ' + process.cwd());

// Print the process version
console.log('Current version: ' + process.version);

// Print the memory usage
console.log(process.memoryUsage());