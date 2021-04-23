/*
 * @Descripttion:
 * @version:
 * @Author: wanglong
 * @Date: 2021-01-22 16:43:27
 * @LastEditors: wanglong
 * @LastEditTime: 2021-03-26 16:45:18
 */
var express = require("express");
var Todo = require("../../models/Todo");
var router = express.Router();
var uuid = require('node-uuid');

/* GET home page. */
router.post("/", function(req, res, next) {
    let body = req.body;

    //查，数据库代码   分页查询
    // var sql = "SELECT * FROM todolist limit " + pageIndex + "," + pageSize + "";
    var sql = "SELECT * FROM user WHERE  password=" + body.password + "&& username='" + body.username + "'";
    var getUser = "SELECT * FROM user WHERE username='" + body.username + "'";

    //改
    Todo.query(getUser, function(err, result) {
        if (err) {
            console.log("[UPDATE ERROR] - ", err.message);
            return;
        }
        let data = {
            code: 200,
            msg: "登录成功",
            data: null,
        };
        if (result.length) {
            // 用户存在
            let user = result[0]
            if (user.password == body.password) {
                // 用户纯在且密码正确
                let token = uuid.v1();
                let updateTime = new Date().getTime()
                var changToken = "UPDATE user SET  token = ?,updateTime = ? WHERE id = ?"; //改
                var modSqlParams = [token, updateTime, user.id];
                Todo.query(changToken, modSqlParams, function(err, result) {
                    if (err) {
                        console.log("[UPDATE ERROR] - ", err.message);
                        return;
                    }
                    user.token = token
                    user.updateTime = updateTime
                    delete user.password
                    data.data = user
                    res.send(data);
                });
            } else {
                data.msg = '密码错误'
                res.send(data);
            }

        } else {
            data.msg = '用户不存在'
            res.send(data);
        }
    });
});

module.exports = router;