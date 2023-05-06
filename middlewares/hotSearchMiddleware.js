const HotSearchSupplyModel = require('../models/HotSearchSupplyModel')
const HotSearchModel = require('../models/HotSearchModel')
const { load, cut } = require('@node-rs/jieba')
load()


module.exports = (req, res, next) => {
    
    let searchContent = req.query.searchContent
    console.log(searchContent)
    if(searchContent){
      let participleList = cut(searchContent,false).filter(item => item.length > 1)
      for(let i in participleList){
        if(req.path == '/need'){
            HotSearchModel.findOne({value:participleList[i]},(err,data)=>{
                if(data){
                    HotSearchModel.updateOne({value:participleList[i]}, {total:data.total + 1},(err1,data1) => {
    
                    })
                }else{
                    HotSearchModel.create({value:participleList[i], total:1}, (err3, data3) => {
                      
                    })
                }
            })
        }else{
            HotSearchSupplyModel.findOne({value:participleList[i]},(err,data)=>{
                if(data){
                    HotSearchSupplyModel.updateOne({value:participleList[i]}, {total:data.total + 1},(err1,data1) => {
    
                    })
                }else{
                    HotSearchSupplyModel.create({value:participleList[i], total:1}, (err3, data3) => {
                      
                    })
                }
            })
        }
        
      }
        next();
    }else{
        next();
    }
    
  }