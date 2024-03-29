const mongoose = require('mongoose');
// 使用mongoose 包创建Schema对象
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt')
//创建User类的主键
let ObjectId = Schema.Types.ObjectId
//加盐强度
const SALT_WORK_FACTOR = 10;
//创建Username Schema

const userSchema = new Schema({
    //讲UserId 作为主键
    UserId: {
        type: ObjectId
    },
    // 用户名 
    userName: {
            unique: true,
            type: String
    },
    passWord: String,
    createAt: {
        type: Date,
        default: Date.now()
    },
    lastLoginAt: {
        type: Date,
        default: Date.now()
    },
    birth:{
        type: Date,
        default: Date.now()
    },
    avator:{
        type: String,
        default: null,
    }
}) 
userSchema.pre('save',function(next){
    bcrypt.genSalt(SALT_WORK_FACTOR,(err,salt)=>{
        if(err){
            return next(err)
        }
        bcrypt.hash(this.passWord,salt,(err,hash)=>{
            if(err) return next(err)
            this.passWord = hash
            next()
        })
    })
})
userSchema.methods = {
    comparePassword:(_password,password)=>{
        return new Promise((res,rej)=>{
            bcrypt.compare(_password,password,(err,isMatch)=>{
                if(!err){
                    res(isMatch) 
                } else {
                    rej(err)
                }
            })
        })
    }
}
//schema 发布模型

mongoose.model('User',userSchema)