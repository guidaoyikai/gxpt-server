var express = require('express');
var router = express.Router();


//导入 用户的模型
const ExchageModel = require('../../models/ExchageModel')


//需求页查询
router.get('/exchange', (req, res) => {
  let page = req.query.page - 1 <=0 ? 0 :  req.query.page - 1
  let skipNumber =  page * 8
  console.log(req.query)
  ExchageModel.find({receiverId:req.query.id},(err1,count)=>{
    ExchageModel.find({receiverId:req.query.id}).skip(skipNumber).limit(8).exec(function(err,data){
    if(err) throw err;
    res.json({
        code:10000,
        msg: "查询成功",
        data:data,
        total: count.length
    })
    });
 })
});


module.exports = router;
