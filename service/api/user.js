const Router = require('koa-router') 
const mongoose = require('mongoose')
let api = new Router()

//首页

api.get('/',async (ctx)=>{
    ctx.body = '用户首页'
})
api.post('/register',async (ctx)=>{
    const User = mongoose.model('User')
    let newUser = new User(newUser)
    await newUser.save().then(()=>{
        ctx.body = {
            code: 200,
            message: '注册成功！'
        }
    })
})

module.exports = api