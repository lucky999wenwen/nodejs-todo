/*
 * @Descripttion:
 * @version:
 * @Author: wanglong
 * @Date: 2021-01-22 16:43:27
 * @LastEditors: wanglong
 * @LastEditTime: 2021-01-29 15:50:59
 */
var express = require("express");
var Todo = require("../models/Todo");
var router = express.Router();

/* GET home page. */
router.get("/", function(req, res, next) {
    let query = req.query;

    // const pageIndex = Number(query.pageIndex);
    // const pageSize = Number(query.pageSize);

    //查，数据库代码   分页查询
    // var sql = "SELECT * FROM todolist limit " + pageIndex + "," + pageSize + "";
    var sql = "SELECT * FROM todolist";
    //改
    Todo.query(sql, function(err, result) {
        if (err) {
            console.log("[UPDATE ERROR] - ", err.message);
            return;
        }

        let data = {
            code: 200,
            msg: "成功",
            data: result,
        };
        res.send(data);
    });
});

module.exports = router;