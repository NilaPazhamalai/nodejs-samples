'use strict';
var app = require('../../server/server');
module.exports = function (Transaction) {
    var trx_util = require('./transaction_utils');
    var trx_validate = require('./transaction_validation');
    var trx_handler = require('./transaction_remote_handlers');

    Transaction.validatesPresenceOf('source_Account_number', 'target_account_number', 'amount');
    Transaction.validatesNumericalityOf('amount', { message: { number: 'Amount value incorrect' } });
    Transaction.validateAsync('amount', trx_validate.validateAmount, { message: 'amount cannot be 0 or negative' });
    Transaction.validateAsync('source_Account_number', trx_validate.validateSourceTargetAccount, { message: 'source and target cannot be same' });
    Transaction.validateAsync('date', trx_validate.validateTime, { message: 'Transaction not allowed between ' + trx_util.startTime + ' and ' + trx_util.endTime });

    
  

    Transaction.beforeRemote('create', trx_handler.setDateTimeHandler);
    Transaction.beforeRemote('create', trx_handler.updateAccountBalanceHandler); 

    Transaction.allowInitiate = trx_handler.allowInitiateHandler;
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
            });
 
   
};
