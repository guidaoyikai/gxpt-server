//导入 mongoose
const mongoose = require('mongoose');
//创建文档的结构对象
//设置集合中文档的属性以及属性值的类型
let LetterSchema = new mongoose.Schema({
  //信件id
  id:String,
  title:String,
  content:String,
  authorId:String,
  authorNickname:String,
  receiverId:String,
  receiverNickname:String,
  create_time:String,
  is_read:{
    type:Number,
    enum:[0,1],
    default:0
  },
});

//创建模型对象  对文档操作的封装对象
let LetterModel = mongoose.model('letters', LetterSchema);

//暴露模型对象
module.exports = LetterModel;
