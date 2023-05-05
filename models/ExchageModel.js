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
  //标题
  title: String,
  //图片
  image:String,
  //内容
  textarea: String,
  //名字
  name:String,
  //地址
  region:String,
  //联系方式
  phone:String,
  //价值
  worth:{
    type:Number,
    default:0
  },
  //状态，0待审核，1审核通过，2审核失败
  state:{
    type:Number,
    enum:[0,1,2],
    default:0,
  },
  //审核信息
  msg:{
    type:String,
    default:''
  },
  publish_time:String,
});

//创建模型对象  对文档操作的封装对象
let ExchageModel = mongoose.model('exchages', ExchageSchema);

//暴露模型对象
module.exports = ExchageModel;
