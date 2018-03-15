var http = require('http');

http.createServer( (request, response) =>{
    response.writeHead(200, {'content-type': 'text/html'});
    response.write("Hello World from Tutorials");
    response.end("response ended");
    return response;
}).listen(8080);