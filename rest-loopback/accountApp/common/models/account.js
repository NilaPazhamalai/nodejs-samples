'use strict';

module.exports = function(Account) {
  Account.status = function(IBAN, cb) {
    var WARNING_LIMIT = 20000;
    var response;
    var account = Account.find({'where': {'IBAN': IBAN}});
    account.then((result)=>{
      console.log('success in promise account fn');
      console.log(result[0]);
      if (result[0].balance >= WARNING_LIMIT) {
        response = 'Balance normal';
      } else {
        response = 'Balance low WARNING';
      }
      cb(null, response);
    },
    (err)=>{
      console.log('error in Promise :  ' + err);
    })
    .catch((reject)=>{
      console.log('exception: ' + reject);
    });
  };
  Account.remoteMethod(
        'status', {
          http: {
            path: '/status',
            verb: 'get',
          },
          returns: {
            arg: 'status',
            type: 'string',
          },
          accepts: {
            arg: 'IBAN',
            type: 'string',
            http: {
              source: 'query',
            },
          },
        }
    );
};
