/*
 * @Descripttion:
 * @version:
 * @Author: wanglong
 * @Date: 2021-01-29 16:10:56
 * @LastEditors: wanglong
 * @LastEditTime: 2021-04-08 17:17:25
 */
var express = require("express");
var Todo = require("../../models/Todo");
var router = express.Router();
var multer = require("multer");
var path = require('path');
let fs = require('fs');

// 单文件配置 multer
var filesUrlonly=[]
let upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, './uploads');
        },
        filename: function (req, file, cb) {
            let times = new Date().getTime()
            let fileName = times+'-'+file.originalname;
            filesUrlonly.push({fileName:file.originalname,code:times})
                cb(null, fileName);
        }
    })
});

/* 单文件上传公共接口. */
router.post("/file", upload.single('file'), function(req, res, next) {
    console.log(req,res,'xhasuxhs')
    var url = 'http://' + req.headers.host + '/' + filesUrlonly[0].code+'-'+  req.file.originalname;
    let data = {
        code: 200,
        msg: "上传成功",
        data: url
    };
    res.send(data);
});



//多文件配置
var filesUrl=[]
let uploads = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, './uploads');
        },
        filename: function (req, file, cb) {
            let times = new Date().getTime()
            var fileName = times+'-'+file.originalname;
            filesUrl.push({fileName:file.originalname,code:times})
            cb(null, fileName);
        }
    })
});
/* 多文件上传 */
router.post('/files', uploads.array('files'), (req, res) => {
    let fileList = [];
    req.files.map((elem) => {
        filesUrl.map(item=>{
            if(item.fileName===elem.originalname){
                let url = 'http://' + req.headers.host + '/' + item.code+'-'+ elem.originalname;
                fileList.push(url)
            }
        })
    });
    res.json({
        code: '200',
        type: 'sucess',
        data: fileList
    });
})

module.exports = router;