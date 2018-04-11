/* 'use strict';

module.exports = function (app) {
    var Account = app.models.Account;
    //account 1
    Account.create({ number: 'AS235689', balance: 100, type: 'savings', holder_id: '5acd9c2e1801d303b4d0bab2' },
        function (err, acc) {
            if (err) throw err;
        });
    // account 2
    Account.create({ number: 'AS235688', balance: 100, type: 'current', holder_id: '5acd9c2e1801d303b4d0bab2' },
        function (err, acc) {
            if (err) throw err;
        });

    Account.create({ number: 'AS235687', balance: 0, type: 'current', holder_id: '5acd9c2e1801d303b4d0bab3' },
        function (err, acc) {
            if (err) throw err;
        });

    Account.create({ number: 'AS235686', balance: -5560, type: 'current', holder_id: '5acd9c2e1801d303b4d0bab3' },
        function (err, acc) {
            if (err) throw err;
        });

}


 */