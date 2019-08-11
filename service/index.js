const Koa = require('koa');
const app = new Koa()
// initSchemas 初始化用户模型
const {connect , initSchemas} = require('./database/serverContent.js')
const mongoose = require('mongoose')
//链接数据库
const Router = require('koa-router')
//解决跨域问题
const Cors = require('koa2-cors')
//
const bodyParser = require('koa-bodyparser')
let user = require('./api/user.js')
let home = require('./api/home.js')
let router = new Router()

router.use('/user',user.routes())
router.use('/home',home.routes())
app.use(bodyParser())
//设置跨域参数
app.use(Cors({
    origin: function(ctx){
        if(ctx.url === '/home'){
            return "*"
        }else {
            return 'http://127.0.0.1:8080'
        }
    }
}))
// 加载路由中间件
app.use(router.routes());
//加载所有的方法
app.use(router.allowedMethods)
//加载处理前端数据的模块

//加载处理跨域的中间件

// ;(async ()=>{
//     await connect()
//     initSchemas()
//     const User = mongoose.model('User');
//     let oneUser = new User({userName:'1759496', passWord:'123456'})
//     oneUser.save().then(()=>{
//         console.log(`${new Date()}:数据插入成功`);
//     })
//     let user = await User.findOne({}).exec()
//     console.log('------')
//     console.log(user)
//     console.log('------')
// })()
app.listen(3000,()=>{
    console.log('server start in localhost:3000');
})
