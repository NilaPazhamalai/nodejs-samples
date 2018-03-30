var chai = require('chai');
var should = chai.should();
var request = require('request');


describe('passport rest api - hello world flow methods', () => {
    it('check Hello App - content', function (done) {
        request('http://localhost:3000/app', function (err, res, body) {
            body.should.equal('Hello from Passport');
            done();
        });
    });
    it('check Hello App - status', function (done) {
        request('http://localhost:3000/app', function (err, res, body) {
            res.statusCode.should.equal(200);
            done();
        });
    });
});

describe('passport rest api - flow methods', () => {
    it('check login - page load', function (done) {
        request('http://localhost:3000/', function (err, res, body) {
            res.statusCode.should.equal(200);
            done();
        });
    });
    it('check login - with correct credentials - status', function (done) {
        request.post({url:'http://localhost:3000/', form: {email:'user3@sss.com',password:'user3'}}, function(err,res,body){ /* ... */ 
            res.statusCode.should.equal(200);
            done();
        });
    });
    it('check login - with correct credentials - content', function (done) {
        request.post({url:'http://localhost:3000/', form: {email:'user3@sss.com',password:'user3'}}, function(err,res,body){ /* ... */ 
            body.should.equal('Hello name3');
            done();
        });
    });
    it('check login - with incorrect credentials - email - status', function (done) {
        request.post({url:'http://localhost:3000/', form: {email:'user@sss.com',password:'user3'}}, function(err,res,body){ /* ... */ 
            res.statusCode.should.equal(401);
            done();
        });
    });
   
});