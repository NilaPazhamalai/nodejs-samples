var fs = require('fs');
var formidable = require('formidable');
var http = require('http');
var url = require('url');

// read file and show html
var inputHtmlFileName = './fileUpload.html';
var urlInput = '/fileInput';
var urlUpload = '/fileUpload';

var reqHandler = (request, response) => {
    

    if (urlInput == request.url) {
        //show input screen
        
        fs.readFile(inputHtmlFileName, (error, data) => {
            if (error) {
                console.log('error occured in reading input html file');
                response.writeHead(500, { 'Content-Type': 'text/html' });
                response.write('server error in reading html file');
                return response.end();
            } else {
                response.writeHead(200, { 'Content-Type': 'text/html' });
                response.write(data.toString());
                return response.end();
            }
        });
    } else
        if (urlUpload == request.url) {
            // process file
            var form = new formidable.IncomingForm();
            form.parse(request, (error, fields, files) => {
                var oldPath = files.fileToUpload.path;
                var newPath = 'C:/Users/vennilap/uploadedFiles/' + files.fileToUpload.name;
                fs.rename(oldPath, newPath, (error) => {
                    if (error) {
                        console.log('error occured in uploading');
                        response.writeHead(500, { 'Content-Type': 'text/html' });
                        response.write('server error in uploading  file');
                        response.write('<a href=' + urlInput + '> Go back </a>');
                        return response.end();
                    } else {
                        response.writeHead(200, { 'Content-Type': 'text/html' });
                        response.write('File uploaded successfully');
                        response.write('<br>');
                        response.write('<a href=' + urlInput + '> Go back </a>');
                        return response.end();
                    }
                })
            });

        }
    }


var server = http.createServer(reqHandler);
server.listen('8080');

console.log('server listening');





