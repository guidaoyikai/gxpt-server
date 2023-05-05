var express = require('express');
var router = express.Router();


//导入 用户的模型
const RankModel = require('../../models/RankModel')
const UserModel = require('../../models/UserModel')

//需求页查询
router.get('/rank', (req, res) => {
    RankModel.find(function(err,data){
        if(err) throw err;
        res.json({
            code:10000,
            msg: "查询成功",
            data:data
        })
      });
});

router.post('/rank', (req, res) => {
    console.log(req.body)
    UserModel.findOne({id:req.body.id},(err,userData)=>{
        if(err) throw err;
            UserModel.updateOne(
                { "id": req.body.id},
                {
                    rank: userData.rank + req.body.quantity,
                    integral:userData.integral + req.body.quantity
                },
                (err, raw) =>{
                    if (err) return err;
                    res.json({
                        code:10000,
                        msg:'购买成功'
                    })
                }
            );
    })

})



module.exports = router;
