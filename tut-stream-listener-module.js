var writeData = '';
var file = {
    fileName: './june2012.txt',
    outputFileName: './output.txt',
    pipeOutputFile: './pipeOutput.txt',
    inputGzFileName: './fileUpload.html',
    zipFileName: './toZip.txt.gz',
    gzFileName: './pipe.txt.gz',
    textToWrite: 'Hello there!'
}

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

var printOperation = (operation) => {
    console.log('------------------------------');
    console.log(operation + '   operation: ');
    console.log('------------------------------');
}
var printWriteOutputListener = () => {
    printOperation("WRITE");
    console.log('write done!');
    console.log('fileName: ' + file.outputFileName);
}
var printPipeOutputListener = () => {
    printOperation("PIPE");
    console.log('file piping done!');
    console.log('piped fileName: ' + file.pipeOutputFile);
}

var printZipOutputListener = () => {
    printOperation("TRANSFORM & CHAINING");
    console.log('file ZIP done!');
    console.log('zip fileName: ' + file.zipFileName);
}
var printUnZipOutputListener = () => {
    printOperation("TRANSFORM & CHAINING");
    console.log('file unzip done!');
    console.log('unzip fileName: ' + './out.txt');
}

module.exports = {
    addDataListener: addDataListener,
    printOutputListener: printOutputListener,
    printErrorListener: printErrorListener,
    printWriteOutputListener: printWriteOutputListener,
    printPipeOutputListener: printPipeOutputListener,
    printZipOutputListener: printZipOutputListener,
    printUnZipOutputListener: printUnZipOutputListener
}
module.exports.file = file;