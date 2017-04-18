var express = require('express'),
    User = require('../models/user.js'),
    router = express.Router(),
    crypto = require('crypto'),
    title = '登入';


router.get('/', function(req, res) {
	res.locals.username=req.session.user;
	res.locals.error=req.session.error;
	res.locals.id=req.session.id;
	res.render('login', {title:title});
});


router.post('/', function(req, res) {

    var userName = req.body['txtUserName'],
        userPwd = req.body['txtUserPwd'],
        md5 = crypto.createHash('md5');
		
    var db=req.con;  
    User.getUserByUserName(userName, db, function (err, results) {                           
        if(results == '') {
            res.locals.error = '使用者不存在';
			res.redirect('/');
            res.render('login',{title:title});
            return;
        }
	
        //UserPass = md5.update(UserPass).digest('hex');

		//console.log(results[0].UserName);
		//console.log(results[0].UserPass);
		
		if(results[0].UserName != userName || results[0].UserPass != userPwd) {

            req.session.error = '使用者帳號或密碼錯誤';
            //res.render('login',{title:title});
			console.log(req.session.error);
			res.redirect('/');
            return;
        } 
		else {
            res.locals.username = userName;       
            req.session.user = res.locals.username; 
            req.session.dept = results[0].Department; 
			req.session.id = results[0].id                      
            res.redirect('/login');
            return;
        } 	
    });             
});

module.exports = router;