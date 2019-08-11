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
                @click-icon="userame = ''"
            />
            <van-field
                label="用户名"
                v-model="password"
                type="password"
                icon="clear"
                placeholder="请输入密码"
                required
                @click-icon="password = ''"
            />
            <div class="register-button">
                <van-button
                    type="primary"
                    size="large"
                    @click="register"
                >
                    马上注册
                </van-button>
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        name:'Register',
        data(){
            return{
                username:'',
                password:'',
            }
        },
        // props:{
        //     userName:{
        //         type: String,
        //         default: null,
        //     },
        //     passWord:{
        //         type: String,
        //         default: null,
        //     },
        // },
        methods: {
            goBack(){
                this.$router.push({
                    path:'/home'
                })
            },
            register(){

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