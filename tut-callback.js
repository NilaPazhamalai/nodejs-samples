var fs = require('fs');
var fileName = './june2012.txt';

//sync block
console.log('synch block');
console.log('File sync read start');
var bufData = fs.readFileSync(fileName);
console.log('File read output');
console.log('----------------');
console.log(bufData.toString());
console.log('File read end');
console.log('Program end');
//asynch block
console.log('----------------');
console.log('----------------');
console.log('Asynch block');
console.log('File async read initiate');
fs.readFile(fileName, (error, data) => {
    if (error) {
        console.log('File read error');

    }else{
    console.log('File read output');
    console.log('----------------');
    console.log(data.toString());
    console.log('File read end');
    }
});
console.log('Program end');
