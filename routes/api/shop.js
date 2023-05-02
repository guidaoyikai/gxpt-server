var express = require('express');
var router = express.Router();


//导入 用户的模型
const ShopModel = require('../../models/ShopModel')
const UserModel = require('../../models/UserModel')
const ExchageModel = require('../../models/ExchageModel')



//需求页查询
router.get('/shop', (req, res) => {
  let page = req.query.page - 1 <=0 ? 0 :  req.query.page - 1
  let skipNumber =  page * 8
  let searchContent = req.query.searchContent

  if(!searchContent){
    
    ShopModel.find().skip(skipNumber).limit(8).exec(function(err,data){
      if(err) throw err;

      ShopModel.find(function(err, count){
        if(err) throw err;
        res.json({
          code:10000,
          msg: "查询成功",
          data:data,
          total: count.length
        })    
      });
      
    });
  }else{
    ShopModel.find({title:{$regex:searchContent}}).skip(skipNumber).limit(8).exec(function(err,data){
      if(err) throw err;
      ShopModel.find({title:{$regex:searchContent}},function(err, count){
        if(err) throw err;
        res.json({
          code:10000,
          msg: "查询成功",
          data:data,
          total: count.length
        })    
      });
    });
  }
});


router.post('/shop', (req, res) => {
    console.log("兑换:" , req.body)

    ShopModel.findOne({id:req.body.shopId},(err,shopData)=>{
        if(err) throw err;
        if(shopData.quantity <= 0){
            res.json({
                code:10002,
                msg:"数量不足"
            })
            return;
        }
       
        UserModel.findOne({id:req.body.userId}, (err1,userData)=>{
            if(err1) throw err1;
            if(userData.integral - shopData.integral < 0){
                res.json({
                    code:10001,
                    msg:"积分不足"
                })
            }else{
                ShopModel.updateOne(
                    { "id": req.body.shopId},
                    {quantity: shopData.quantity-1},
                    (err, raw) =>{
                        if (err) return err;
                    }
                );

                
                UserModel.updateOne(
                    { "id": req.body.userId},
                    {integral: userData.integral - shopData.integral},
                    (err, raw) =>{
                        if (err) return err;
                    }
                );

                ExchageModel.create({...req.body}, (err2,data)=>{
                    if(err2) throw err2;
                    res.json({
                        code:10000,
                        msg:"兑换成功"
                    })
                })
            }
          })


    })

    
  
  })




module.exports = router;
