var express = require('express');
var router = express.Router();
//导入 jwt
const jwt = require('jsonwebtoken');
//导入配置文件
const {secret} = require('../../config/config')
//导入 用户的模型
const UserModel = require('../../models/UserModel');
const md5 = require('md5');


//注册操作
router.post('/register', (req, res) => {
  //查看是否存在用户
  UserModel.findOne({phone: req.body.phone}, function(err, data){
    if(err) throw err;
    if(data){
      res.json({
        code:10001,
        msg:'注册失败,用户已存在'
      });
    }else{
      //注册

      // let fans = [
      //   {nickname: '你好张三',id:"123456789"},
      //   {nickname: '你好张44',id:"123456789"},
      //   {nickname: '你好张44',id:"123456789"},
      //   {nickname: '你好张44',id:"123456789"},
      //   {nickname: '你好张44',id:"123456789"},
      //   {nickname: '你好张44',id:"123456789"},
      //   {nickname: '你好张44',id:"123456789"},
      //   {nickname: '你好张44',id:"123456789"},
      // ]
      // let follow = [
      //   {nickname: '你好张三',id:"123456789"},
      //   {nickname: '你好张44',id:"123456789"},
      //   {nickname: '你好张44',id:"123456789"},
      //   {nickname: '你好张44',id:"123456789"},
      //   {nickname: '你好张44',id:"123456789"},
      //   {nickname: '你好张44',id:"123456789"},
      //   {nickname: '你好张44',id:"123456789"},
      //   {nickname: '你好张44',id:"123456789"},
      // ]
      UserModel.create({...req.body, password: md5(req.body.password)}, (err, data) => {
        if(err){
          res.status(500).send('注册失败, 请稍后再试~~');
          return
        }
        res.json({
          code:10000,
          msg:'注册成功'
        });
      })
    }
  });
  
});


module.exports = router;
