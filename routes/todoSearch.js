/*
 * @Descripttion:
 * @version:
 * @Author: wanglong
 * @Date: 2021-01-22 16:43:27
 * @LastEditors: wanglong
 * @LastEditTime: 2021-04-02 17:27:29
 */
var express = require("express");
var Todo = require("../models/Todo");
var router = express.Router();

/* GET home page. */
router.get("/", function(req, res, next) {
    let query = req.query;
    let token = req.headers.token
    console.log(token)

    const pageIndex = Number(query.pageIndex)-1;
    const pageSize = Number(query.pageSize);

    //查，数据库代码   分页查询
    // var sql = "SELECT * FROM todolist limit " + pageIndex + "," + pageSize + "";
    // var sql = "SELECT * FROM todolist";
    var sql = "SELECT * FROM todolist WHERE userId IN(SELECT id FROM USER WHERE token = '" + token +
        "') "
        //改
    Todo.query(sql, function(err, result) {
        if (err) {
            throw err
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