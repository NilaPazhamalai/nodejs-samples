var chai = require('chai');
var should = chai.should();

var app = require('../../../server/server');
var Transaction = app.models.Transaction;

var trx_validate = require('../../models/transaction_validation');
var trx_util = require('../../models/transaction_utils');
var trx_handler = require('../../models/transaction_remote_handlers');

var source_Account_number = "AS125674";
var target_account_number = "AS125678";
var amount = 30;
var date = new Date();


var isValid = function (transaction) {
    return new Promise(function (resolve, reject) {
        transaction.isValid(function (isValid) {
            if (isValid) {
                return resolve(isValid);
            } else {
                return reject(isValid);
            }
        });
    });
}
describe('Transaction - validation - Unit Test', function () {

    it('success call', function (done) {
       // Transaction.validatesPresenceOf('source_Account_number', 'target_account_number', 'amount');
        var transaction = new Transaction(
            {
                source_Account_number: "AS125674",
                target_account_number: "AS125678",
                amount: 30
            });
        isValid(transaction)
            .catch(function (err) {
                done(err);
            })
            .then(function (isValid) {
                done();
            })
    });
});



    /* describe('validateAsync - date', () => {
        Transaction.validateAsync('date', trx_validate.validateTime, { message: 'Transaction not allowed between ' + trx_util.startTime + ' and ' + trx_util.endTime });
        var transaction;
        describe('validateAsync - date - fail', () => {
            
            before((done)=>{
                transaction = new Transaction(
                    {
                        source_Account_number: "AS125674",
                        target_account_number: "AS125678",
                        amount: 30,
                        date : new Date(2018,04,09,22,25,20,12,12)
                    });
                done();
            });
            
            it('time validation > 10.00 PM fails', function(done){
                transaction.isValid(function (isValid) {
                    isValid.should.equal(false);
                    done();
                });
                
            });
        });

        describe('validateAsync - date - success', () => {
            
            before((done)=>{
                transaction = new Transaction(
                    {
                        source_Account_number: "AS125674",
                        target_account_number: "AS125678",
                        amount: 30,
                        date : new Date()
                    });
                done();
            });
            
            it('time validation within range succeeds', function(done){
                transaction.isValid(function (isValid) {
                    isValid.should.equal(true);
                    done();
                });
                
            });
        });
    });

    describe('validateAsync - amount', () => {
        Transaction.validateAsync('amount', trx_validate.validateAmount, { message: 'amount cannot be 0 or negative' });
        describe('validateAsync - amount - success', () => {
            var transaction = new Transaction(
            {
                source_Account_number: "AS125674",
                target_account_number: "AS125678",
                amount: 30
            });
            it('amount > 0 succeeds', function(done){
                transaction.isValid(function (isValid) {
                    isValid.should.equal(true);
                    done();
                });
                
            });
        });


        describe('validateAsync - amount - fails', () => {
            var transaction = new Transaction(
            {
                source_Account_number: "AS125674",
                target_account_number: "AS125678",
                amount: -30
            });
            it('amount < 0 fails', function(done){
                transaction.isValid(function (isValid) {
                    isValid.should.equal(false);
                    done();
                });
                
            });
        });

        describe('validateAsync - amount - fails', () => {
            var transaction = new Transaction(
            {
                source_Account_number: "AS125674",
                target_account_number: "AS125678",
                amount: 0
            });
            it('amount = 0 fails', function(done){
                transaction.isValid(function (isValid) {
                    isValid.should.equal(false);
                    done();
                });
                
            });
        });
    });


    describe('validateAsync - scr and trg account uniqueness', () => {
        Transaction.validateAsync('source_Account_number', trx_validate.validateSourceTargetAccount, { message: 'source and target cannot be same' });
        describe('success', () => {
            var transaction = new Transaction(
            {
                source_Account_number: "AS125674",
                target_account_number: "AS125678",
                amount: 30
            });
            it('scr and trg account is unique = succeeds', function(done){
                transaction.isValid(function (isValid) {
                    isValid.should.equal(true);
                    done();
                });
                
            });
        });


        describe('fails', () => {
            var transaction = new Transaction(
            {
                source_Account_number: "AS125674",
                target_account_number: "AS125674",
                amount: 30
            });
            it('scr and trg account is not unique = fails', function(done){
                transaction.isValid(function (isValid) {
                    isValid.should.equal(false);
                    done();
                });
                
            });
        });
    }); */




