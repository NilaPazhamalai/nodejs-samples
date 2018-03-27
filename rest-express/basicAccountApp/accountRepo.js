var repo = require('../stub-data.js')
var Account = require('C:/Users/vennilap/Documents/nodejs-samples/oop/Account.js').Account;
function getAccounts() {
    return repo.accountDB;
}

function addNewAccount(account) {
    repo.accountDB.push(account);
}


function updateAccount(id, account) {
    for (let index = 0; index < repo.accountDB.length; index++) {
        const element = repo.accountDB[index];
        if (element.IBAN == id) {
            repo.accountDB[index] = account;
            return true;
        }
    }
    return false;
}


function deleteAccountById(id) {
    for (let index = 0; index < repo.accountDB.length; index++) {
        const element = repo.accountDB[index];
        if (element.IBAN == id) {
            repo.accountDB.splice(index, 1);
            return true;
        }
    }
    return false;
}


function findAccountById(id) {
    for (let index = 0; index < repo.accountDB.length; index++) {
        const element = repo.accountDB[index];
        if (element.IBAN == id) {
            return element;
        }
    }
}

function createNewAccount(IBAN, personNo, type) {
    return new Account(IBAN, personNo, type);
}

module.exports = {
    createNewAccount : createNewAccount,
    addNewAccount : addNewAccount,
    getAccounts : getAccounts,
    findAccountById : findAccountById,
    updateAccount : updateAccount,
    deleteAccountById : deleteAccountById
}
