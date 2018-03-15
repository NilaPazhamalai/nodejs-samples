/* 
File System - Operations
*/
var fs = require('fs');
var http = require('http');
var url = require('url');

var requestListener = (request, response) => {
    var parsedUrl = url.parse(request.url, true);

    console.log('---------------------------------');
    console.log('URL path: ' + parsedUrl.pathname);
    console.log('URL search criteria: ' + parsedUrl.search);
    var query = parsedUrl.query;
    var file = query.fileName;
    var operation = query.operation;

    console.log('File Name :' + file);
    console.log('File Operation :' + operation);

    if (file && operation) {
        var fileName = './' + query.fileName + '.txt';
        switch (operation) {
            case 'r':
                fs.readFile(fileName, (error, data) => {
                    var output = (error) ? 'Error in reading file' : data.toString();
                    response.writeHead(200, { 'Content-Type': 'text/html' });
                    response.write(output);
                    return response.end();
                });
                break;
            case 'c':
                fs.open(fileName, 'w', (error, fd) => {
                    var output = (error) ? 'Error in opening file' : ('fd from file creation(open)' + fd);
                    response.writeHead(200, { 'Content-Type': 'text/html' });
                    response.write(output);
                    return response.end();
                });
                break;
            case 'u':
                fs.writeFile(fileName, 'File content updated at' + new Date(), (error) => {
                    var output = (error) ? 'Error in writing file' : 'File content updated at' + new Date();
                    response.writeHead(200, { 'Content-Type': 'text/html' });
                    response.write(output);
                    return response.end();
                });
                break;
            case 'a':
                fs.appendFile(fileName, 'File content appended at ' + new Date(), (error) => {
                    var output = (error) ? 'Error in appending file' : 'File content appended at ' + new Date();
                    response.writeHead(200, { 'Content-Type': 'text/html' });
                    response.write(output);
                    return response.end();
                });
                break;
            case 'd':
                fs.unlink(fileName, (error) => {
                    var output = (error) ? 'Error in deleting file ' : 'File deleted at ' + new Date();
                    response.writeHead(200, { 'Content-Type': 'text/html' });
                    response.write(output);
                    return response.end();
                })
                break;
            case 'n': // rename
                var oldPath = fileName;
                var newPath = file + '_rename.txt';
                fs.rename(oldPath, newPath, (error) => {
                    var output = (error) ? 'Error in renaming file ' : 'File renamed at ' + new Date();
                    response.writeHead(200, { 'Content-Type': 'text/html' });
                    response.write(output);
                    return response.end();
                })
                break;
            default:
                var output = 'Operation not supported';
                response.writeHead(200, { 'Content-Type': 'text/html' });
                response.write(output);
                return response.end();
                break;
        }

    } else {
        response.writeHead(404, { 'Content-Type': 'text/html' });
        return response.end();
    }
}


var server = http.createServer(requestListener);
server.listen(8080);
