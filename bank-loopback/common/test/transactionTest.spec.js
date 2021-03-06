var chai = require('chai');
var should = chai.should();
var request = require('request');

var t1 = require('../models/transaction');
var t2 = require('../models/transaction_remote_handlers');
var t3 = require('../models/transaction_utils');
var t4 = require('../models/transaction_validation');

var api = 'http://localhost:3000/api/';
describe('Transaction - with No Authorization', () => {
    var transactionURL = api + '/Transactions';
    var transactionURLAuth = api + '/Transactions';

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
    it('update - status code - no access', function (done) {
        request.put({ url: transactionURLAuth, form: transactionModel },
            function (err, res, body) {
                res.statusCode.should.equal(422);
                done();
            });
    });
    it('delete - status code - no access', function (done) {
        request.del({ url: transactionURLAuth + '/45' },
            function (err, res, body) {
                res.statusCode.should.equal(422);
                done();
            });
    });
});




describe('Transaction - CREATE transaction - success', () => {
    var accessToken = '?access_token=I7PmLp9VrGmWNEhd2np3AHMnFd1RDVZ1E73MR5Kpqpm1jJRDqNBBuBbukdrEiD5A';
    var transactionURLAuth = api + 'Transactions';

    var transactionModel = {
        source_Account_number: "AS125678",
        target_account_number: "AS125674",
        amount: 30
    }

    var transaction, newId;



    it('create trx', function (done) {
        request.post({ url: transactionURLAuth + accessToken, form: transactionModel },
            function (err, res, body) {
                res.statusCode.should.equal(200);
                done();
            });
    });
});

describe('Transaction - CREATE transaction - fails ', () => {
    var accessToken = '?access_token=I7PmLp9VrGmWNEhd2np3AHMnFd1RDVZ1E73MR5Kpqpm1jJRDqNBBuBbukdrEiD5A';
    var transactionURLAuth = api + 'Transactions';
    var transactionModel;
    describe('Transaction - CREATE transaction - fail on insufficient balance <=0 ', () => {

        before((done) => {
            transactionModel = {
                source_Account_number: "AS125679",
                target_account_number: "AS125674",
                amount: 30
            }
            done();
        });
        it('create trx - fail on balance', function (done) {
            request.post({ url: transactionURLAuth + accessToken, form: transactionModel },
                function (err, res, body) {
                    res.statusCode.should.equal(422);
                    done();
                });
        });
    });

    describe('Transaction - CREATE transaction - fail on src empty', () => {

        before((done) => {
            transactionModel = {
                source_Account_number: "",
                target_account_number: "AS125674",
                amount: 30
            }
            done();
        });
        it('create trx - fail on src empty', function (done) {
            request.post({ url: transactionURLAuth + accessToken, form: transactionModel },
                function (err, res, body) {
                    res.statusCode.should.equal(422);
                    done();
                });
        });
    });


    describe('Transaction - CREATE transaction - fail on trg empty', () => {

        before((done) => {
            transactionModel = {
                source_Account_number: "AS125679",
                target_account_number: "",
                amount: 30
            }
            done();
        });
        it('create trx - fail on trg empty', function (done) {
            request.post({ url: transactionURLAuth + accessToken, form: transactionModel },
                function (err, res, body) {
                    res.statusCode.should.equal(422);
                    done();
                });
        });
    });


    describe('Transaction - CREATE transaction - fail on amount 0', () => {

        before((done) => {
            transactionModel = {
                source_Account_number: "AS125679",
                target_account_number: "AS125674",
                amount: 0
            }
            done();
        });
        it('create trx - fail on amount 0', function (done) {
            request.post({ url: transactionURLAuth + accessToken, form: transactionModel },
                function (err, res, body) {
                    res.statusCode.should.equal(422);
                    done();
                });
        });
    });

    describe('Transaction - CREATE transaction - fail on src and trg same', () => {

        before((done) => {
            transactionModel = {
                source_Account_number: "AS125679",
                target_account_number: "AS125679",
                amount: 30
            }
            done();
        });
        it('create trx - src and trg same', function (done) {
            request.post({ url: transactionURLAuth + accessToken, form: transactionModel },
                function (err, res, body) {
                    res.statusCode.should.equal(422);
                    done();
                });
        });
    });


    describe('Transaction - CREATE transaction - fail on balance in account', () => {

        before((done) => {
            transactionModel = {
                source_Account_number: "AS125679",
                target_account_number: "AS125674",
                amount: 30
            }
            done();
        });
        it('create trx - fail on balance in account', function (done) {
            request.post({ url: transactionURLAuth + accessToken, form: transactionModel },
                function (err, res, body) {
                    res.statusCode.should.equal(422);
                    done();
                });
        });
    });


    describe('Transaction - CREATE transaction - fail on amount numericality', () => {

        before((done) => {
            transactionModel = {
                source_Account_number: "AS125679",
                target_account_number: "AS125674",
                amount: 'hj'
            }
            done();
        });
        it('create trx - fail on amount numericality', function (done) {
            request.post({ url: transactionURLAuth + accessToken, form: transactionModel },
                function (err, res, body) {
                    res.statusCode.should.equal(422);
                    done();
                });
        });
    });


    describe('Transaction - CREATE transaction - fail on tgt acc incorrect', () => {

        before((done) => {
            transactionModel = {
                source_Account_number: "AS125679",
                target_account_number: "AS12564",
                amount: 30
            }
            done();
        });
        it('create trx - fail on tgt acc incorrect', function (done) {
            request.post({ url: transactionURLAuth + accessToken, form: transactionModel },
                function (err, res, body) {
                    res.statusCode.should.equal(422);
                    done();
                });
        });
    });


    describe('Transaction - CREATE transaction - fail on src acc incorrect', () => {

        before((done) => {
            transactionModel = {
                source_Account_number: "AS12567",
                target_account_number: "AS125674",
                amount: 30
            }
            done();
        });
        it('create trx - fail on src acc incorrect', function (done) {
            request.post({ url: transactionURLAuth + accessToken, form: transactionModel },
                function (err, res, body) {
                    res.statusCode.should.equal(422);
                    done();
                });
        });
    });
});



    /*
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