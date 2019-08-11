<template>
    <div class="register">
        <van-nav-bar 
            class="register-title"
            title="用户登录"
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
                    @click="loginAction"
                    :loading="openLoading"
                >
                    登录
                </van-button>
            </div>
             <div class="register-button">
                <van-button
                    type="primary"
                    size="large"
                    @click="goRegister"
                >
                    注册
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
              
            }
        },
        created(){
            this.checkLocalStorage()
        },
        methods:{
            goBack(){
                this.$router.go(-1)
            },
            checkLocalStorage() {
                if(localStorage.userInfo){
                    Toast.success('请不要重复登录哦')
                    this.$router.push('/')
                }
            },
            loginAction(){
                this.openLoading = true
                axios({
                    url:URL.login,
                    method:'post',
                    data:{
                        username:this.username,
                        password:this.password,
                    }
                }).then(res=>{
                    //等待本地存储完成
                    console.log(res)
                    if(res.data.code == 200) {
                        new Promise((res,rej)=>{
                            localStorage.userInfo={
                                userName:this.username
                            }
                            setTimeout(()=>{
                                res()
                            },500)
                            }).then(res=>{
                            Toast.success('登录成功！')
                       
                            this.$router.push({
                                path:'/'
                            })
                        }).catch(err=>{
                            Toast.fail('登录状态保存失败')
                        })
                        
                    }else if(res.data.code == 500){
                        Toast.fail(res.data.message)
                    }else {
                        Toast.fail(res.data.message)
                    }
                    this.openLoading = false
                }).catch(err=>{
                    
                    Toast.fail('登录失败')
                    console.log(err)
                    this.openLoading = false
                })
            },
            goRegister(){
                this.$router.push({
                    path: '/register'
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