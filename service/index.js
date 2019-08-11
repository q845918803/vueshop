const Koa = require('koa');
const app = new Koa()
// initSchemas 初始化用户模型
const {connect , initSchemas} = require('./database/serverContent.js')
const mongoose = require('mongoose')
//链接数据库
;(async ()=>{
    await connect()
    initSchemas()
    const User = mongoose.model('User');
    let oneUser = new User({userName:'78979', passWord:'123456'})
    oneUser.save().then(()=>{
        console.log(`${new Date()}:数据插入成功`);
    })
    let user = await User.findOne({}).exec()
    console.log('------')
    console.log(user)
    console.log('------')
})()
app.use(async ctx=>{
    ctx.body = 'koa Start'
})
app.listen(3000,()=>{
    console.log('server start in localhost:3000');
})
