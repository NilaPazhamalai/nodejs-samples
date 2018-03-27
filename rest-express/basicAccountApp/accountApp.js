var express = require('express');
var accountApp = express();
var accountRepo = require('./accountRepo.js');
var reqBodyParser = require('body-parser');

var paths = {
    accounts: '/accounts',
    accountById: '/accounts/:id'
}

// Create application/x-www-form-urlencoded parser
var urlencodedParser = reqBodyParser.urlencoded({ extended: false })

function listenerHandler() {
    console.log('server listening');
}

function getAccounts(req, res) {
    var output = accountRepo.getAccounts();
    res.send(output);
}

function addNewAccount(req, res) {
    // retrieve details from req body
    var formData = req.body;
    var newAcc = accountRepo.createNewAccount(formData.IBAN, formData.personNo, formData.type);
    accountRepo.addNewAccount(newAcc);
    res.send(accountRepo.getAccounts());
}


function updateAccount(req, res) {
    var id = req.params.id;
    var formData = req.body;
    var newAcc = accountRepo.createNewAccount(formData.IBAN, formData.personNo, formData.type);
    if (id) {
        var ok = accountRepo.updateAccount(id, newAcc);
        if (ok) {
            res.send(accountRepo.getAccounts());
        } else {
            next();
        }
    } else {
        next('not_found_error');
    }

}


function deleteAccountById(req, res) {
    var id = req.params.id;
    var ok = accountRepo.deleteAccountById(id);
    if (ok) {
        res.send(accountRepo.getAccounts());
    } else {
        next('not_found_error');
    }
}


function findAccountById(req, res) {
    var id = req.params.id;
    var acc = accountRepo.findAccountById(id);
    if (acc) {
        res.send(acc);
    } else {
        next('not_found_error');
    }
}

// stack order for handling
//-these erros
// any way to define custom one for all type of methods
function notFoundErrorHandler(err, req, res, next) {
    res.status(404)
    res.send("error - Resource not found ");
}
function errorHandler(err, req, res, next) {
    res.status(500)
    res.send("Server error : " + err);
}

function logErrors(err, req, res, next) {
    console.error(err.stack)
    next(err)
}
function clientErrorHandler(err, req, res, next) {
    if (req.xhr) {
        res.status(500).send({ error: 'Something failed!' })
    } else {
        next(err)
    }
}
accountApp.get(paths.accounts, getAccounts);
accountApp.get(paths.accountById, findAccountById, notFoundErrorHandler);
accountApp.put(paths.accounts, urlencodedParser, addNewAccount);
accountApp.post(paths.accountById, urlencodedParser, updateAccount, notFoundErrorHandler);
accountApp.delete(paths.accountById, deleteAccountById, notFoundErrorHandler);

accountApp.use(logErrors);
accountApp.use(clientErrorHandler);
accountApp.use(errorHandler);

accountApp.listen(8080, listenerHandler);