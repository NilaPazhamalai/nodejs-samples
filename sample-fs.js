/*  File System - Operations - http://localhost:8080/fs/?fileName=input&operation=r
*/
var fs = require('fs');
var url = require('url');
var serverModule = require("./sample-createServer-module.js");
var viewResolverModule = require("./sample-html-view-resolver-module.js");
var dateModule = require('./sample-custom-date-module')

var requestListener = (request, response) => {
    var parsedUrl = url.parse(request.url, true);
    var query = parsedUrl.query;
    var file = query.fileName;
    var operation = query.operation;

    console.log('---------------------------------');
    console.log('URL path: ' + parsedUrl.pathname);
    console.log('URL search criteria: ' + parsedUrl.search);
    console.log('File Name :' + file + '  File Operation :' + operation);

    if ('/fs/'=== parsedUrl.pathname && file && operation) {
        var fileName = './' + file + '.txt';
        switch (operation) {
            case 'r':
                fs.readFile(fileName, (error, data) => {
                    var output = (error) ? 'Error in reading file' : data.toString();
                    viewResolverModule.writeSuccessResponseContent(output, response);
                });
                break;
            case 'c':
                fs.open(fileName, 'w', (error, fd) => {
                    var output = (error) ? 'Error in opening file' : ('New file created: '+ fileName + '<br>In folder: '+__dirname);
                    viewResolverModule.writeSuccessResponseContent(output, response);
                });
                break;
            case 'u':
                fs.writeFile(fileName, 'File content updated at' + dateModule.getStandardDate() , (error) => {
                    var output = (error) ? 'Error in writing file' : '<b>File successfully updated with content:</b>  File content updated at' + dateModule.getStandardDate() ;
                    viewResolverModule.writeSuccessResponseContent(output, response);
                });
                break;
            case 'a':
                fs.appendFile(fileName, 'File content appended at ' + dateModule.getStandardDate() , (error) => {
                    var output = (error) ? 'Error in appending file' : 'File content appended at ' + dateModule.getStandardDate() ;
                    viewResolverModule.writeSuccessResponseContent(output, response);
                });
                break;
            case 'd':
                fs.unlink(fileName, (error) => {
                    var output = (error) ? 'Error in deleting file ' : 'File deleted at ' + dateModule.getStandardDate() ;
                    viewResolverModule.writeSuccessResponseContent(output, response);
                })
                break;
            case 'n': // rename
                var oldPath = fileName;
                var newPath = file + '_rename.txt';
                fs.rename(oldPath, newPath, (error) => {
                    var output = (error) ? 'Error in renaming file ' : 'File renamed at ' + dateModule.getStandardDate() ;
                    viewResolverModule.writeSuccessResponseContent(output, response);
                })
                break;
            default:
                var output = 'Operation not supported';
                viewResolverModule.writeSuccessResponseContent(output, response);
                break;
        }
    } else {
        viewResolverModule.writeClientErrorResponseContent(response);
    }
}
serverModule.createServer(requestListener, 8080);

