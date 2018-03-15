var fs = require('fs');
var zlib =  require('zlib');


var fileName = './june2012.txt';
var outputFileName = './output.txt';
var pipeOutputFile = './pipeOutput.txt';
var inputGzFileName = './fileUpload.html';
var gzFileName = './pipe.txt.gz';
var writeData = '';
var textToWrite = 'Hello there!';

var addDataListener = (data) => {
    writeData += data;
}
var printOutputListener = () => {
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



//Write Stream

var printWriteOutputListener = () => {
    printOperation("WRITE");
    console.log('write done!');
    console.log('fileName: ' + outputFileName);
}


var writeStream = fs.createWriteStream(outputFileName);
writeStream.write(textToWrite);
writeStream.end();
writeStream.on('finish', printWriteOutputListener);
writeStream.on('error', printErrorListener);


// piping stream

var printPipeOutputListener = () => {
    printOperation("PIPE");
    console.log('file piping done!');
    console.log('piped fileName: ' + pipeOutputFile);
}

var rs = fs.createReadStream(fileName);
var ws = fs.createWriteStream(pipeOutputFile);
readStream.pipe(ws);
writeStream.on('finish', printPipeOutputListener);
writeStream.on('error', printErrorListener);


//transform
/*
var printZipOutputListener = () => {
    printOperation("TRANSFORM & CHAINING");
    console.log('file ZIP done!');
    console.log('zip fileName: ' + gzFileName);
}
var rst = fs.createReadStream(inputGzFileName);
var wst = rst.pipe(zlib.createGzip()).pipe(fs.createWriteStream(gzFileName));
writeStream.on('finish', printZipOutputListener);
writeStream.on('error', printErrorListener);

*/
var printUnZipOutputListener = () => {
    printOperation("TRANSFORM & CHAINING");
    console.log('file unzip done!');
    console.log('unzip fileName: ' + './out.txt');
}
var rstr = fs.createReadStream(gzFileName);
var wrst = rstr.pipe(zlib.createGunzip()).pipe(fs.createWriteStream('./out.txt')) ;
writeStream.on('finish', printUnZipOutputListener);
writeStream.on('error', printErrorListener);

