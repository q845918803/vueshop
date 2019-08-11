// const Koa = require('koa')
// const app = new Koa()
const mongoose = require('mongoose')

const Router = require('koa-router')
let api = new Router()
const fs = require('fs')

api.get('/insertAllGoodsInfo',async (ctx)=>{
    fs.readFile('./database/newGoods.json','utf8',(err,data)=>{
    //    if(err) return
       data = JSON.parse(data)
       let saveCount = 0
       const Goods = mongoose.model('Goods')
       data.map((val,index)=>{
           let newGoods = new Goods(val)
           newGoods.save().then(res=>{
               saveCount ++
               console.log(`${new Date()}:第${saveCount}条数据 保存成功！`)
           }).catch(err=>{
               console.log(err)
           })
       })

    })
    ctx.body = '开始导入数据'
})

module.exports = api