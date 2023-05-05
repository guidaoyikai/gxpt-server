var express = require('express');
var router = express.Router();


//导入 用户的模型
const NeedModel = require('../../models/NeedModel')



//需求页查询
router.get('/myneed', (req, res) => {
  let page = req.query.page - 1 <=0 ? 0 :  req.query.page - 1
  let skipNumber =  page * 8
  console.log(req.query)
  NeedModel.find({$and: [{is_publish: req.query.is_publish}, {completed: req.query.completed}]},(err1,count)=>{
    NeedModel.find({$and: [{is_publish: req.query.is_publish}, {completed: req.query.completed}]}).skip(skipNumber).limit(8).exec(function(err,data){
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

//下架
router.put('/myneed/:id', (req, res) => {

    console.log(1111)
    NeedModel.updateOne(
        { needId: req.params.id},
        {completed: 1},
        (err, raw) =>{
            if (err) return err;
            res.json({
                code:10000,
                msg:"下架成功"
            })
        }
    );
  });




module.exports = router;
