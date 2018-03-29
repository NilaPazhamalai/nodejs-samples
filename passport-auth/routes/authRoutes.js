var express = require('express');
var router = express.Router();

module.exports = function (passport) {

    var serveLoginPage = function (req, res) {
        res.sendFile("c:/Users/vennilap/Documents/nodejs-samples/passport-auth/view/login.html");
    }
    router.get('/', serveLoginPage);


    var doLogin = function (req, res) {
        res.status(200).send("Hello "+ req.user.name);
    }
    router.post('/', passport.authenticate('local',{
		failureRedirect : '/error', // redirect back to the signup page if there is an error
    }),doLogin);


    return router;
}

