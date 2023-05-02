//导入 mongoose
const mongoose = require('mongoose');
//创建文档的结构对象
//设置集合中文档的属性以及属性值的类型
let CommentSchema = new mongoose.Schema({
  id:String,
  commentList:[{
    nickname: {
      type:String,
      default:'请设置您的昵称'
    },
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
    avatar: {
      type:String,
      default:''
    },
    content: {
      type:String,
      default:''
    },
    publish_time:String
  }],

  

  // address:String,
  
  
});

//创建模型对象  对文档操作的封装对象
let CommentModel = mongoose.model('comments', CommentSchema);

//暴露模型对象
module.exports = CommentModel;
