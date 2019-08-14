<template>
    <div>
        <div class="main-div">
            <router-view/>
        </div>
        <van-tabbar v-model="active" @change="TabbarSelect(active)">
            <van-tabbar-item icon="shop">
                首页
            </van-tabbar-item>
             <van-tabbar-item icon="records">
                列表
            </van-tabbar-item>
             <van-tabbar-item icon="cart">
                购物车
            </van-tabbar-item>
             <van-tabbar-item icon="contact">
                会员中心
            </van-tabbar-item>
        </van-tabbar>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                active: 0
            }
        },
        created(){
            
        },
        watch:{
            '$route.path' (n,o){
                console.log(n)
                let path = n
                switch(path){
                    case '/home':
                        this.active = 0;break;
                    case '/categorylist':
                        this.active = 1 ;break;
                    case '/carts':
                        this.active = 2 ;break;
                    case '/persion':
                        this.active = 3 ;break;

                }
            }
        },
        methods:{
            changeTabbarActive(active){
               
            },
            TabbarSelect(active) {
               
                switch(active){
                    case 0:
                        this.$router.push({name:'ShoppingMail'}) ;break;
                    case 1:
                        this.$router.push({name:'CateforyList'}) ;break;
                    case 2:
                        this.$router.push({name:'Carts'}) ;break;
                    case 3:
                        this.$router.push({name:'Persion'}) ;break;

                }
                this.active = active
            }
        }
    }
</script>

<style  scoped>

</style>