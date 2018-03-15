var nodemailer = require('nodemailer');
var express = require('express');
var axios = require('axios');
var router = express.Router();

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'xxxx',
        pass: 'xxxx'
    }
});

router.post('/send',  function(req, res, next) {
    var mailObj = {
        mail:req.body.mail,
        pass:req.body.pass
    };
    var mailOptions = {
        from: 'bonifacius90@gmail.com',
        to: mailObj.mail,
        subject: 'Sending Email using Node.js',
        text: 'fake password :'+mailObj.pass
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
});
module.exports = router;