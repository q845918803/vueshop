<template>
    <div class="register">
        <van-nav-bar 
            class="register-title"
            title="用户注册"
            left-text="返回"
            left-arrow
            @click-left="goBack"
        />
        <div class="register-content">
            <van-field
                label="用户名"
                v-model="username"
                icon="clear"
                placeholder="请输入用户名"
                required
                @click-icon="username = ''"
                :error-message="usernameErrorMsg"
            />
            <van-field
                label="用户名"
                v-model="password"
                type="password"
                icon="clear"
                placeholder="请输入密码"
                required
                @click-icon="password = ''"
                :error-message="passwordErrorMsg"
              
            />
            <div class="register-button">
                <van-button
                    type="primary"
                    size="large"
                    @click="registerAction"
                    :loading="openLoading"
                    
                >
                    马上注册
                </van-button>
            </div>
        </div>

    </div>
</template>

<script>
    import axios from 'axios'
    import {URL} from '../../serviceAPI.config.js'
    import {Toast} from 'vant'
    export default {
        name:'Register',
        data(){
            return{
                username:'',
                password:'',
                //按钮阈值控制
                openLoading: false,
                usernameErrorMsg: '',
                passwordErrorMsg: '',
                
            }
        },
        computed:{
            checkForm(){
                let isOk = true
                if(this.username.length<3){
                    this.usernameErrorMsg = '用户名长度必须大于3位'
                    isOk = false
                }else{
                    this.usernameErrorMsg = ''
                }
                if(this.password.length<6){
                    console.log('jcjidsa')
                    this.passwordErrorMsg = '密码长度必须大于6位'
                    isOk = false
                }else{
                    this.passwordErrorMsg = ''
                }
                return isOk
            }
        },
        methods: {
            goBack(){
                this.$router.push({
                    path:'/home'
                })
            },
            registerAction(){
                this.checkForm && this.register()
            },
            register(){
               this.openLoading = true;
                axios({
                    url:URL.registerUser,
                    method: 'post',
                    data: {
                        username: this.username,
                        password: this.password
                    }
                }).then(res=>{
                    if(res.data.code == 200) {
                        Toast.success(res.data.message)
                        this.$router.push({
                            path:'/login'
                        })
                        this.openLoading = false
                    }else if(res.data.code == 500) {
                        if(res.data.message.code == 11000){
                            Toast.fail('用户名已被注册');
                            this.openLoading = false
                        }
                    }
                }).catch(err=>{
                        console.log(err)
                        Toast.fail('注册失败')
                        this.openLoading = false
                })
            }
        }
    }
</script>

<style  scoped>
    .register-content {
        width: 96%;
        margin: 1rem auto;
        border-radius: .6rem;
    }
    .register-button {
        margin: 1rem auto;

    }
</style>