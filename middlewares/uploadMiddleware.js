const multer = require("multer")
const path = require('path')
var storage = multer.diskStorage({
    // 配置文件上传后存储的路径
    destination: function (req, file, cb) {
        // NodeJS的两个全局变量
        // console.log(__dirname);  //获取当前文件在服务器上的完整目录 
        cb(null, path.join(__dirname,'../public/uploads'))
    },
    // 配置文件上传后存储的路径和文件名
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})
var upload = multer({ storage: storage })
module.exports = upload