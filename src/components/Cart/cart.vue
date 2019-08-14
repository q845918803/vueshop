<template>
    <div>
        <div>
            <van-nav-bar
                title="购物车"
                left-text="返回"
                left-arrow
                @click-left="goback"
                />
        </div>
        <div class="cart-title">
            <van-button size="small" type="danger" @click="clearCart">
                清空购物车
            </van-button>
        </div>
        <div class="cart-list">
            <div class="cart-row" v-for="(item,index) in cartInfo" :key="index">
                <div class="cart-img">
                    <img :src="item.image" width="100%" alt="">
                </div>
                <div class="cart-text">
                    <div class="cart-goods-name">{{item.Name | fixTitle}}</div>
                     <div class="cart-goods-ctrl">
                         <van-stepper v-model="item.count"></van-stepper>
                     </div>
                </div>
                <div class="cart-price">
                    <div>￥{{item.price | moneyFormat}}</div>
                    <div>x{{item.count}}</div>
                    <div class="allPrice">
                        ￥{{(item.price*item.count)|moneyFormat}}
                    </div>
                    
                    </div>
            </div>
        </div>
        <div class="totalMoney">
            商品总价：￥{{totalMoney|moneyFormat}}
        </div>
    </div>
</template>

<script>
    import { moneyFormat , fixTitle } from '../../assets/js/filter'
    export default {
        
        data(){
            return {
                name:'购物车',
                cartInfo:[],
                isEmpty: false,
                
            }
        },
        created(){
            this._getCarInfo()
        },
        computed:{
            totalMoney(){
                let allMoney = 0;
                this.cartInfo.forEach((item,index)=>{
                    allMoney += (item.price * item.count)
                })
                localStorage.cartInfo = JSON.stringify(this.cartInfo)
                return allMoney
            }
        },
        methods:{
            goback(){
                this.$router.go(-1)
            },
            _getCarInfo(){
                if(localStorage.cartInfo){
                    this.cartInfo = JSON.parse(localStorage.cartInfo)
                }
                //判断是否位空
                this.isEmpty = this.cartInfo.length>0 ? true:false
            },
            clearCart(){
                localStorage.removeItem('cartInfo')
                this.cartInfo = []
            }
        },
        filters:{
            moneyFormat:(money)=>{
               return moneyFormat(money)
            },
            fixTitle:(title)=>{
                 return fixTitle(title);
                
            }
        }

    }
</script>

<style  scoped>
    .cart-list {
        background: #fff;
        width: 100%
    }
    .cart-row {
        display: flex;
        flex-direction: row;

    }
    .cart-img {
        flex: 6;

    }
    .cart-text {
        flex: 14;
        display: flex;
        flex-direction: column;
    }
    .cart-goods-ctrl {
        padding-top: 10px;
        padding-left: 10px;
    }
    .cart-goods-name {
        text-align: left;
        font-size: .85rem;
        font-weight: bold;
        padding-left: 10px;
    }
    .cart-price {
        flex: 4;
        text-align: right;
        padding-right: 5px;
        font-size:.8rem
    }
    .allPrice {
        color:red;
        font-weight: bold;
    }
    .totalMoney {
        text-align: right;
        background: #fff;
        padding: 5px;
        border-bottom: 1px solid #eee;
    }
</style>