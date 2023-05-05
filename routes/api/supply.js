var express = require('express');
var router = express.Router();


//导入 用户的模型
const SupplyModel = require('../../models/SupplyModel')

//需求页查询
router.get('/supply', (req, res) => {
  let page = req.query.page - 1 <=0 ? 0 :  req.query.page - 1
  let skipNumber =  page * 8
  let searchContent = req.query.searchContent

  if(!searchContent){
    SupplyModel.find({$and: [{is_publish: 0}, {completed: 0}]}).skip(skipNumber).limit(8).exec(function(err,data){
      if(err) throw err;


      SupplyModel.find({$and: [{is_publish: 0}, {completed: 0}]},function(err, count){
        if(err) throw err;
        res.json({
          code:"10000",
          msg: "查询成功",
          data:data,
          total: count.length
        })    
      });



    });
  }else{
    SupplyModel.find({$and: [{is_publish: 0}, {completed: 0},{title:{$regex:searchContent}}]}).sort({rank:-1}).skip(skipNumber).limit(8).exec(function(err,data){
      if(err) throw err;

      SupplyModel.find({$and: [{is_publish: 0}, {completed: 0},{title:{$regex:searchContent}}]},function(err, count){
        if(err) throw err;
        res.json({
          code:"10000",
          msg: "查询成功",
          data:data,
          total: count.length
        })    
      });


    });
  }
  
});

router.get('/supply/user/:id', (req, res) => {
  console.log("需求:" , req.params)
  SupplyModel.find({id:req.params.id}, (err,data)=>{
    if(err) throw err;
    res.json({
        code:"10000",
        msg: "查询成功",
        data:data
    })
  })

})




module.exports = router;


