var express = require('express');
var router = express.Router();

var mysql = require('mysql');
var DB_NAME = 'demo_nodejs';

var pool  = mysql.createPool({
    host     : 'localhost',
    user     : 'root',
    password : 'admin'
});

function User(user){
    this.username = user.username;
    this.userpass = user.userpass;
};

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

User.prototype.save = function save(callback) {
        var user = {
            username: this.username,
            userpass: this.userpass
        };

        var cmd = "INSERT INTO userinfo(id, username, userpass) VALUES(0,?,?)";

        connection.query(cmd, [user.username, user.userpass], function (err,result) {
            if (err) {
                return;
            }

            connection.release();
            callback(err,result);                     
        });       
    };
	
module.exports = router;
