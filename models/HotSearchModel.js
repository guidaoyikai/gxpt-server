//导入 mongoose
const mongoose = require('mongoose');
//创建文档的结构对象
//设置集合中文档的属性以及属性值的类型
let HotSearchSchema = new mongoose.Schema({
    //兑换商品id
  id:String,
    //用户id
  value:String,
    //积分
  total: Number,
});

//创建模型对象  对文档操作的封装对象
let HotSearchModel = mongoose.model('hotsearchs', HotSearchSchema);

//暴露模型对象
module.exports = HotSearchModel;
