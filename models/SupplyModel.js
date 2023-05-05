//导入 mongoose
const mongoose = require('mongoose');
//创建文档的结构对象
//设置集合中文档的属性以及属性值的类型
let supplySchema = new mongoose.Schema({
  needId:String,
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
  rank:{
    type:Number,
    default:0,
  },
  publish_time:String,
  //是否通过审核0审核中,1通过，2不通过
  is_publish:{
    type:Number,
    enum:[0,1,2],
    default:0
  },
  //是否完成
  completed:{
    type:Number,
    enum:[0,1],
    default:0
  },
});

//创建模型对象  对文档操作的封装对象
let SupplyModel = mongoose.model('supplys', supplySchema);

//暴露模型对象
module.exports = SupplyModel;
