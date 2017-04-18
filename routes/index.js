var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

	res.locals.error=req.session.error;
	res.render('index', { title: 'Account Information'});

});

router.get('/employee', function(req, res, next) {
  var db = req.con;
  var data = "";

	if(req.session.user==null)
		res.redirect('/');
		
	res.locals.username=req.session.user;

    db.query('SELECT *, (SELECT department.departName FROM department WHERE user_auth.Department = department.id) departName FROM user_auth', function(err, rows) {
        if (err) {
            console.log(err);
        }
        var data = rows;
	
		// use employee.ejs
        res.render('employee', { title: '', data: data});
    });

});

router.get('/userDelete', function(req, res, next) {

    var id = req.query.id;
    var db = req.con;
	
    var qur = db.query('DELETE FROM user_auth WHERE id = ?', id, function(err, rows) {
        if (err) {
            console.log(err);
        }
        res.redirect('/employee');
    });
});

router.get('/newEmployee', function(req, res, next) {
	
	var db = req.con;
    var data = "";

	res.locals.username=req.session.user;	
	
    db.query('SELECT * FROM department', function(err, rows) {
        if (err) {
            console.log(err);
        }
        var data = rows;

        // use index.ejs
        res.render('newEmployee', { title: '', data: data});
    });
});

router.post('/newEmployee', function(req, res, next) {

      var db = req.con;
	var id = req.body.id;
	
    var sql = {
		id: req.body.id,
		UserName: req.body.name,
		UserEmail: req.body.email,
		Department: req.body.dept
    };
    var qur = db.query('UPDATE user_auth SET ? WHERE id = ?', [sql, id], function(err, rows) {
	
        if (err) {
            console.log(err);
        }

        res.setHeader('Content-Type', 'application/json');
        res.redirect('/employee');
    });

});


// edit page
router.get('/userEdit', function(req, res, next) {

    var id = req.query.id;
    var db = req.con;
    var data = "";

	res.locals.username=req.session.user;
	
	db.query('SELECT * FROM user_auth WHERE id = ?', id, function(err, result1) {
			db.query('SELECT * FROM department', function(err, result2) {
			res.render('userEdit', { data : result1, data1: result2 });
			});
	});
});

router.post('/userEdit', function(req, res, next) {

    var db = req.con;
	var id = req.body.id;
	
    var sql = {
		id: req.body.id,
		UserName: req.body.new_name,
		UserEmail: req.body.new_email,
		Department: req.body.new_dept
    };
    var qur = db.query('UPDATE user_auth SET ? WHERE id = ?', [sql, id], function(err, rows) {
	
        if (err) {
            console.log(err);
        }

        res.setHeader('Content-Type', 'application/json');
        res.redirect('/employee');
    });
});

router.get('/department', function(req, res, next) {
  var db = req.con;
  var data = "";
	
	if(req.session.user==null)
		res.redirect('/');
		
	res.locals.username=req.session.user;

    db.query('SELECT * FROM department', function(err, rows) {
        if (err) {
            console.log(err);
        }
        var data = rows;
		
		// use employee.ejs
        res.render('department', { title: '', data: data});
    });
});

router.get('/newDepartment', function(req, res, next) {
	
	var db = req.con;
    var data = "";

	res.locals.username=req.session.user;	
	
    db.query('SELECT * FROM department', function(err, rows) {
        if (err) {
            console.log(err);
        }
        var data = rows;

        // use index.ejs
        res.render('newDepartment', { title: '', data: data});
    });
});

router.post('/newDepartment', function(req, res, next) {

    var db = req.con;

    var sql = {
        //id: req.body.id,
		departName:req.body.dept_name,
        groupMail: req.body.dept_email
    };
	
	res.locals.username=req.session.user;
	console.log(sql);
    var qur = db.query('INSERT INTO department SET ?', sql, function(err, rows) {
	
		console.log(qur);
        if (err) {
            console.log(err);
        }
		
        res.setHeader('Content-Type', 'application/json');
        res.redirect('/department');
    });
});

router.get('/deptDelete', function(req, res, next) {

    var id = req.query.id;
    var db = req.con;
	
    var qur = db.query('DELETE FROM department WHERE id = ?', id, function(err, rows) {
        if (err) {
            console.log(err);
        }
        res.redirect('/department');

    });
});

router.get('/deptEdit', function(req, res, next) {

    var id = req.query.id;
    var db = req.con;
    var data = "";

	res.locals.username=req.session.user;
	
    db.query('SELECT * FROM department WHERE id = ?', id, function(err, rows) {
        if (err) {
            console.log(err);
        }

        var data = rows;
        res.render('deptEdit', { title: '', data: data });
    });

});

router.post('/deptEdit', function(req, res, next) {

    var db = req.con;
	var id = req.body.id;
	
    var sql = {
		id: req.body.id,
        departName: req.body.new_deptName,
		groupMail: req.body.new_deptEmail
    };

	 var qur = db.query('UPDATE demo_nodejs.user_auth SET Department? WHERE Department IN (select departName from demo_nodejs.department where id=?)', [sql, id], function(err, rows) {
        if (err) {
            console.log(err);
        }
	});	

    var qur = db.query('UPDATE department SET ? WHERE id = ?', [sql, id], function(err, rows) {
        if (err) {
            console.log(err);
        }

        res.setHeader('Content-Type', 'application/json');
        res.redirect('/department');
    });
});

router.get('/employee_com', function(req, res, next) {
  var db = req.con;
  var data = "";
  
	if(req.session.user==null)
		res.redirect('/');
		
	res.locals.username=req.session.user;

    db.query('SELECT *, (SELECT department.departName FROM department WHERE user_auth.Department = department.id) departName FROM user_auth WHERE Department=?', req.session.dept, function(err, rows) {
        if (err) {
            console.log(err);
        }
        var data = rows;
		
		// use employee.ejs
        res.render('employee_com', { title: '', data: data});
    });
});

router.get('/department_com', function(req, res, next) {
  var db = req.con;
  var data = "";
	
	if(req.session.user==null)
		res.redirect('/');

	res.locals.username=req.session.user;
	
    db.query('SELECT * FROM department', function(err, rows) {
        if (err) {
            console.log(err);
        }
        var data = rows;
		
		// use employee.ejs
        res.render('department_com', { title: '', data: data});
    });
});

router.get('/my_account', function(req, res, next) {

    //var id = res.locals.id;
    var db = req.con;
    var data = "";
	
	res.locals.username=req.session.user;
	res.locals.id=req.session.id;

	db.query('SELECT *,(SELECT department.departName FROM department WHERE user_auth.Department = department.id) departName FROM user_auth WHERE id = ?', res.locals.id, function(err, rows) {
        if (err) {
            console.log(err);
        }
	
        var data = rows;
        res.render('my_account', { title: '', data: data });
    });
});

router.post('/my_account', function(req, res, next) {

    var db = req.con;
	var id = req.body.id;
	
    var sql = {
		id: req.body.id,
        UserPass: req.body.myNew_pwd
    };

    var qur = db.query('UPDATE user_auth SET ? WHERE id = ?', [sql, id], function(err, rows) {
	
        if (err) {
            console.log(err);
        }

        res.setHeader('Content-Type', 'application/json');
        res.redirect('/my_account');
    });
});
router.get('/logout', function(req, res) {

	 req.session=null;

	 //console.log(req.session);	
	 res.redirect('/');
	 
});

module.exports = router;



