/*
 * @Descripttion: 
 * @version: 
 * @Author: wanglong
 * @Date: 2021-01-22 14:21:03
 * @LastEditors: wanglong
 * @LastEditTime: 2021-03-10 12:00:08
 */
var express = require('express');
var Todo = require("../models/Todo");
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    let data = {
        code: 200,
        msg: "Hello World",
    };
    res.send(data);
});

module.exports = router;