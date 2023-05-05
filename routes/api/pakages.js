var express = require('express');
var router = express.Router();


//导入 用户的模型
const PakagesModel = require('../../models/PakageModel')
const UserModel = require('../../models/UserModel')

//需求页查询
router.get('/pakages', (req, res) => {
    PakagesModel.find(function(err,data){
        if(err) throw err;
        res.json({
            code:10000,
            msg: "查询成功",
            data:data
        })
      });
});


router.post('/pakages', (req, res) => {
    console.log(req.body)
    UserModel.findOne({id:req.body.id},(err,userData)=>{
        if(err) throw err;
            UserModel.updateOne(
                { "id": req.body.id},
                {
                    package: userData.package + req.body.quantity,
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
