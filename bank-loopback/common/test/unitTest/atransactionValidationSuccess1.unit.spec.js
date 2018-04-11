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



describe('Transaction - before remote hook test - update account - SUCCESSSS', () => {

    var transaction = {};
    var reqCtx;
    console.log([reqCtx]);
    it('update accounts - success', function (done) {
        var reqCtx = {
            req: {
                body: {
                    source_Account_number: srcAcc.number,
                    target_account_number: tgtAcc.number,
                    amount: 20
                }
            }
        };

        trx_handler.updateAccountBalanceHandler(reqCtx, transaction, function () {
            should.exist(reqCtx.req.body.updSrc);
            should.exist(reqCtx.req.body.updTgt);
            done();
        });

    });
});

