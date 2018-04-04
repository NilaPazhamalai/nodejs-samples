'use strict';

module.exports = function (Transaction) {
    Transaction.validatesPresenceOf('source_Account_number', 'target_account_number', 'amount');
    Transaction.validatesNumericalityOf('amount', { message: { number: 'Amount value incorrect' } });



    // remote hook - existing rest end point create
    Transaction.beforeRemote('create', function (context, transaction, next) {
        transaction.date = Date.now();
        next();
    });

    Transaction.validateAsync('amount', validateAmount, { message: 'amount cannot be 0 or negative' });
    Transaction.validateAsync('source_Account_number', validateSourceTargetAccount, { message: 'source and target cannot be same' });

    //custom validations
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


    // remote method to check timing before initiating transaction
    Transaction.allowInitiate = function (cb) {
        var startTime = '9:00 AM';
        var endTime = '6:00 PM';
        var response = {allow:false,message:''};
        var now = new Date();
        var startDate = dateObj(startTime);
        var endDate = dateObj(endTime);
        function dateObj(d) {
            var parts = d.split(/:|\s/),
                date = new Date();
            if (parts.pop().toLowerCase() == 'pm') parts[0] = (+parts[0]) + 12;
            date.setHours(+parts.shift());
            date.setMinutes(+parts.shift());
            date.setSeconds('00','00');
            return date;
        }

        console.log([now.toTimeString(),startDate.toTimeString(),endDate.toTimeString()]);
        var allow = now < endDate && now > startDate;
         if (!allow) {
            response.allow=false;
            response.message="Transaction not allowed between " + startTime + " and " + endTime;
        }else{
            response.allow=true;
            response.message="";
        }
        return cb(null,response);
    };
    Transaction.remoteMethod(
        'allowInitiate', {
            http: {
                path: '/allowInitiate',
                verb: 'get',
            },
            returns: {
                arg: 'allowInitiate',
                type: 'object',
            },
            },
    );

};
