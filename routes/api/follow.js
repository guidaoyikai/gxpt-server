var express = require('express');
var router = express.Router();


//导入 用户的模型
const UserModel = require('../../models/UserModel');
const { param } = require('./publish');

//关注
router.put('/follow', (req, res) => {
  let selfId = req.query.selfId
  let selfNickname = req.query.selfNickname
  let followId = req.query.followId
  let followNickname = req.query.followNickname
  console.log(req.query)
  let follower = {
    'id':followId,
    'nickname':followNickname
  }

    UserModel.updateOne(
        { "id": selfId},
        { "$push": { "follow": follower } },
        (err, raw) =>{
            if (err) return err;
        }
    );
    
  let fans = {
    'id': selfId,
    'nickname': selfNickname
  }


    UserModel.updateOne(
        { "id": followId},
        { "$push": { "fans": fans } },
        (err, raw) =>{
            if (err) return err;
        }
    );

    res.json({
        code:"10000",
        msg:"成功"
    })


});

//取消关注
router.put('/unfollow', (req, res) => {
    let selfId = req.query.selfId
    let followId = req.query.followId
    // console.log(req.query)
      UserModel.updateOne(
          { "id": selfId},
          { "$pull": { "follow": { 'id':followId } } },
          (err, raw) =>{
              if (err) return err;
          }
      );
      
  
      UserModel.updateOne(
          { "id": followId},
          { "$pull": { "fans": { 'id':selfId } } },
          (err, raw) =>{
              if (err) return err;
          }
      );
  
      res.json({
        code:"10000",
        msg:"成功"
    })

});

module.exports = router;
