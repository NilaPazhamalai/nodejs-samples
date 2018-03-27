var router = require('express').Router();
var accountRepo = require('./accountRepo.js');
var reqBodyParser = require('body-parser');

var paths = {
    accounts: '/',
    accountById: '/:id'
}

// Create application/x-www-form-urlencoded parser
var urlencodedParser = reqBodyParser.urlencoded({ extended: false })



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
    res.send("Server error in Account app routing: " + err);
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


 router.get(paths.accounts, getAccounts);
router.get(paths.accountById, findAccountById, notFoundErrorHandler);
router.post(paths.accounts, urlencodedParser, addNewAccount);
router.put(paths.accountById, urlencodedParser, updateAccount, notFoundErrorHandler);
router.delete(paths.accountById, deleteAccountById, notFoundErrorHandler);

router.use(logErrors);
router.use(clientErrorHandler);
router.use(errorHandler);

module.exports = router;