const Koa = require('koa');
const app = new Koa()
const {connect} = require('./serverContent.js')
//链接数据库
;(async ()=>{
    await connect()
})()
app.use(async ctx=>{
    ctx.body = 'koa Start'
})
app.listen(3000,()=>{
    console.log('server start in localhost:3000');
})