var express = require('express');
var router = express.Router();


//导入 用户的模型
const ShopModel = require('../../models/ShopModel')
var upload = require('../../middlewares/uploadMiddleware');
const { json } = require('express');
const dateFormat = require('../../utils/dateFormat')

//需求页查询
router.get('/shop', (req, res) => {

  let page = req.query.page - 1 <=0 ? 0 :  req.query.page - 1
  let skipNumber =  page * 10

  ShopModel.find().skip(skipNumber).limit(10).exec(function(err,data){
      if(err) throw err;
      ShopModel.find({},function(err, count){
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



router.delete('/shop/:id', (req, res) => {
    ShopModel.deleteOne({id:req.params.id},(err,data)=>{

  })

});



router.post('/shop/publish',upload.single("fileList"), (req, res) => {
    

    let data = JSON.parse(req.body.data)

    console.log(data)
    console.log(req.file)
    // console.log(req.files)


    ShopModel.create({
        ...data,
        image:'/uploads/'+ req.file.filename,
        publish_time:dateFormat(new Date()),
      },(err,data)=>{
        if(err) throw err;
        res.json({
            code:10000,
            msg:"发布成功",
            data:data
        })
      }
    ) 
});





module.exports = router;
