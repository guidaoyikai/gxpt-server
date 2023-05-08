var express = require('express');
var router = express.Router();


//导入 用户的模型
const ExchageModel = require('../../models/ExchageModel')

//需求页查询
router.get('/exchange', (req, res) => {

  let page = req.query.page - 1 <=0 ? 0 :  req.query.page - 1
  let skipNumber =  page * 10

  ExchageModel.find({state:0}).skip(skipNumber).limit(10).exec(function(err,data){
      if(err) throw err;
      ExchageModel.find({state:0},function(err, count){
        if(err) throw err;
        res.json({
          code:10000,
          msg: "查询成功",
          data:data,
          total: count.length
        })    
      });
    });
});



router.put('/exchange/through/:id', (req, res) => {
    ExchageModel.updateOne({_id:req.params.id},{state:1},(err,data)=>{

  })

});

router.put('/exchange/noPass/:id', (req, res) => {
    ExchageModel.updateOne({_id:req.params.id},{state:2},(err,data)=>{

  })

});

router.put('/exchange/sendMsg', (req, res) => {

    ExchageModel.updateOne({_id:req.body.id},{msg:req.body.msg},(err,data)=>{

  })

});



module.exports = router;
