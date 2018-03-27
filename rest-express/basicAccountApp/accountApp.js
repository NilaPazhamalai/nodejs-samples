var express = require('express');
var accountApp = express();
var accountAppRouter = require('./accountAppRouter.js');
var indexRouter =  require('./indexRouter.js');
var path = require('path');

function errorHandler(err, req, res, next) {
    res.status(500)
    res.send("Server error in Account application: " + err);
}
var logRequest = function (req, res, next) {
    console.log('LOGGED request ' +  req.url);
    next();
}
  
accountApp.use(logRequest);

//index routing
accountApp.use('/', indexRouter);
// app level routing
accountApp.use('/accounts', accountAppRouter);
// app level
accountApp.use(errorHandler); 

// static imports
accountApp.use(express.static(path.join(__dirname, 'public')));

module.exports = accountApp;