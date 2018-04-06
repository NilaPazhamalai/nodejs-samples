var chai = require('chai');
var should = chai.should();
var request = require('request');

var api = 'http://localhost:3000/api/';
describe('Transaction - with No Authorization', () => {
    var transactionURL = api + '/Transactions';
    var transactionURLAuth = api + '/Transactions' + '?access_token=I7PmLp9VrGmWNEhd2np3AHMnFd1RDVZ1E73MR5Kpqpm1jJRDqNBBuBbukdrEiD5A';

    var transactionModel = {
        source_Account_number: "AS125679",
        target_account_number: "AS125678",
        amount: 30
    }
    it('create - status code', function (done) {
        request.post({ url: transactionURL, form: transactionModel },
            function (err, res, body) {
                res.statusCode.should.equal(422);
                done();
            });
    });
    it('read - status code', function (done) {
        request.get({ url: transactionURL },
            function (err, res, body) {
                res.statusCode.should.equal(422);
                done();
            });
    });
    it('update - status code', function (done) {
        request.put({ url: transactionURL, form: transactionModel },
            function (err, res, body) {
                res.statusCode.should.equal(422);
                done();
            });
    });
    it('delete - status code', function (done) {
        request.del({ url: transactionURL + '/45' },
            function (err, res, body) {
                res.statusCode.should.equal(422);
                done();
            });
    });
});

describe('Transaction - with Authorization', () => {

    var accessToken = '?access_token=I7PmLp9VrGmWNEhd2np3AHMnFd1RDVZ1E73MR5Kpqpm1jJRDqNBBuBbukdrEiD5A';
    var transactionURLAuth = api + '/Transactions';

    var transactionModel = {
        source_Account_number: "AS125674",
        target_account_number: "AS125678",
        amount: 30
    }
    it('create - status code', function (done) {
        request.post({ url: transactionURLAuth + accessToken, form: transactionModel },
            function (err, res, body) {
                res.statusCode.should.equal(200);
                done();
            });
    });
    it('read - status code', function (done) {
        request.get({ url: transactionURLAuth + accessToken },
            function (err, res, body) {
                res.statusCode.should.equal(200);
                done();
            });
    });
    it('read one - status code', function (done) {
        request.get({ url: transactionURLAuth + '/5ac75b2586b08f27a05ce64b' + accessToken },
            function (err, res, body) {
                res.statusCode.should.equal(200);
                done();
            });
    });
    it('update - status code', function (done) {
        request.put({ url: transactionURLAuth, form: transactionModel },
            function (err, res, body) {
                res.statusCode.should.equal(422);
                done();
            });
    });
    it('delete - status code', function (done) {
        request.del({ url: transactionURLAuth + '/45' },
            function (err, res, body) {
                res.statusCode.should.equal(422);
                done();
            });
    });
});

describe('Transaction - CREATE and UPDATE ACCOUNTS', () => {

    var accessToken = '?access_token=I7PmLp9VrGmWNEhd2np3AHMnFd1RDVZ1E73MR5Kpqpm1jJRDqNBBuBbukdrEiD5A';
    var transactionURLAuth = api + '/Transactions';

    var transactionModel = {
        source_Account_number: "AS125674",
        target_account_number: "AS125678",
        amount: 30
    }

    var transaction;

    before(function (done) {
        request.post({ url: transactionURLAuth + accessToken, form: transactionModel },
            function (err, res, body) {
                transaction = JSON.parse(body);
                done();
            });
    });

    it('should have a username', function () {
        user.should.have.property('username', 'test');
    });

    it('create', function (done) {
        res.statusCode.should.equal(200);
        done();
    });


    if (newId) {
        it('read one - status code', function (done) {
            request.get({ url: transactionURLAuth + '/5ac75b2586b08f27a05ce64b' + accessToken },
                function (err, res, body) {
                    res.statusCode.should.equal(200);
                    done();
                });
        });
    }
    it('update - status code', function (done) {
        request.put({ url: transactionURLAuth, form: transactionModel },
            function (err, res, body) {
                res.statusCode.should.equal(422);
                done();
            });
    });
    it('delete - status code', function (done) {
        request.del({ url: transactionURLAuth + '/45' },
            function (err, res, body) {
                res.statusCode.should.equal(422);
                done();
            });
    });
});

/* 
describe('passport rest api - flow methods', () => {
    it('check login - page load', function (done) {
        request('http://localhost:3000/', function (err, res, body) {
            res.statusCode.should.equal(200);
            done();
        });
    });
    it('check login - with correct credentials - status', function (done) {
        request.post({url:'http://localhost:3000/', form: {email:'user3@sss.com',password:'user3'}}, function(err,res,body){
            res.statusCode.should.equal(200);
            done();
        });
    });
    it('check login - with correct credentials - content', function (done) {
        request.post({url:'http://localhost:3000/', form: {email:'user3@sss.com',password:'user3'}}, function(err,res,body){ 
            body.should.equal('Hello name3');
            done();
        });
    });
    it('check login - with incorrect credentials - email - status', function (done) {
        request.post({url:'http://localhost:3000/', form: {email:'user@sss.com',password:'user3'}}, function(err,res,body){ 
            res.statusCode.should.equal(401); // url redirection
            done();
        });
    });
    it('check login - with incorrect credentials - email - status', function (done) {
        request.post({url:'http://localhost:3000/', form: {email:'user@sss.com',password:'user3'}}, function(err,res,body){ 
        body.should.equal('Unauthorized');
            done();
        });
    });

    it('check login - with incorrect credentials - password - status', function (done) {
        request.post({url:'http://localhost:3000/', form: {email:'user3@sss.com',password:'uer3'}}, function(err,res,body){ 
            res.statusCode.should.equal(401); // url redirection
            done();
        });
    });
    it('check login - with incorrect credentials - password - content', function (done) {
        request.post({url:'http://localhost:3000/', form: {email:'user3@sss.com',password:'uer3'}}, function(err,res,body){ 
        body.should.equal('Unauthorized');
        done();
        });
    });
   
}); */