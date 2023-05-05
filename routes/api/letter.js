var express = require('express');
var router = express.Router();


//导入 用户的模型
const LetterModel = require('../../models/LetterModel')

const dateFormat = require('../../utils/dateFormat')

//需求页查询
router.get('/letter', (req, res) => {
  let page = req.query.page - 1 <=0 ? 0 :  req.query.page - 1
  let skipNumber =  page * 8
  console.log(req.query.page)
  if(req.query.receiverId){
    LetterModel.find({receiverId:req.query.receiverId},(err1,count)=>{
      LetterModel.find({receiverId:req.query.receiverId}).skip(skipNumber).limit(8).exec(function(err,data){
        if(err) throw err;
        res.json({
            code:10000,
            msg: "查询成功",
            data:data,
            total: count.length
        })
      });
    })
    
  }else{

    LetterModel.find({authorId:req.query.authorId},(err1,count)=>{
      LetterModel.find({authorId:req.query.authorId}).skip(skipNumber).limit(8).exec(function(err,data){
        if(err) throw err;
        res.json({
            code:10000,
            msg: "查询成功",
            data:data,
            total: count.length
        })
      });
    })

  }

});

router.post('/letter', (req, res) => {  
  console.log(req.body)
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


router.put('/letter/:id', (req, res) => {  
  LetterModel.updateOne({id:req.params.id},{is_read:1}, (err, data) => {
      if(err){
        res.status(500).send('标记失败');
        return
      }
      res.json({
        code:10000,
        msg:'标记成功'
      });
    })
});





module.exports = router;
