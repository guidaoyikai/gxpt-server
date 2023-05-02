var express = require('express');
var router = express.Router();


//导入 用户的模型
const UserModel = require('../../models/UserModel')

//需求页查询
router.get('/userHomePage', (req, res) => {
    UserModel.findOne({id:req.query.id}, (err, data) => {
        //判断
        if(err){
          res.json({
            code: '20001',
            msg: '数据库读取失败~~~',
            data: null
          })
          return
        }
        //响应 token
        // console.log(data)
        let wechat = data.wechat.isPublic === 0? '' : data.wechat.src
        let wechatPayment = data.wechatPayment.isPublic === 0? '' : data.wechatPayment.src
        let alipay = data.alipay.isPublic === 0? '' : data.alipay.src
        let alipayPayment = data.alipayPayment.isPublic === 0? '' : data.alipayPayment.src
        res.json({
          code: '10000',
          msg:"查询成功",
          data:{
            id:data.id,
            avatar: data.avatar,
            nickname:data.nickname,
            wechat:wechat,
            wechatPayment:wechatPayment,
            alipay:alipay,
            alipayPayment:alipayPayment,
            fans: data.fans.length
          },
        })
    
      })

  
});


module.exports = router;
