/*
 * @Descripttion: 
 * @version: 
 * @Author: wanglong
 * @Date: 2021-01-27 10:17:08
 * @LastEditors: wanglong
 * @LastEditTime: 2021-02-02 11:12:40
 */
var express = require("express");
var Todo = require("../models/Todo");
var router = express.Router();

/* delete home page. */
router.delete("/:id", function(req, res, next) {
    let params = req.params;
    //     // 这是删除数据。
    var delSql = "DELETE FROM todolist where id=" + params.id + ""; //数据库代码，todolist表中删除id为6的那一行。
    Todo.query(delSql, function(err, result) {
        //询问访问数据库，也就是去嫩那个数据库
        if (err) {
            console.log("[DELETE ERROR] - ", err.message);
            return;
        }
        let data = {
            code: 200,
            msg: "删除成功",
        };
        res.send(data);
    });
});

module.exports = router;