//导入 mongoose
const mongoose = require('mongoose');
//创建文档的结构对象
//设置集合中文档的属性以及属性值的类型
let ExchageSchema = new mongoose.Schema({
    //兑换商品id
  shopId:String,
    //用户id
  userId:String,
    //积分
  integral: Number,

  title: String,
  image:String,
  textarea: String,
  name:String,
  region:String,
  phone:String,
  worth:{
    type:Number,
    default:0
  },

  publish_time:String,
});

//创建模型对象  对文档操作的封装对象
let ExchageModel = mongoose.model('exchages', ExchageSchema);

//暴露模型对象
module.exports = ExchageModel;
