const Router = require('koa-router') 
let api = new Router()

//首页

api.get('/',async (ctx)=>{
    ctx.body = '用户首页'
})
api.get('/register',async (ctx)=>{
    ctx.body = "用户注册"
})

module.exports = api