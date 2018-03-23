var perRef = require('../Person.js');
var accRef = require('../Account.js');
var trxRef = require('../Transaction.js');
var Account = accRef.Account;
var Transaction = trxRef.Transaction;
//var Person = perRef.Person;  // defined in another way.

var personDB = [];
var accountDB = [];
var transactionDB = [];

for (let index = 0; index < 4; index++) {
    var accNo = "BE45 4454 5222 xxx" + index;
    var perNo = "ABC3433" + index;
    var acc = new Account(accNo, perNo, "savings");
    var person = new perRef(perNo, "John " + index, "Doe", 32 + index, "12,aa street, CA", "john@gmail.com", acc);
    personDB.push(person);
    accountDB.push(acc);

}

var trx = new Transaction("trx 1",accountDB[3].IBAN,accountDB[2].IBAN,456.15,new Date("12/1/2018"));
transactionDB.push(trx);
trx = new Transaction("trx 2",accountDB[1].IBAN,accountDB[2].IBAN,45.24,new Date("12/2/2018"));
transactionDB.push(trx);
trx = new Transaction("trx 3",accountDB[3].IBAN,accountDB[0].IBAN,56.75,new Date("12/3/2018"));
transactionDB.push(trx);
trx = new Transaction("trx 4",accountDB[2].IBAN,accountDB[0].IBAN,46.14,new Date("12/3/2018"));
transactionDB.push(trx);
trx = new Transaction("trx 5",accountDB[2].IBAN,accountDB[3].IBAN,4756.95,new Date("12/1/2018"));
transactionDB.push(trx);
trx = new Transaction("trx 6",accountDB[1].IBAN,accountDB[3].IBAN,65.54,new Date("12/1/2018"));
transactionDB.push(trx);

module.exports = {
    personDB : personDB,
    accountDB : accountDB,
    transactionDB : transactionDB
}