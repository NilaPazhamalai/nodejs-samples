var fs = require('fs');
var http = require('http');
var url = require('url');

var requestListener = (request, response) => {
    var parsedUrl = url.parse(request.url, true);

    console.log('URL path: ' + parsedUrl.path);
    console.log('URL path: ' + parsedUrl.pathname);
    console.log('URL search criteria: ' + parsedUrl.search);
    var query = parsedUrl.query;
    console.log('URL Query object: ' + query.toString);



    console.log('---------------------------------');
    var fileName = './' + query.month + query.year + '.txt';
    console.log('File Name :' + fileName);

    if (fileName) {
        fs.readFile(fileName, (error, data) => {
            var output = (error) ? 'Requested File not found' : data.toString();
            response.writeHead(200, { 'Content-Type': 'text/html' });
            response.write(output);
            return response.end();
        });
    } else {
        response.writeHead(404, { 'Content-Type': 'text/html' });
        return response.end();
    }

}


var server = http.createServer(requestListener);
server.listen(8080);
