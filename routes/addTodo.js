var express = require("express");
var Todo = require("../models/Todo");
var router = express.Router();

/* GET home page. */
router.post("/", function(req, res, next) {
    console.log(req.body);
    let body = req.body;
    // 需要学数据库的代码
    // 这是增数据，顺序执行！！！！！
    let id = new Date().getTime();
    var addSql =
        "INSERT INTO todolist(id,finished,content,createTime,updateTime) VALUES(?,?,?,?,?)";
    //这是想增加的数据
    let addData = [id, false, body.content, new Date().getTime(), ""];

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

    // res.render('index', { title: 'Express' });
});

module.exports = router;