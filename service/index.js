const Koa = require('koa');
const app = new Koa()
// initSchemas 初始化用户模型
const {connect , initSchemas} = require('./database/serverContent.js')
const mongoose = require('mongoose')
//链接数据库
const Router = require('koa-router')

let user = require('./api/user.js')
let home = require('./api/home.js')
let router = new Router()

router.use('/user',user.routes())
router.use('/home',home.routes())

// 加载路由中间件
app.use(router.routes());
//加载所有的方法
app.use(router.allowedMethods)
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
