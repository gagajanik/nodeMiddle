/**
 * Created by root on 3/13/18.
 */
var express = require('express');
var axios = require('axios');
var router = express.Router();

    router.post('/login',  function(req, res, next) {

        if(!req.body.userName || !req.body.password){
            res.json({success:false,error:"მომხმარებელი და პაროლი აუცილებელია!"})
        } else {
            var requestObject = {
                userName:req.body.userName,
                password:req.body.password
            };
            axios.post('http://localhost:8080/api/auth',requestObject).then(function (response) {
                if(response['data']['userName']) {
                    req.session.username = response['data']['userName'];
                    req.session.userId = response['data']['id'];
                    req.session.userRole = response['data']['userRole'];
                    res.json(req.session);
                }
                else{
                    res.json({error:' მომხმარებელი ვერ მოიძება'})
                }
            }).catch(function (error) {
                res.json(error)
            });

        }
    });

    router.get('/get/session', function(req, res, next) {
        if(req.session.username){
            res.json({session:req.session})
        } else {
            res.json({session:null})
        }
    });
    router.get('/logout', function(req, res, next) {
        req.session.destroy();
        res.json({session:req.session});
    });
module.exports = router;
