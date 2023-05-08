//导入 mongoose
const mongoose = require('mongoose');
//创建文档的结构对象
//设置集合中文档的属性以及属性值的类型
let ShopSchema = new mongoose.Schema({
  id:String,
  //积分
  integral: {
    type:Number,
    default:0
  },
  //标题
  title: String,
  textarea: String,
  //图片
  image:String,
  worth:{
    type:Number,
    default:0
  },
  //数量
  quantity:{
    type:Number,
    default:0
  },
  publish_time:String,
});

//创建模型对象  对文档操作的封装对象
let ShopModel = mongoose.model('shops', ShopSchema);

//暴露模型对象
module.exports = ShopModel;
