var express = require('express');
var router = express.Router();

const HotSearchModel = require('../../models/HotSearchModel')
const HotSearchSupplyModel = require('../../models/HotSearchSupplyModel')
//需求页查询
router.get('/needhot', (req, res) => {

    HotSearchModel.find().sort({total:-1}).limit(10).exec((err,data)=>{
        
        res.json({
            code:10000,
            msg:"查询成功",
            data:data
        })
    
    })

  
});

router.get('/supplyhot', (req, res) => {
    HotSearchSupplyModel.find().sort({total:-1}).limit(10).exec((err,data)=>{
        
        res.json({
            code:10000,
            msg:"查询成功",
            data:data
        })
    
    })

})




module.exports = router;
