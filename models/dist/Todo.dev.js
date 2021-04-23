"use strict";

/*
 * @Descripttion: 
 * @version: 
 * @Author: wanglong
 * @Date: 2021-01-22 14:24:26
 * @LastEditors: wanglong
 * @LastEditTime: 2021-03-03 16:58:16
 */
var mysql = require("mysql"); //链接数据库！！！
//把数据库的密码，账号，地址，端口，表格都连接上！！


var Todo = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "12345",
  port: "3306",
  database: "todo" //数据库

});
Todo.connect(function (err) {
  if (err) throw err;
  console.log("mysql链接成功");
});
module.exports = Todo;