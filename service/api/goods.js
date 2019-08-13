// const Koa = require('koa')
// const app = new Koa()
const mongoose = require('mongoose')

const Router = require('koa-router')
let api = new Router()
const fs = require('fs')

// api.get('/insertAllGoodsInfo',async (ctx)=>{
//     //读取文件是相对此方法调用的页面
//     fs.readFile('./database/newGoods.json','utf8',(err,data)=>{
//     //    if(err) return
//        data = JSON.parse(data)
//        let saveCount = 0
//        const Goods = mongoose.model('Goods')
//        data.map((val,index)=>{
//            let newGoods = new Goods(val)
//            newGoods.save().then(res=>{
//                saveCount ++
//                console.log(`${new Date()}:第${saveCount}条数据 保存成功！`)
//            }).catch(err=>{
//                console.log(err)
//            })
//        })
//     })
//     ctx.body = '开始导入数据'
// })
api.get('/inserAllCategory',async(ctx)=>{
    
    fs.readFile('./database/data_json/category.json','utf8',(err,data)=>{
        data=JSON.parse(data)
        let saveCount = 0;
        const Category = mongoose.model('Category')
        data.RECORDS.map((val,index)=>{
            let newCategory  = new Category(val)
            newCategory.save().then(res=>{
                saveCount ++ 
                console.log(`${new Date()}: 第${saveCount}条数据 保存成功！`)
            }).catch(err=>{
                console.log(`${new Date()}: 第${saveCount}条数据存储失败:错误信息${err}`)
                throw MediaStreamErrorEvents
            })
        })
    })
    ctx.body = '开始导入数据....'
})
//获取商品子类
api.get('/insertAllCategorySub',async (ctx)=>{
  
    fs.readFile('./database/data_json/category_sub.json','utf8',(err,data)=>{
        data = JSON.parse(data)
        let saveCount = 0;
        const CategorySub = mongoose.model('CategorySub')
        data.RECORDS.map((val,index)=>{
            let newCategory = new CategorySub(val)
            newCategory.save().then(res=>{
                saveCount ++
                console.log(`${new Date()}: 第${saveCount}条数据 保存成功！`);
            }).catch(err=>{
                console.log(`${new Date()}: 第${saveCount}条数据存储失败:错误信息${err}`)
                throw MediaStreamErrorEvents
            })
        })
        ctx.body = {
            code:"200",
            message:"存储成功"
        }
    })
})

//获取商品详情
api.post('/getDetails',async ctx=>{
    try{
        let goodId = ctx.request.body.goodsId
        // let code = 200;
        // let message = 'dss';
        const Goods = mongoose.model('Goods')
        let result = await Goods.findOne({ID:goodId}).exec()
        ctx.body = {
            code: 200,
            message: result
        }
        console.log(`${new Date()}:getDetails 接口调用`);
    }catch(err){
        ctx.body = {
            code:500,
            message:err   
        }   
    }
})
api.get('/getCategoryList',async ctx=>{
    try {
        let Category = mongoose.model('Category')
        let result = await Category.find().exec()
        ctx.body = {
            code: 200,
            message: result
        }
        console.log(`${new Date('yyyy-MM-dd HH-mm-ss')}:getCategoryList 接口调用`);
    }catch(err){
        ctx.body = {
            code: 500,
            message: err
        }
        console.log(err)
    }
})
api.post('/getCategorySubList',async ctx=>{
    try {
        
        let categoryId = ctx.request.body.ID
        let CategorySub = mongoose.model('CategorySub')
        let result = await CategorySub.find({
            MALL_CATEGORY_ID:categoryId
        }).exec()
        ctx.body = {
            code:200,
            message: result
        }
        console.log(`${new Date()}:getCategorySubList 接口调用`);
        
    }catch(err) {
        ctx.body = {
            code: 500,
            message: err
        }
    }
})
api.post('/getGoodsForCategoryId', async ctx=>{
    try {
        //分页逻辑
        console.log(ctx.request.body)
        let categoryId = ctx.request.body.id
        let page = ctx.request.body.page || 1
        let num = ctx.request.body.totalPage || 10
        let start = (page-1)*10
        let Goods = mongoose.model('Goods')
        let result = await Goods.find({
           SUB_ID:categoryId
        }).skip(start).limit(num).exec() //skip 跳过数，limit 每页显示的数量
        ctx.body = {
            code: 200,
            data: result,
            message: 'success'
        }
        console.log(`${new Date()}:getGoodsForCategoryId 接口调用${result}`);
    }catch(err){
        ctx.body = {
            code: 500,
            data: err,
            message: 'filed'
        }
        console.log(`${new Date()}:getGoodsForCategoryId 接口调用出错${err}`);
    }
})
module.exports = api