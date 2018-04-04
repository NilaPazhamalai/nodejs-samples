'use strict';

module.exports = function(Account) {
    Account.validatesPresenceOf('number', 'type', 'holder_id');
    Account.validatesLengthOf('number',  {is: 8, message: {is: 'Account number length incorrect'}});
    Account.validatesUniquenessOf('number', {message: 'Account number is not unique'});
};

/* {
    "accessType": "*",
    "principalType": "ROLE",
    "principalId": "$everyone",
    "permission": "DENY"
  }, 
  {
    "accessType": "*",
    "principalType": "ROLE",
    "principalId": "$authenticated",
    "permission": "DENY"
  }, */