const mongoose = require('mongoose');
// 使用mongoose 包创建Schema对象
const Schema = mongoose.Schema;
//创建User类的主键
let ObjectId = Schema.Types.ObjectId

//创建Username Schema

const userSchema = new Schema({
    //讲UserId 作为主键
    UseerId: {
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
    }
})