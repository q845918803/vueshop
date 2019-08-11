const MongoClient = require('mongoose').MongoClient
const mongoose = require('mongoose')
const db = 'mongodb://localhost:27017/vueshop-db'
//全局的规则定义
const glob = require('glob')
//resolve 相对路径转为绝对路径
const {resolve} = require('path')
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
exports.initSchemas = ()=>{
    //获取所有的schema对象 全局匹配
    console.log('获取schema')
    glob.sync(resolve(__dirname,'./schema','**/*.js')).forEach(require)
}
exports.connect = ()=>{
    mongoose.connect(db)
    let maxConnectTimes = 0
    return new Promise((res,rej)=>{
            //链接数据库
       
        //增加数据库的监听事件
        // 断开链接 /断开链接的回调函数
        mongoose.connection.on('disconnected',()=>{
                console.log('******数据库断开...******')
            if(maxConnectTimes<=4){
                maxConnectTimes ++
                mongoose.connect(db)
                console.log('正在尝试重连',new Date())
            }else {
                rej()
                console.log(`数据库连接超时，请检查网络设置...`,new Date())
            }
        })
        mongoose.connection.on('error',(err)=>{
            console.log(`链接出错`,new Date())
           if(maxConnectTimes<=4){
            mongoose.connect(db)
            console.log('正在尝试重连',new Date())
           }else {
               rej(err)
            console.log('数据库连接超时，请检查配置文件...',new Date())
           }
            
        })
        mongoose.connection.once('open',()=>{
            console.log('数据库连接成功!',new Date())
            res()
        })
    })
  
}