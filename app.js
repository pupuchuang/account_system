var cookieSession = require('cookie-session');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');
var reg = require('./routes/reg');
var login = require('./routes/login');
//var logout = require('./routes/logout');
// DataBase 
var mysql = require("mysql");

var con = mysql.createConnection({
    host: "localhost",
    user: "pupu",
    password: "123456",
    database: "demo_nodejs",
	port: 3306
});

con.connect(function(err) {
    if (err) {
        console.log('connecting error');
        return;
    }
    console.log('connecting success');
});

var app = express();
/*

*/
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');



// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cookieSession({
  name: 'session',
  secret:'secret',
  keys: ['key1', 'key2']
}));


app.use(express.static(path.join(__dirname, 'public')));
// db state
app.use(function(req, res, next) {
    req.con = con;
    next();
});

app.use('/', index);
app.use('/users', users);
app.use('/reg', reg);
app.use('/login', login);
//app.use('/logout', logout);

app.get('/department', function (req, res) {
  res.render('department', {
    title: 'department',
    layout: 'template'
  });    
});

app.get('/newDepartment', function (req, res) {
  res.render('newDepartment', {
    title: 'newDepartments',
    layout: 'template'
  });    
});

app.get('/employee', function (req, res) {
  res.render('employee', {
    title: 'employee',
    layout: 'template'
  });    
});

app.get('/employeeEdit', function (req, res) {
  res.render('employeeEdit', {
    title: 'employeeEdit',
    layout: 'template'
  });    
});

app.get('/newEmployee', function (req, res) {
  res.render('newEmployee', {
    title: 'newEmployee',
    layout: 'template'
  });    
});

app.get('/employee_com', function (req, res) {
  res.render('employee_com', {
    title: 'employee_com',
    layout: 'template'
  });    
});

app.get('/department_com', function (req, res) {
  res.render('employee_com', {
    title: 'employee_com',
    layout: 'template'
  });    
});
		  	
app.get('/my_account', function (req, res) {
  res.render('my_account', {
    title: 'my_account',
    layout: 'template'
  });    
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

/*app.get('/logout', function(req, res) {
	console.log("9487");
	
		delete req.session;
	console.log("mmmmmmmmmmmmm");
		 res.redirect('/');
});*/

module.exports = app;
