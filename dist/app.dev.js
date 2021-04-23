"use strict";

/*
 * @Descripttion: 
 * @version: 
 * @Author: wanglong
 * @Date: 2021-01-22 14:21:03
 * @LastEditors: wanglong
 * @LastEditTime: 2021-04-02 10:41:02
 */
var createError = require('http-errors');

var express = require('express');

var path = require('path');

var cookieParser = require('cookie-parser');

var logger = require('morgan');

var Todo = require("./models/Todo"); // 引入并使用cors中间件 处理跨域 


var cors = require("cors");

var indexRouter = require('./routes/index');

var userLogin = require('./routes/user/login');

var userRegister = require('./routes/user/register');

var addTodoRouter = require('./routes/addTodo');

var todoSearchRouter = require('./routes/todoSearch');

var todoDeleteRouter = require('./routes/deleteTodo');

var usersRouter = require('./routes/users');

var fileupload = require('./routes/fileUpload/fileupload');

var app = express();
app.use(cors()); // view engine setup

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express["static"](path.join(__dirname, 'public')));
app.use(express["static"](path.join(__dirname, "uploads")));
app.use('/', indexRouter); //登录

app.use('/login', userLogin); //注册

app.use('/register', userRegister);
app.use('/users', usersRouter); //新增todo

app.use('/todo/create', addTodoRouter); //查询列表

app.use('/todo/search', todoSearchRouter); //删除todo

app.use('/todo/delete', todoDeleteRouter); //文件上传

app.use('/file-upload', fileupload); // catch 404 and forward to error handler

app.use(function (req, res, next) {
  next(createError(404));
}); // error handler

app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {}; // render the error page

  res.status(err.status || 500);
  res.render('error');
});
module.exports = app;