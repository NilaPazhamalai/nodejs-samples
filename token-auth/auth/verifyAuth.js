var config = require('../config');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var verifyToken = async function (req, res, next) {
    var accessToken = req.headers['x-access-token'];
    if (!accessToken)
        return res.status(401).send({ auth: false, message: 'no token provided' });
    try {
        var decoded = await jwt.verify(accessToken, config.secret);
        if (!decoded)
            return res.status(500).send({ auth: false, message: 'Failed to authenticate' });
        req.userId = decoded.id;
        next();
    } catch (err) {
        return res.status(401).send({ auth: false, message: 'Unauthorized', err: err });
    }
}

module.exports = verifyToken;