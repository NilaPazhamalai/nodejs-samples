var stub = require('./async-sample1-stub-data.js');
var transactionDB = stub.transactionDB;

function TransactionRepo() {
}


TransactionRepo.prototype.getAllTransactions = function () {
    return transactionDB;
}

TransactionRepo.prototype.getAllTransactionDate = async function () {
    return await extractDateFromTransaction();

}

TransactionRepo.prototype.extractDateFromTransaction = function () {
    var dateArray = [];
    transactionDB.forEach(element => {
        dateArray.push(element.date);
    });
    return dateArray;
}

TransactionRepo.prototype.extractUniqueTransactionDates = async function () {
    var dateArray = await extractDateFromTransaction();
    return dateArray.filter(unique);
}

function unique(value, index, array) {
    return array.indexOf(value) === index;
}

TransactionRepo.prototype.findOneTransactionByDate = async function (date) {
    var trx = await this.searchTransactionDBByDate(date);
    if (trx) {
        return trx;
    } else {
        return new Error('Transaction with date ' + date + ' not found in DB');
    }
}


TransactionRepo.prototype.searchTransactionDBByDate = function (date) {
    transactionDB.forEach(element => {
        console.log(element.date);
        if (element.date == date) {
            return element;
        }
    });

}

TransactionRepo.prototype.findOneTransactionById = async function (id) {
    var trx = await this.searchTransactionDBById(id);
    if (trx) {
        return trx;
    } else {
        return new Error('Transaction with id ' + id + ' not found in DB');
    }
}


TransactionRepo.prototype.searchTransactionDBById = async function (id) {
    var f;
    var f = await transactionDB.forEach(element => {
            console.log(element.id);
                if (element.id == id) {
                   t =  element;
                   return t;
                }
            });
    return f?t:null;

}


module.exports = TransactionRepo;
