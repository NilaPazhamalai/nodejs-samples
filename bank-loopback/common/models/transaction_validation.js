module.exports = {
    validateTime : validateTime,
    validateAmount : validateAmount,
    validateSourceTargetAccount : validateSourceTargetAccount
}

var trx_util = require('./transaction_utils');

function validateTime(err, done) {
    var date = this.date;
    var allow = trx_util.checkCurrentTimeInRange(trx_util.startTime, trx_util.endTime, date);
    process.nextTick(function () {
        if (!allow) err();
        done();
    });
}

function validateAmount(err, done) {
    var amount = this.amount;
    process.nextTick(function () {
        if (amount <= 0) err();
        done();
    });
}

function validateSourceTargetAccount(err, done) {
    var src = this.source_Account_number;
    var tgt = this.target_account_number
    process.nextTick(function () {
        if (src === tgt) err();
        done();
    });
}