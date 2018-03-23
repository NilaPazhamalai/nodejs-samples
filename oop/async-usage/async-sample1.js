var stub =  require('./async-sample1-stub-data.js');

var personDB = stub.personDB;
var accountDB = stub.accountDB;
var TransactionRepo = require('./async-transaction-repo.js');
var trxRepo = new TransactionRepo();

var trxPromise = trxRepo.findOneTransactionByDate(new Date("12/1/2018"));
trxPromise.then((trx)=>console.log(trx)).catch((err)=>console.log(err.stack));

var trxPromise1 = trxRepo.findOneTransactionById("trx 3");
trxPromise1.then((trx)=>console.log(trx)).catch((err)=>console.log(err.stack));





