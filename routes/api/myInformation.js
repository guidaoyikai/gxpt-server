var express = require('express')
const multer = require("multer")
var router = express.Router()

const UserModel = require('../../models/UserModel');

const md5 = require('md5')

const path = require('path')
var storage = multer.diskStorage({
    // 配置文件上传后存储的路径
    destination: function (req, file, cb) {
        // NodeJS的两个全局变量
        // console.log(__dirname);  //获取当前文件在服务器上的完整目录 
        cb(null, path.join(__dirname,'../../public/uploads'))
    },
    // 配置文件上传后存储的路径和文件名
    filename: function (req, file, cb) {
        let data = JSON.parse(req.body.data)
        
        let avatarUrl = !data.avatar? Date.now() + path.extname(file.originalname):data.avatar
        req.body.avatarUrl = avatarUrl
        cb(null, avatarUrl)
    }
})
var upload = multer({ storage: storage })
// var upload = multer({ dest:'public/uploads/'})
const dateFormat = require('../../utils/dateFormat')



router.put('/myInformation/basic', upload.single("fileList"), (req, res) => {
    // console.log(req.files)
    // console.log(JSON.parse(req.body.data))
    //获取图片数组


    let data = JSON.parse(req.body.data)
    let nickname = !data.nickname? '请设置您的昵称': data.nickname
    UserModel.updateOne({id:data.id},{nickname:nickname, avatar:'/uploads/'+req.body.avatarUrl},(err,result)=>{
        UserModel.findOne({id:data.id},(err2,data2)=>{
            res.json({
                code:10000,
                msg:"修改成功",
                data:{
                    avatar:data2.avatar,
                    nickname:data2.nickname
                }
            })
        })        
    })
});

router.put('/myInformation/resetpassword', (req, res) => {
    // console.log(req.files)
    // console.log(JSON.parse(req.body.data))
    //获取图片数组

    UserModel.findOne({id:req.body.id},(err2,data2)=>{

        if(md5(req.body.password) == data2.password){
            UserModel.updateOne({id:req.body.id},{password:md5(req.body.rpassword)},(err,data)=>{
                res.json({
                    code:10000,
                    msg:"修改成功"
                })
            })
        }else{
            res.json({
                code:10001,
                msg:"修改失败",
            })
        }
    })        

});



var storage2 = multer.diskStorage({
    // 配置文件上传后存储的路径
    destination: function (req, file, cb) {
        // NodeJS的两个全局变量
        // console.log(__dirname);  //获取当前文件在服务器上的完整目录 
        cb(null, path.join(__dirname,'../../public/uploads'))
    },
    // 配置文件上传后存储的路径和文件名
    filename: function (req, file, cb) {
        let data = JSON.parse(req.body.data)
        let imgUrl = !data.imgUrl? Date.now() + path.extname(file.originalname):data.imgUrl
        req.body.imgUrl = imgUrl + '.jpg'
        cb(null, imgUrl+ '.jpg')
    }
})
var upload2 = multer({ storage: storage2 })


router.put('/myInformation/editqrcode',upload2.single('fileList'), (req, res) => {
    // console.log(req.files)
    // console.log(JSON.parse(req.body.data))
    //获取图片数组

    let data = JSON.parse(req.body.data)
    
    UserModel.updateOne({id:data.id},{[data.type]:{src:'/uploads/'+req.body.imgUrl,isPublic:data.isPublic}},(err,result)=>{
        UserModel.findOne({id:data.id},(err2,data2)=>{
            res.json({
                code:10000,
                msg:"修改成功",
                data:{
                    [data.type]:data2[data.type],
                }
            })
        })        
    })      

});



module.exports = router;
