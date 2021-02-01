var express = require("express");
var Todo = require("../models/Todo");
var router = express.Router();

/* delete home page. */
router.delete("/:id", function(req, res, next) {
    console.log(req.params);
    let params = req.params;
    //     // 这是删除数据。
    var delSql = "DELETE FROM todolist where id=" + params.id + ""; //数据库代码，websites表中删除id为6的那一行。
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