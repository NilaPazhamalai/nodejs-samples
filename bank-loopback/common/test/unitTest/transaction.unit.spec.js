/* var chai = require('chai');
var should = chai.should();
var app = require('../../../server/server');
var modelTransaction = app.models.Transaction;

var t1 = require('../../models/transaction');
var t2 = require('../../models/transaction_remote_handlers');
var t3 = require('../../models/transaction_utils');
var t4 = require('../../models/transaction_validation');

describe('Transaction - create - Unit Test', () => {
    
    it('create - trx - unit test - success', function (done) {
        modelTransaction.create({
            source_Account_number: "AS125674",
            target_account_number: "AS125678",
            amount: 30
        }, function (err, trx) {
            if (err) throw err;
            done();
            
        });
        
        
    });
    it('create - trx - unit test - src empty', function (done) {
        modelTransaction.create({
            source_Account_number: "",
            target_account_number: "AS125678",
            amount: 30
        }, function (err, trx) {
            if (err) {
                err.statusCode.should.equal(422);
                done();
            }
            
        });
        
    });
     it('create - trx - unit test - trgt empty', function (done) {
        modelTransaction.create({
            source_Account_number: "AS125674",
            target_account_number: "",
            amount: 30
        }, function (err, trx) {
            if (err) {
                err.statusCode.should.equal(422);
            }
            done();
        });
        
    });

    it('create - trx - unit test - amount empty', function (done) {
        modelTransaction.create({
            source_Account_number: "AS125674",
            target_account_number: "AS125678",
            amount: ''
        }, function (err, trx) {
            if (err) {
                err.statusCode.should.equal(422);
            }
            done();
        });
        
    });
    it('create - trx - unit test - amount 0', function (done) {
        modelTransaction.create({
            source_Account_number: "AS125674",
            target_account_number: "AS125678",
            amount: 0
        }, function (err, trx) {
            if (err) {
                err.statusCode.should.equal(422);
            }
            done();
        });
        
    });

    it('create - trx - unit test - same account should fail', function (done) {
        modelTransaction.create({
            source_Account_number: "AS125674",
            target_account_number: "AS125674",
            amount: 30
        }, function (err, trx) {
            if (err) {
                err.statusCode.should.equal(422);
            }
            done(); 
        });
        
    }); 

    it('create - trx - unit test - balance less than 0', function (done) {
        modelTransaction.create({
            source_Account_number: "AS125679",
            target_account_number: "AS125678",
            amount: 45
        }, function (err, trx) {
            if (err) {
                err.statusCode.should.equal(422);
            }
            done();
        });
        
    });
});



 */