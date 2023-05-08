//导入 mongoose
const mongoose = require('mongoose');
//创建文档的结构对象
//设置集合中文档的属性以及属性值的类型
let NeedSchema = new mongoose.Schema({
  needId:String,
  //用户ID
  id:String,
  //头像
  avatar: String,
  //昵称
  nickname: {
    type:String,
    default:'请设置您的昵称'
  },

  // address:String,
  address: {
    province:{
      type: String
    },
    city:{
      type: String
    },
    area:{
      type: String
    },
  },
  //标题
  title: String,
  //简介
  textarea: String,
  //支付宝收款码 1公开，0保密
  images:[],
  type:[],
  publish_time:String,
  rank:{
    type:Number,
    default:0,
  },
  //0审核通过，1审核失败，2审核中
  is_publish:{
    type:Number,
    enum:[0,1,2],
    default:2
  },
  //0已上架，1已下架
  completed:{
    type:Number,
    enum:[0,1],
    default:0
  }
});

//创建模型对象  对文档操作的封装对象
let NeedModel = mongoose.model('needs', NeedSchema);

//暴露模型对象
module.exports = NeedModel;
