const Router = require('koa-router') 
let api = new Router()
//首页
api.get('/',async (ctx)=>{
    ctx.body = '首页'
})
module.exports = api