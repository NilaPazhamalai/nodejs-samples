/* var chai = require('chai');
var should = chai.should();

var app = require('../../../server/server');
var Transaction = app.models.Transaction;
var Account = app.models.Account;

var trx_validate = require('../../models/transaction_validation');
var trx_util = require('../../models/transaction_utils');
var trx_handler = require('../../models/transaction_remote_handlers').TransactionRemoteHandler;
var t = new trx_handler(app);

var srcAcc = { number: 'AS235689', balance: 100, type: 'savings', holder_id: '5ac4cc971fe3d024382b4e32' };
var tgtAcc = { number: 'AS235688', balance: 100, type: 'current', holder_id: '5ac4cc971fe3d024382b4e32' };
var zeroSrcAcc = { number: 'AS235687', balance: 0, type: 'current', holder_id: '5ac4cc971fe3d024382b4e32' };
var negSrcAcc = { number: 'AS235686', balance: -5560, type: 'current', holder_id: '5ac4cc971fe3d024382b4e32' };
 */
/* //account 1
Account.create({ number: 'AS235689', balance: 100, type: 'savings', holder_id: '5ac4cc971fe3d024382b4e32' },
    function (err, acc) {
        if (err) throw err;
        srcAcc = acc;
    });
// account 2
Account.create({ number: 'AS235688', balance: 100, type: 'current', holder_id: '5ac4cc971fe3d024382b4e32' },
    function (err, acc) {
        if (err) throw err;
        tgtAcc = acc;
    });

Account.create({ number: 'AS235687', balance: 0, type: 'current', holder_id: '5ac4cc971fe3d024382b4e32' },
    function (err, acc) {
        if (err) throw err;
        zeroSrcAcc = acc;
    });

Account.create({ number: 'AS235686', balance: -5560, type: 'current', holder_id: '5ac4cc971fe3d024382b4e32' },
    function (err, acc) {
        if (err) throw err;
        negSrcAcc = acc;
    }); */


/* 
describe('Transaction - before remote hook test - update account', () => {

    var transaction = {};
    var reqCtx;

    


    describe('update account - fail on zero balance ', () => {
        before((done)=> {
            reqCtx = {
                req: {
                    body: {
                        source_Account_number: zeroSrcAcc.number,
                        target_account_number: tgtAcc.number,
                        amount: 20
                    }
                }
            }; done();
        });



        it('update accounts - fail on zero balance', function (done) {
            var next = ()=>{}
            var next = (error)=>{
                should.exist(error);
                done();
            }
            t.updateAccountBalanceHandler(reqCtx, transaction, next);
        });
    });


    /* describe('update account - fail on nega balance ', () => {
        before((done) => {
            reqCtx = {
                req: {
                    body: {
                        source_Account_number: negSrcAcc.number,
                        target_account_number: tgtAcc.number,
                        amount: 20
                    }
                }
            }; done();
        });



        it('update accounts - fail on nega balance', function (done) {
            t.updateAccountBalanceHandler(reqCtx, transaction, function (err) {
                should.not.exist(reqCtx.req.body.updSrc);
                should.not.exist(reqCtx.req.body.updTgt);
                done();
            });
        });
    });

    describe('update account - src account not found ', () => {
        before((done) =>{
            reqCtx = {
                req: {
                    body: {
                        source_Account_number: negSrcAcc.number + '1',
                        target_account_number: tgtAcc.number,
                        amount: 20
                    }
                }
            }; 
            done();
        });



        it('update accounts - src account not found', function (done) {
            t.updateAccountBalanceHandler(reqCtx, transaction, function (err) {
                should.not.exist(reqCtx.req.body.updSrc);
                should.not.exist(reqCtx.req.body.updTgt);
                done();
            });
        });
    });


    describe('update account - tgt account not found ', () => {
        before((done) => {
            reqCtx = {
                req: {
                    body: {
                        source_Account_number: negSrcAcc.number,
                        target_account_number: tgtAcc.number + '1',
                        amount: 20
                    }
                }
            };
            done();
        });

        it('update accounts - tgt account not found', function (done) {
            t.updateAccountBalanceHandler(reqCtx, transaction, function (err) {
                should.not.exist(reqCtx.req.body.updSrc);
                should.not.exist(reqCtx.req.body.updTgt);
                done();
            });
        });
    }); 
});

 */