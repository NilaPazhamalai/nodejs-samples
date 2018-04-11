var chai = require('chai');
var should = chai.should();

var app = require('../../../server/server');
var Transaction = app.models.Transaction;
var Account = app.models.Account;

var trx_validate = require('../../models/transaction_validation');
var trx_util = require('../../models/transaction_utils');
var trx_handler = require('../../models/transaction_remote_handlers');

var srcAcc = { number: 'AS235689', balance: 100, type: 'savings', holder_id: '5ac4cc971fe3d024382b4e32' };
var tgtAcc = { number: 'AS235688', balance: 100, type: 'current', holder_id: '5ac4cc971fe3d024382b4e32' };
var zeroSrcAcc = { number: 'AS235687', balance: 0, type: 'current', holder_id: '5ac4cc971fe3d024382b4e32' };
var negSrcAcc = { number: 'AS235686', balance: -5560, type: 'current', holder_id: '5ac4cc971fe3d024382b4e32' };


describe('Transaction - before remote hook test - date time', () => {

    var transaction = {};
    describe('date time set - success - date not in req', () => {
        const reqCtx = {
            req: {
                body: {
                    source_Account_number: "AS125674",
                    target_account_number: "AS125678",
                    amount: 30
                }
            }
        };

        it('date time set', function (done) {
            trx_handler.setDateTimeHandler(reqCtx, transaction, function () {
                should.exist(reqCtx.req.body.date);
                done();
            });
        });
    });


    describe('date time set - success - date  in req - override', () => {
        const reqCtx = {
            req: {
                body: {
                    source_Account_number: "AS125674",
                    target_account_number: "AS125678",
                    amount: 30,
                    date: new Date(2018, 04, 09, 22, 25, 20, 12, 12)
                }
            }
        };

        it('date time override', function (done) {
            trx_handler.setDateTimeHandler(reqCtx, transaction, function () {
                var createdDate = new Date(reqCtx.req.body.date);
                createdDate.getDate().should.equal(new Date().getDate());
                done();
            });
        });

        it('test error', function (done) {
            trx_handler.setDateTimeHandler(reqCtx, transaction, function () {
                var createdDate = new Date(reqCtx.req.body.date);
                createdDate.getDate().should.equal(new Date().getDate());
                done();
            });
        });
    });

});
 


 