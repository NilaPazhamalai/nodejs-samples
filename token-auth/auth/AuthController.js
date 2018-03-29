var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: false }));  // to use bodyparser in url encloding
router.use(bodyParser.json());

var User = require('../user/User');

//tokens
var config = require('../config');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var verifyToken = require('./verifyAuth');


var registerNewUser = async function (req, res) {
    try {
        var hashedPwd = await bcrypt.hash(req.body.password, 7);
        var user = await User.create(
            {
                name: req.body.name,
                email: req.body.email,
                password: hashedPwd
            });
        // create token
        var token = jwt.sign({ id: user._id }, config.secret, { expiresIn: 2000 });
        res.status(200).send({ auth: true, token: token, user: user });

    } catch (err) {
        if (err) return res.status(500).send("There was a problem adding the user to the database.");
    }
}
router.post('/register', registerNewUser);


var loginUser = async function (req, res) {
    try{
        var user = await User.findOne({email:req.body.email});
        var pwdIsValid = await bcrypt.compare(req.body.password,user.password);
        if(pwdIsValid){
            // create token
            var token = jwt.sign({ id: user._id }, config.secret, { expiresIn: 2000 });
            return res.status(200).send({ auth: true, token: token, user: user });
        }else{
            return res.status(401).send("Password incorrect"); 
        }
    }catch(err){
        return res.status(400).send("user not found");
    }
} 

router.post('/login', loginUser);


var serveHomePage = async function(req, res){
    try{
        var user = await User.findById(req.userId, {password:0});
        res.status(200).send("<h1> Hello " + user.name +"  </h1>");
    }catch(err){
        return res.status(401).send("User not found");
    }
}
router.get('/home', verifyToken, serveHomePage);


router.get('/logout', function(req, res) {
    res.status(200).send({ auth: false, token: null });
  });


module.exports = router;





/*


var registerNewUser = function (req, res) {
    var hashedPwd = bcrypt.hashSync(req.body.password, 7);
    User.create(
        {
            name: req.body.name,
            email: req.body.email,
            password: hashedPwd
        },
        function (err, user) {
            if (err) return res.status(500).send("There was a problem adding the user to the database.");
            // create token
            var token = jwt.sign({ id: user._id }, config.secret, { expiresIn: 2000 });
            res.status(200).send({ auth: true, token: token, user: user });
        }
    );
} 



var loginUser = function (req, res) {
    User.findOne({email:req.body.email},
    function(err, user){
        if (err) return res.status(400).send("user not found");
        console.log([user]);
        var pwdIsValid = bcrypt.compareSync(req.body.password,user.password);
        if(pwdIsValid){
            // create token
            var token = jwt.sign({ id: user._id }, config.secret, { expiresIn: 2000 });
            res.status(200).send({ auth: true, token: token, user: user });
        }else{
            if (err) return res.status(400).send("Password incorrect"); 
        }
    });
} 


var verify = function(req,res){
    var accessToken = req.headers['x-access-token'];
    if(!accessToken) return res.status(401).send({auth:false,message:'no token provided'});
    var dec = jwt.verify(accessToken,config.secret);
    if(!dec) return res.status(500).send({auth:false,message:'Failed to authenticate'});
    User.findById(dec.id, {password:0}, function(err,user){
        res.status(200).send({ auth: true, user:user});
        if(err)  return res.status(401).send("User not found");
    });
    
}


*/