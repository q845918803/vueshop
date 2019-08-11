const Router = require('koa-router') 
const mongoose = require('mongoose')
let api = new Router()

//首页

api.get('/',async (ctx)=>{
    ctx.body = '用户首页'
})
api.post('/register',async (ctx)=>{
    if(ctx.request.body.username =='' || ctx.request.body.password =='') {
        ctx.body = {
            code: 500,
            message: '用户名或密码为空'
        }
    }
    const User = mongoose.model('User')
    let newUser = new User({
        userName: ctx.request.body.username,
        passWord: ctx.request.body.password
    })
    // newUser.userName = ctx.request.body.username
    // newUser.passWord = ctx.request.body.password
    await newUser.save().then(()=>{
        ctx.body = {
            code: 200,
            message: '注册成功！'
        }
    }).catch(err=>{
        ctx.body = {
            code: 500,
            message: err
        }
    })
})

module.exports = api