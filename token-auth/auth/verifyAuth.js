var config = require('../config');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var verifyToken = function(req,res,next){
    var accessToken = req.headers['x-access-token'];
    if(!accessToken) 
        return res.status(401).send({auth:false,message:'no token provided'});
    var decoded = jwt.verify(accessToken,config.secret);
    if(!decoded) 
        return res.status(500).send({auth:false,message:'Failed to authenticate'});
    req.userId = decoded.id;
    next();
}

module.exports = verifyToken;