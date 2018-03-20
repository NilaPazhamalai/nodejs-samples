var http = require('http');
var createServer = (reqHandler, port) => {
    var server = http.createServer(reqHandler);
    server.listen(port);
    console.log('server listening at ' + port);
}

module.exports.createServer = createServer;