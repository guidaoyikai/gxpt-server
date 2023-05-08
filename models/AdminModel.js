//导入 mongoose
const mongoose = require('mongoose');
//创建文档的结构对象
//设置集合中文档的属性以及属性值的类型
let AdminSchema = new mongoose.Schema({
  id:String,
  phone: {
    type: String,
    required: true,
  },
  //密码
  password: {
    type: String,
    required: true,
  },
  //昵称
  name: {
    type:String,
    default:''
  },
});

//创建模型对象  对文档操作的封装对象
let AdminModel = mongoose.model('admin', AdminSchema,'admin');

//暴露模型对象
module.exports = AdminModel;
