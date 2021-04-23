/*
 * @Descripttion:
 * @version:
 * @Author: wanglong
 * @Date: 2021-01-22 16:43:27
 * @LastEditors: wanglong
 * @LastEditTime: 2021-04-01 11:43:00
 */
var express = require("express");
var Todo = require("../../models/Todo");
var router = express.Router();
var uuid = require('node-uuid');
var createId = require("../../models/createId");

/* post 注册. */
router.post("/", function(req, res, next) {
    //查，数据库代码   分页查询
    let body = req.body;
    console.log(body)
    // 这是增数据，顺序执行！！！！！
    let id = createId(15, 2);
    let token = uuid.v1();
    let createTime = new Date().getTime()

    var addSql =
        "INSERT INTO user(id,photo,token,username,password,createTime,updateTime) VALUES(?,?,?,?,?,?,?)";
    //这是想增加的数据
    let addData = [id, body.photo, token, body.username, body.password, createTime, ""];

    var getUser = "SELECT * FROM user WHERE username='" + body.username + "'";

    //查询是否存在这个用户
    Todo.query(getUser, function(err, result) {
        if (result.length) {
            //当前用户名已经存在
            let data = {
                code: 200,
                msg: "当前用户名已存在",
                data: null,
            };
            res.send(data);
        } else {
            //不存在当前注册用户名
            Todo.query(addSql, addData, function(err, result) {
                //询问访问数据库，也就是去嫩那个数据库
                if (err) {
                    //失败就报个错
                    console.log("[INSERT ERROR] - ", err.message);
                    return;
                }
                let data = {
                    code: 200,
                    msg: "注册成功",
                    data: {
                        id: id,
                        photo: body.photo,
                        token: token,
                        username: body.username,
                        createTime: createTime,
                        updateTime: null
                    }
                };
                res.send(data);
            });
        }
    });
});


module.exports = router;