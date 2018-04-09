module.exports = {
    TransactionRemoteHandler: TransactionRemoteHandler
}
function TransactionRemoteHandler(app) {
    this.app = app;
}

var trx_util = require('./transaction_utils');

// remote hook - existing rest end point create
TransactionRemoteHandler.prototype.setDateTimeHandler = function (context, transaction, next) {
    context.req.body.date = new Date();
    next();
}

TransactionRemoteHandler.prototype.allowInitiateHandler = function (cb) {
    var response = { allow: false, message: "Transaction not allowed between " + trx_util.startTime + " and " + trx_util.endTime };
    var allow = trx_util.checkCurrentTimeInRange(trx_util.startTime, trx_util.endTime, new Date());
    if (allow) {
        response.allow = true;
        response.message = "";
    }
    return cb(null, response);
}

TransactionRemoteHandler.prototype.getAccountAsync = function (account_number) {
    var Account = this.app.models.Account;
    return new Promise(function (resolve, reject) {
        console.log(account_number);
        Account.find({ where: { number: account_number } }, function (err, account) {
            if (err) {
                return reject(err);
            } else {
                return resolve(account);
            }
        });
    });
}

TransactionRemoteHandler.prototype.updateAccountBalancePromise = function (account, balance, srcIc) {
    return new Promise(function (resolve, reject) {
        var bal = account.balance;
        if (srcIc) {
            bal -= balance;
        } else {
            bal += balance;
        }
        account.balance = bal;
        resolve(account);
    });
}

TransactionRemoteHandler.prototype.updateAccountPromise = function (account) {
    var Account = this.app.models.Account;
    return new Promise(function (resolve, reject) {
        Account.upsert(account, function (err, account) {
            if (err) {
                return reject(err);
            } else {
                return resolve(account);
            }
        });
    });

}

TransactionRemoteHandler.prototype.update = async function(context, remoteMethodOutput, next) {
    try {
        var src = await this.getAccountAsync(context.req.body.source_Account_number);
        if (!src[0]) {
            console.log('source acc not found !!! ' + context.req.body.source_Account_number);
            var error = new Error('source acc not found !!! ' + context.req.body.source_Account_number);
            error.status = 422;
            next(error);
        } else {
            if (src[0].balance < context.req.body.amount) {
                console.log('not enough balance in source acc to initiate transaction ');
                var error = new Error('not enough balance in source acc to initiate transaction ');
                error.status = 422;
                next(error);
            }
        }
        var tgt = await this.getAccountAsync(context.req.body.target_account_number);
        if (!tgt[0]) {
            console.log('target acc not found !!! ' + context.req.body.target_account_number);
            var error = new Error('target acc not found !!! ' + context.req.body.target_account_number);
            error.status = 422;
            next(error);
        }
        console.log([src, tgt, context.req.body.amount]);
        var updSrc = await this.updateAccountBalancePromise(src[0], context.req.body.amount, true);
        var updTgt = await this.updateAccountBalancePromise(tgt[0], context.req.body.amount, false);

        try {
            var updSrcAcc = await this.updateAccountPromise(updSrc);
            try {
                var updTgtAcc = await this.updateAccountPromise(updTgt);
                console.log('updated accounts');
                console.log([updSrcAcc, updTgtAcc]);
                next();
            } catch (err) {
                await this.updateAccountPromise(src); // log on error and some batch process to revert manually
                console.log('error occured while updating tgt acc, so src upd reverted !!!');
                next(new Error('error occured while updating tgt acc, so src upd reverted !!!'));
            }
        }
        catch (err) {
            next(err);
        }

    } catch (err) {
        next(err);
    }


}


TransactionRemoteHandler.prototype.updateAccountBalanceHandler = function (context, transaction, next) {
    this.update(context, transaction, next);

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