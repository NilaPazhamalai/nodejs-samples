var fs = require('fs');
var zlib =  require('zlib');
var streamListenerModule = require('./tut-stream-listener-module.js');
//Read stream
var readStream = fs.createReadStream(streamListenerModule.file.fileName);
readStream.on('data', streamListenerModule.addDataListener);
readStream.on('end', streamListenerModule.printOutputListener);
readStream.on('error', streamListenerModule.printErrorListener);
 //Write Stream
var writeStream = fs.createWriteStream(streamListenerModule.file.outputFileName);
writeStream.write(streamListenerModule.file.textToWrite);
writeStream.end();
writeStream.on('finish',streamListenerModule.printWriteOutputListener);
writeStream.on('error',streamListenerModule.printErrorListener);
// piping stream
var rs = fs.createReadStream(streamListenerModule.file.fileName);
var ws = fs.createWriteStream(streamListenerModule.file.pipeOutputFile);
readStream.pipe(ws);
writeStream.on('finish', streamListenerModule.printPipeOutputListener);
writeStream.on('error', streamListenerModule.printErrorListener);
//transform

var rst = fs.createReadStream(streamListenerModule.file.inputGzFileName);
var wst = rst.pipe(zlib.createGzip()).pipe(fs.createWriteStream(streamListenerModule.file.zipFileName));
writeStream.on('finish', streamListenerModule.printZipOutputListener);
writeStream.on('error', streamListenerModule.printErrorListener);

var rstr = fs.createReadStream(streamListenerModule.file.gzFileName);
var wrst = rstr.pipe(zlib.createGunzip()).pipe(fs.createWriteStream('./out.txt')) ;
writeStream.on('finish', streamListenerModule.printUnZipOutputListener);
writeStream.on('error',streamListenerModule. printErrorListener);

