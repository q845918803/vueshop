const mongoose = require('mongoose')
const db = 'mongodb://localhost/vueshop-db'

exports.connect = ()=>{
    //链接数据库
    mongoose.connect(db)
    //增加数据库的监听事件
    // 断开链接 /断开链接的回调函数
    mongoose.connection.on('disconnected',()=>{

        console.log(`数据库断开`)
        mongoose.connect(db)
    })
    mongoose.connection.on('error',()=>{
        console.log(`链接出错`)
        mongoose.connect(db)
    })
    mongoose.connection.once('open',()=>{
        console.log('链接成功')
    })
}