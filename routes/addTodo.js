/*
 * @Descripttion: 
 * @version: 
 * @Author: wanglong
 * @Date: 2021-01-22 14:41:42
 * @LastEditors: wanglong
 * @LastEditTime: 2021-02-02 10:06:37
 */
var express = require("express");
var Todo = require("../models/Todo");
var router = express.Router();

/* GET home page. */
router.post("/", function(req, res, next) {
    let body = req.body;
    // 这是增数据，顺序执行！！！！！
    let id = new Date().getTime();
    var addSql =
        "INSERT INTO todolist(id,userId,finished,content,createTime,updateTime) VALUES(?,?,?,?,?,?)";
    //这是想增加的数据
    let addData = [id, body.userId, false, body.content, new Date().getTime(), ""];

    //增
    Todo.query(addSql, addData, function(err, result) {
        //询问访问数据库，也就是去嫩那个数据库
        if (err) {
            //失败就报个错
            console.log("[INSERT ERROR] - ", err.message);
            return;
        }
        let data = {
            code: 200,
            msg: "新增成功",
        };
        res.send(data);
    });
});

module.exports = router;