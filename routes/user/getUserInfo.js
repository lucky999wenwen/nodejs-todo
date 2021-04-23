/*
 * @Descripttion: 
 * @version: 
 * @Author: wanglong
 * @Date: 2021-04-02 10:45:01
 * @LastEditors: wanglong
 * @LastEditTime: 2021-04-02 11:20:19
 * @* : 博虹出品，抄袭必究😄
 */
var express = require("express");
var Todo = require("../../models/Todo");
var router = express.Router();
var uuid = require('node-uuid');
router.get("/", function(req, res, next) {
    let token = req.headers.token
    //查，数据库代码   分页查询
    var getUser = "SELECT id,photo,username,createTime FROM user WHERE  token='" + token +"'";

    //改
    Todo.query(getUser, function(err, result) {
        if (err) {
            throw err
        }
        let data = {
            code: 200,
            msg: "成功",
            data: null,
        };

        if (result.length) {
            // 用户存在
            data.data = result[0]
            res.send(data);
        } else {
            data.msg = 'token错误'
            // data.code = 
            res.send(data);
        }
    });
});

module.exports = router;