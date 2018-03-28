'use strict';

module.exports = function(Transaction) {
  module.exports = function(Transaction) {
    Transaction.beforeRemote('create', function(context, user, next) {
      context.args.data.date = Date.now();
      context.args.data.customerNumber = context.req.accessToken.customerNumber;
      next();
    });
  };
};
