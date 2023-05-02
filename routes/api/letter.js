var express = require('express');
var router = express.Router();


//导入 用户的模型
const LetterModel = require('../../models/LetterModel')

const dateFormat = require('../../utils/dateFormat')

//需求页查询
router.get('/letter', (req, res) => {
  let page = req.query.page - 1 <=0 ? 0 :  req.query.page - 1
  let skipNumber =  page * 10

  LetterModel.find().skip(skipNumber).limit(10).exec(function(err,data){
    if(err) throw err;
    res.json({
        code:"10000",
        msg: "查询成功",
        data:data
    })
  });
});

router.post('/letter', (req, res) => {  
    LetterModel.create({...req.body,create_time:dateFormat(new Date())}, (err, data) => {
        if(err){
          res.status(500).send('发送失败');
          return
        }
        res.json({
          code:10000,
          msg:'发送成功'
        });
      })
});





module.exports = router;
