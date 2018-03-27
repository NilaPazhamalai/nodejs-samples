var accountApp = require('./accountApp.js');

function listenerHandler() {
    console.log('server listening');
}


accountApp.listen(8080,listenerHandler);


