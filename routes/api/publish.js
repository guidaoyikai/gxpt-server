var express = require('express')
var router = express.Router()


//导入 用户的模型
const NeedModel = require('../../models/NeedModel')
const SupplyModel = require('../../models/SupplyModel')
const UserModel = require('../../models/UserModel');

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

    UserModel.findOne({id:data.id},(err1,userData)=>{

      if(err1) throw err1;
      if(userData.rank < data.rank || userData.package - 1 < 0){
        console.log(1111)
        res.json({
          code:10001,
          msg:"排名分不足,或者贴包不足"
        })
      }else{
         //小于8就发布
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
        //扣除用户排名分
        UserModel.findOne({id:data.id },(err2,userData2)=>{
          if(err2) throw err2;
              UserModel.updateOne(
                  { "id": data.id },
                  {
                      rank: userData2.rank - data.rank ,                  },
                  (err, raw) =>{
                      if (err) return err;
                  }
              );
        })
      }
    })


    
    
});
module.exports = router;
