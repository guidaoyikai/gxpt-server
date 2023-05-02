var express = require('express');
var router = express.Router();


const CommentModel = require('../../models/CommentModel')

const dateFormat = require('../../utils/dateFormat')

//需求页查询
router.get('/comment', (req, res) => {
  CommentModel.find({id:req.query.id}, function(err,data){
    if(err) throw err;
    res.json({
        code:"10000",
        msg: "查询成功",
        data:data
    })
  } );
});

router.post('/comment', (req, res) => {  
    // console.log(req.body)
    CommentModel.findOne({id:req.body.id}, (err,data)=>{
        if(err) throw err;
        // console.log(data)
        if(!data){
            CommentModel.create({id:req.body.id, commentList:[{...req.body.comment,publish_time:dateFormat(new Date())}]}, (err, data) => {
                if(err){
                  res.status(500).send('发表失败');
                  return
                }
                res.json({
                  code:10000,
                  msg:'发表成功'
                });
            })
        }else{
            CommentModel.updateOne(
                { "id": req.body.id},
                { "$push": { "commentList": {...req.body.comment,publish_time:dateFormat(new Date())} } },
                (err, raw) =>{
                    if (err) return err;
                    res.json({
                        code:10000,
                        msg:'发表成功'
                      });
                }
            );
        }
    })

});





module.exports = router;
