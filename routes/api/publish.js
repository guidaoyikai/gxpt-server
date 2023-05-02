var express = require('express')
var router = express.Router()


//导入 jwt
const jwt = require('jsonwebtoken')
//导入配置文件
const {secret} = require('../../config/config')
//导入 用户的模型
const NeedModel = require('../../models/NeedModel')
const SupplyModel = require('../../models/SupplyModel')
const md5 = require('md5')


var upload = require('../../middlewares/uploadMiddleware')

// var upload = multer({ dest:'public/uploads/'})
const dateFormat = require('../../utils/dateFormat')


//发布
router.post('/publish', upload.array("fileList",3), (req, res) => {
    // console.log(req.files)
    // console.log(JSON.parse(req.body.data))
    //获取图片数组
    let images = []
    for(const a in req.files){
        images[a] = '/uploads/'+ req.files[a].filename
    }
    let data = JSON.parse(req.body.data)
    let PublishModel =  data.publishType === 'need'? NeedModel:  SupplyModel


    
    PublishModel.find(
      {$and:[{ id:data.id }, {completed:0}]},
      (err, result) => {
        if(err) throw err;
        // console.log("结果:" + result.length)
        if(result.length < 8){
          PublishModel.create({
            ...data,
            images:images,
            publish_time:dateFormat(new Date()),
            type:[data.type]
          }, 
            (err, data) => {
            if(err){
              res.status(500).send('发布失败');
              return
            }
            res.json({
              code:10000,
              msg:'插入成功'
            });
    
          })
        }else{
          res.json({
            code:10001,
            msg:'发布失败，发布数量超出限制'
          });
        }
    })



    
});
module.exports = router;
