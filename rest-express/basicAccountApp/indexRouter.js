var router = require('express').Router();


function serveIndexPage(req,res,next){
    res.sendFile( __dirname + "/public/" + "index.html");
}
router.get('/', serveIndexPage);

module.exports = router;