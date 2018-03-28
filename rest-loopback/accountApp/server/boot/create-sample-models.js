'use strict';
var async = require('async');
module.exports = function(app) {
  // data sources
  var mongoDs = app.dataSources.dev_db; // 'name' of your mongo connector, you can find it in datasource.json
  // create all models
  async.parallel({
    customers: async.apply(createCustomers),
  }, function(err, results) {
    if (err) throw err;
    console.log('> cutomers created sucessfully');
    createAccounts(results.customers, function(err, accounts) {
      if (err) throw err;
      console.log('> accounts created sucessfully');
      createTransactions(accounts, results.customers, function(err) {
        if (err) throw err;
        console.log('> transactions created sucessfully');
      });
    });
  });
  // create customers
  function createCustomers(cb) {
    mongoDs.automigrate('Customer', function(err) {
      if (err) return cb(err);
      var Customer = app.models.Customer;
      Customer.create([{
        customerNumber: 'PER123456',
        password: 'per123456',
        firstName: 'Johan',
        lastName: 'Doel',
        age: 45,
      }, {
        customerNumber: 'PER123457',
        password: 'per123457',
        firstName: 'John',
        lastName: 'Doe',
        age: 32,
      },  {
        customerNumber: 'PER123458',
        password: 'per123458',
        firstName: 'Jo',
        lastName: 'Hiers',
        age: 28,
      },  {
        customerNumber: 'PER123452',
        password: 'per123452',
        firstName: 'Jack',
        lastName: 'Schepper',
        age: 34,
      }], cb);
    });
  }
  // create Accounts
  function createAccounts(customers, cb) {
    mongoDs.automigrate('Account', function(err) {
      if (err) return cb(err);
      var Account = app.models.Account;
      Account.create([{
        IBAN: 'BE45 4454 5222 2248',
        customer: customers[0],
        type: 'savings',
        balance: 124830,
      }, {
        IBAN: 'BE45 4454 5222 2241',
        customer: customers[0],
        type: 'current',
        balance: 2000,
      }, {
        IBAN: 'BE45 4454 5222 2888',
        customer: customers[2],
        type: 'savings',
        balance: 4136,
      }, {
        IBAN: 'BE45 4454 5222 2451',
        customer: customers[1],
        type: 'savings',
        balance: 25413,
      }], cb);
    });
  }
  // create Transactions
  function createTransactions(accounts, customers, cb) {
    mongoDs.automigrate('Transaction', function(err) {
      if (err) return cb(err);
      var Transaction = app.models.Transaction;
      var DAY_IN_MILLISECONDS = 1000 * 60 * 60 * 24;
      Transaction.create([{
        date: Date.now() - (DAY_IN_MILLISECONDS * 4),
        amount: 500,
        targetAccount: accounts[0].IBAN,
        sourceAccount: accounts[1].IBAN,
        customerNumber: customers[0].customerNumber,
      }, {
        date: Date.now() - (DAY_IN_MILLISECONDS * 2),
        amount: 150,
        targetAccount: accounts[2].IBAN,
        sourceAccount: accounts[0].IBAN,
        customerNumber: customers[3].customerNumber,
      }, {
        date: Date.now() - (DAY_IN_MILLISECONDS * 3),
        amount: 2641,
        targetAccount: accounts[0].IBAN,
        sourceAccount: accounts[2].IBAN,
        customerNumber: customers[3].customerNumber,
      }, {
        date: Date.now() - (DAY_IN_MILLISECONDS * 5),
        amount: 3620,
        targetAccount: accounts[2].IBAN,
        sourceAccount: accounts[1].IBAN,
        customerNumber: customers[2].customerNumber,
      }], cb);
    });
  }
};
