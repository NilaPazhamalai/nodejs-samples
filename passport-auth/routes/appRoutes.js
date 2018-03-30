var express = require('express');
var router = express.Router();

var serveHelloPage = function (req, res) {
    res.status(200).send('Hello from Passport');
}
router.get('/', serveHelloPage);

module.exports = router;
