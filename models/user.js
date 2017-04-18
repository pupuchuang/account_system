var mysql = require('mysql');
var DB_NAME = 'demo_nodejs';

var pool  = mysql.createPool({
    host     : 'localhost',
    user     : 'pupu',
    password : '123456'
});

function User(user){
    this.username = user.username;
    this.userpass = user.userpass;
};

User.prototype.save = function save(callback) {
        var user = {
            username: this.username,
            userpass: this.userpass
        };

        var cmd = "INSERT INTO user_auth(id, username, userpass) VALUES(0,?,?)";

        connection.query(cmd, [user.username, user.userpass], function (err,result) {
            if (err) {
                return;
            }

            connection.release();
            callback(err,result);                     
        });       
    };
	
//檢查是否為會員
User.getUserNumByName = function getUserNumByName(username, callback) {
       //使用username 來檢查是否有資料
        var connection=app.con;
        var cmd = 'select COUNT(1) AS num from user info where username = ?';
        connection.query(cmd, [username], function (err, result) {
            if (err) {
                return;
            }
            connection.release();
            //查詢結果使用 callback 呼叫，並將 err, result 參數帶入
            callback(err,result);                    
        });       
};

//透過帳號取得使用者資料
User.getUserByUserName = function getUserByUserName(username, db, callback) {
		
        var cmd = 'select * from user_auth where username = ?';
		//var cmd = 'select * from aaa';
        db.query(cmd, [username], function (err, result) {
            if (err) {
                return;
            }
           // connection.release();
		   console.log(result);
            callback(err,result);                    
        });       
    };	
	
module.exports = User;
	
	