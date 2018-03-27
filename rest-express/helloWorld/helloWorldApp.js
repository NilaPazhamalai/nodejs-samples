
var express = require('express');
var helloWorldApp = express();

function serveHelloWorld(req, res) {
    res.send('Hello');
}
function listenerHandler() {
    console.log("server listening");
}

helloWorldApp.get('/', serveHelloWorld);
helloWorldApp.listen(8080, listenerHandler);

