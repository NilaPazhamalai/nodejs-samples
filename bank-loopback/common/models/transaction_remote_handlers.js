module.exports = {
    allowInitiateHandler : allowInitiateHandler,
    setDateTimeHandler : setDateTimeHandler,
    update : update,
    updateAccountBalanceHandler : updateAccountBalanceHandler
}

var trx_util = require('./transaction_utils');
var accUtil = require('./account_utils');
var getAccountAsync = accUtil.getAccountAsync;
var updateAccountBalancePromise = accUtil.updateAccountBalancePromise;
var updateAccountPromise = accUtil.updateAccountPromise;

// remote hook - existing rest end point create
function setDateTimeHandler(context, transaction, next) {
    context.req.body.date = new Date();
    next();
}

function allowInitiateHandler(cb) {
    var response = { allow: false, message: "Transaction not allowed between " + trx_util.startTime + " and " + trx_util.endTime };
    var allow = trx_util.checkCurrentTimeInRange(trx_util.startTime, trx_util.endTime, new Date());
    if (allow) {
        response.allow = true;
        response.message = "";
    }
    return cb(null, response);
}

 async function update(context, remoteMethodOutput, next) {
    try {
        var src = await getAccountAsync(context.req.body.source_Account_number);
        if (!src[0]) {
            console.log('source acc not found !!! ' + context.req.body.source_Account_number);
            var error = new Error('source acc not found !!! ' + context.req.body.source_Account_number);
            error.status = 422;
            return next(error);
        } else {
            if (src[0].balance < context.req.body.amount || (src[0].balance<=0)) {
                console.log('not enough balance in source acc to initiate transaction ');
                var error = new Error('not enough balance in source acc to initiate transaction ');
                error.status = 422;
                return next(error);
            }
        }
        var tgt = await getAccountAsync(context.req.body.target_account_number);
        if (!tgt[0]) {
            console.log('target acc not found !!! ' + context.req.body.target_account_number);
            var error = new Error('target acc not found !!! ' + context.req.body.target_account_number);
            error.status = 422;
            return next(error);
        }
        var updSrc = await updateAccountBalancePromise(src[0], context.req.body.amount, true);
        var updTgt = await updateAccountBalancePromise(tgt[0], context.req.body.amount, false);

        try {
            var updSrcAcc = await updateAccountPromise(updSrc);
            try {
                var updTgtAcc = await updateAccountPromise(updTgt);
                context.req.body.updSrc = updSrcAcc;
                context.req.body.updTgt = updTgtAcc;
                return next();
            } catch (err) {
                await updateAccountPromise(src); // log on error and some batch process to revert manually
                console.log('error occured while updating tgt acc, so src upd reverted !!!');
                return next(new Error('error occured while updating tgt acc, so src upd reverted !!!'));
            }
        }
        catch (err) {
            return next(err);
        }

    } catch (err) {
        return next(err);
    }


}


function updateAccountBalanceHandler(context, transaction, next) {
    update(context, transaction, next);
    // not for MongoDB , but for other connector "TRX" is available - below code can be used
    //this.updateAccountBalanceUsingTransaction(context, transaction, next);
}
/* 
TransactionRemoteHandler.prototype.updateAccountBalanceUsingTransaction = async function (context, transaction, next) {
    var Account = this.app.models.Account;
    var tx = await Account.beginTransaction('READ COMMITTED');

    try {
        var src = await this.getAccountAsyncTx(context.req.body.source_Account_number, tx);
        var tgt = await this.getAccountAsyncTx(context.req.body.target_account_number, tx);
        console.log([src, tgt, context.req.body.amount]);
        await this.updateAccountBalanceAsync(src[0], context.req.body.amount, true, tx);
        await this.updateAccountBalanceAsync(tgt[0], context.req.body.amount, false, tx);
        tx.commit();
        next();
    } catch (err) {
        tx.rollback(function (err) {
            // release the connection pool upon committing
            tx.close(err);
        });
        next(err);
    }
}



TransactionRemoteHandler.prototype.getAccountAsyncTx = function (account_number, tx) {
    var Account = this.app.models.Account;
    return new Promise(function (resolve, reject, ) {
        console.log(account_number);
        Account.find({ where: { number: account_number } }, { transaction: tx }, function (err, account) {
            if (err) {
                return reject(err);
            } else {
                return resolve(account);
            }
        });
    });
}

TransactionRemoteHandler.prototype.updateAccountBalanceAsync = function (account, balance, srcIc, tx) {
    var Account = this.app.models.Account;
    return new Promise(function (resolve, reject) {
        var bal = account.balance;
        if (srcIc) {
            bal -= balance;
        } else {
            bal += balance;
        }


        account.balance = bal;

        Account.upsert(account, { transaction: tx }, function (err, account) {
            if (err) {
                return reject(err);
            } else {
                return resolve(account);
            }
        });
    });
} */