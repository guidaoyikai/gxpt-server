var express = require('express');
var router = express.Router();
//导入 jwt
const jwt = require('jsonwebtoken');
//导入配置文件
const {secret} = require('../../config/config')
//导入 用户的模型
const AdminModel = require('../../models/AdminModel');
const md5 = require('md5');

//登录操作
router.post('/login', (req, res) => {
  //获取用户名和密码
  let {phone, password} = req.body;

  //查询数据库
  AdminModel.findOne({phone: phone,password:md5(password)}, (err, data) => {
    
    //判断
    if(err){
      res.json({
        code: '20001',
        msg: '数据库读取失败~~~',
        data: null
      })
      return
    }
    //判断 data
    if(!data){
    
      return res.json({
        code: '20002',
        msg: '用户名或密码错误~~~',
        data: null
      })
    }
    
    //创建当前用户的 token
    let token = jwt.sign({
      phone: data.phone,
      _id: data._id
    }, secret, {
      expiresIn: 60 * 60 * 24 * 7
    });
    
    //响应 token
    res.json({
      code: '0000',
      msg: '登录成功',
      token: token,
      data:data,
    })

  })

});


module.exports = router;
