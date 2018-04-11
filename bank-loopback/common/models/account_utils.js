var app = require('../../server/server');
exports.getAccountAsync =  (account_number) => {
    var Account = app.models.Account;
    return new Promise(function (resolve, reject) {
        Account.find({ where: { number: account_number } }, function (err, account) {
            if (err) {
                return reject(err);
            } else {
                return resolve(account);
            }
        });
    });
}

exports.updateAccountBalancePromise =  (account, balance, srcIc) => {
    return new Promise(function (resolve, reject) {
       if(balance){
        var bal = account.balance;
        if (srcIc) {
            bal -= balance;
        } else {
            bal += balance;
        }
        account.balance = bal;
        resolve(account);
    }else{
        reject(new Error('amount not number'));
    }
    });
}

exports.updateAccountPromise =  (account) => {
    var Account = app.models.Account;
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