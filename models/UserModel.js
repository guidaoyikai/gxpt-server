//导入 mongoose
const mongoose = require('mongoose');
//创建文档的结构对象
//设置集合中文档的属性以及属性值的类型
let UserSchema = new mongoose.Schema({
  id:String,
  //电话(账号)
  phone: {
    type: String,
    required: true,
  },
  //密码
  password: {
    type: String,
    required: true,
  },
  //头像
  avatar: {
    type:String,
    default:''
  },
  //昵称
  nickname: {
    type:String,
    default:'请设置您的昵称'
  },
  //性别,0保密，1男，2女
  gender: {
    type: Number,
    enum:[0,1,2],
    default:0,
  },
  //真实性别 1男，2女
  realGender: {
    type: Number,
    enum:[1,2],
    default:1
  },
  //真实姓名
  realName: {
    type:String,
    default:''
  },
  //生日
  birthday: {
    type:String,
    default:''
  },
  //地址 1公开，0保密 
  address: {
    address:{
      type: String
    },
    isPublic:{
      type: Number,
      enum:[0,1],
      default:0
    }
  },
  //邮编
  postCode: {
    src:{
      type:String
    }
  },
  //微信 1公开，0保密 
  wechat: {
    src:{
      type:String,
      default:'',
    },
    isPublic:{
      type: Number,
      enum:[0,1],
      default:0
    }
  },
  //微信收款码 1公开，0保密 
  wechatPayment: {
    src:{
      type:String,
      default:'',
    },
    isPublic:{
      type: Number,
      enum:[0,1],
      default:0
    }
  },
   //支付宝 1公开，0保密
  alipay: {
    src:{
      type:String,
      default:'',
    },
    isPublic:{
      type: Number,
      enum:[0,1],
      default:0
    }
  },
  //支付宝收款码 1公开，0保密
  alipayPayment:{
    src:{
      type:String,
      default:'',
    },
    isPublic:{
      type: Number,
      enum:[0,1],
      default:0,
    }
  },
  //贴包
  package:{
    type:Number,
    default:0
  },
  //积分
  integral:{
    type:Number,
    default:0
  },
  //排名分
  rank:{
    type:Number,
    default:0
  },
  fans:[{
    id:String,
    nickname:String
  }],
  follow:[{
    id:String,
    nickname:String
  }]
});

//创建模型对象  对文档操作的封装对象
let UserModel = mongoose.model('users', UserSchema);

//暴露模型对象
module.exports = UserModel;
