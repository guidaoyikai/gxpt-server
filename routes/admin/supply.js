var express = require('express');
var router = express.Router();


//导入 用户的模型
const SupplyModel = require('../../models/SupplyModel')

//需求页查询
router.get('/supply', (req, res) => {

  let page = req.query.page - 1 <=0 ? 0 :  req.query.page - 1
  let skipNumber =  page * 10

  SupplyModel.find({$and: [{is_publish: 2}, {completed: 0}]}).skip(skipNumber).limit(10).exec(function(err,data){
      if(err) throw err;
      SupplyModel.find({$and: [{is_publish: 2}, {completed: 0}]},function(err, count){
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



router.put('/supply/through/:needId', (req, res) => {
    SupplyModel.updateOne({needId:req.params.needId},{is_publish:0},(err,data)=>{

  })

});

router.put('/supply/noPass/:needId', (req, res) => {
    SupplyModel.updateOne({needId:req.params.needId},{is_publish:1},(err,data)=>{

  })

});


module.exports = router;
