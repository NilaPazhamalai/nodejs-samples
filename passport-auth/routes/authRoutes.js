var express = require('express');
var router = express.Router();
var rootPath = 'c:/Users/vennilap/Documents/nodejs-samples/passport-auth';
module.exports = function (passport) {

    var serveLoginPage = function (req, res) {
        res.sendFile(rootPath+'/view/login.html');
    }
    router.get('/', serveLoginPage);


    var doLogin = function (req, res) {
        res.status(200).send('Hello ' + req.user.name);
    }
    router.post('/', passport.authenticate('local'), doLogin);


    return router;
}

