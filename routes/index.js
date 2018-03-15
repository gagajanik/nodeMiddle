var express = require('express');
var request = require("request");
var router = express.Router();

/* GET home page. */
/*router.get('/', function(req, res, next) {

  res.render('index', { title: 'Form Validation', success:req.session.success, tt:req.session.userName, errors:req.session.errors });
});*/

router.post('/submit',  function(req, res, next) {
    req.check('userName','userName is empty').isLength({min:7});
    req.check('password','password length incorect').isLength({min:4});
    res.writeHeader(200,{'content-type':'json/plain'});
    var errors = req.validationErrors();
    if (errors){
        req.session.errors=errors;
        req.session.success=false;
    }
    else {
        req.session.success=true;
        req.session.userName=req.body.userName;
        req.session.password=req.body.password;
        res.write('{status:"kaia"}'+req.session.userName);

    }
    res.end();
});

router.get('/status',  function(req, res, next) {

    require(auth);
});


module.exports = router;
