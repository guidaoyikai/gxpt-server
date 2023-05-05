//导入 mongoose
const mongoose = require('mongoose');
//创建文档的结构对象
//设置集合中文档的属性以及属性值的类型
let RankSchema = new mongoose.Schema({
  //信件id
  id:String,
  amount:String,
  quantity:{
    type:Number,
    default:0,
  },
  create_time:String,
});

//创建模型对象  对文档操作的封装对象
let RankModel = mongoose.model('ranks',RankSchema);

//暴露模型对象
module.exports = RankModel;
