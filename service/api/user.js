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
api.post('/login',async(ctx)=>{
    let loginUser = ctx.request.body
    console.log(loginUser)
    let username = loginUser.username
    let password = loginUser.password
    // 进行数据库查找
    const User = mongoose.model('User')
    await User.findOne({userName:username}).exec().then(async (result)=>{
        console.log(result)
        //如果次用户名存在
        if(result){
            //创建user对象
            let newUser = new User()
            //比对密码
            await newUser.comparePassword(password,result.passWord)
            .then(isMatch=>{
                let code = 200
                let message = ''
                if(isMatch){
                    message = '登录成功！'
                }else {
                    code = 202
                    message = '密码错误'
                }
                ctx.body = {
                    code:code,
                    message:message
                }
            }).catch(err=>{
                ctx.body = {
                    code: 500,
                    message: '用户名或密码错误！',
                    error: err
                }
                console.log(err)
            })
            //如果用户名不存在
        }else {
            ctx.body = {
                code:201,
                message:'用户名不存在'
            }
        }
        //查找出错
    }).catch(err=>{
        console.log(err)
        ctx.body = {
            code:500,
            message: err
        }
    })

})
api.post('/findUser',async(ctx)=>{
    try{
        let username = ctx.request.body.userName
        const User = mongoose.model('User')
        let result = await User.findOne({userName:username}).exec()
        ctx.body = {
            code: 200,
            data: result,
            message: '获取成功！'
        }
    }catch(err){
        ctx.body = {
            code: 500,
            data:err,
            message:'服务器出错'
        }
    }
  
})
module.exports = api