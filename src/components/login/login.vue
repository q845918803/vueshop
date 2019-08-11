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
                    :loading="openLoading"
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
        methods:{
            goBack(){
                this.$router.go(-1)
            },
            loginAction(){

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