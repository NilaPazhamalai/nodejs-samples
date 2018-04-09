var chai = require('chai');
var should = chai.should();
var request = require('request');

var t1 = require('../models/transaction');
var t2 = require('../models/transaction_remote_handlers');
var t3 = require('../models/transaction_utils');
var t4 = require('../models/transaction_validation');

var api = 'http://localhost:3000/api/';
describe('User', () => {
    var loginURL = api + 'Users/login'
    it('Login - success - status code', function (done) {
        request.post({url:loginURL, form : {email: "jana@doe.com",password: "1234"}},
        function (err, res, body) {
            res.statusCode.should.equal(200);
            done();
        });
    });
    it('Login - success - access token', function (done) {
        request.post({url:loginURL, form : {email: "jana@doe.com",password: "1234"}},
        function (err, res, body) {
            var bodyJSON = JSON.parse(body);
            bodyJSON.id.should.not.be.empty;
            done();
        });
    });
    it('Login - fail - incorrect email - status', function (done) {
        request.post({url:loginURL, form : {email: "jana@doe.co",password: "1234"}},
        function (err, res, body) {
            res.statusCode.should.equal(422);
            done();
        });
    });
    it('Login - fail - incorrect email - error code', function (done) {
        request.post({url:loginURL, form : {email: "jana@doe.co",password: "1234"}},
        function (err, res, body) {
            var bodyJSON = JSON.parse(body);
            bodyJSON.error.code.should.equal("LOGIN_FAILED");
            done();
        });
    });
    it('Login - fail - incorrect pwd - status', function (done) {
        request.post({url:loginURL, form : {email: "jana@doe.com",password: "123"}},
        function (err, res, body) {
            res.statusCode.should.equal(422);
            done();
        });
    });
    it('Login - fail - incorrect pwd - error code', function (done) {
        request.post({url:loginURL, form : {email: "jana@doe.com",password: "123"}},
        function (err, res, body) {
            var bodyJSON = JSON.parse(body);
            bodyJSON.error.code.should.equal("LOGIN_FAILED");
            done();
        });
    });
});
