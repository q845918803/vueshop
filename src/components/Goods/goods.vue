<template>
    <div class="goods-detail navbar-div">
        <van-nav-bar
            title="商品详情"
            left-text="返回"
            left-arrow
            @click-left="goback"

        />
       <div class="goods-detail-img">
           <!-- <van-loading v-if="isLoading" class="imgloading" type="spinner" color="#1989fa" />  -->
           <img ref="goodsImg" :src="goods.IMAGE1" width="100%" alt="">
       </div>
       <div class="goods-name">
           {{goods.NAME}}
       </div>
       <div class="goods-price">
           价格：￥{{goods.PRESENT_PRICE | moneyFormat}}
       </div>
       <div>
           <van-tabs swipeable sticky >
               <van-tab  title="商品详情">
                   <div class="detail" v-html="goods.DETAIL">
                   </div>
               </van-tab>
               <van-tab title="评价">
                   你在想peach
               </van-tab>
           </van-tabs>
       </div>
       <div class="goods-bottom">
           <div>
               <van-button @click="addGoodsToCart" size="large" type="primary">加入购物车</van-button>
           </div>
           <div>
               <van-button size="large" type="primary">直接购买</van-button>
           </div>
       </div>
    </div>
</template>

<script>
import axios from 'axios'
import {URL} from '../../serviceAPI.config'
import {moneyFormat,fixTitle} from '../../assets/js/filter'
 import {Toast} from 'vant'

    export default {
       name:'Goods',
       data(){
           return {
               goods:{},

           }
       },
       filters:{
           moneyFormat(money){
              return  moneyFormat(money)
           },
           fixTitle(title){
               return fixTitle(title)
           }
       },
     
       created(){
           this.goodsItem = this.$route.query.goodsItem ? this.$route.query.goodsItem.goodsId : this.$route.params.goodsitem.ID
        //    console.log(this.$route.params.goodsitem)
        //    console.log(this.goodsItem)
           this.getInfo(this.goodsItem)
       },
       methods:{
           addGoodsToCart(){
            //    localStorage.removeItem(cartInfo)

               let cartInfo = localStorage.cartInfo ? JSON.parse(localStorage.cartInfo) : []
               let isHaveGoods =  cartInfo.find(cart=>cart.goodsId == this.goodsItem)
               if(!isHaveGoods){
                   let newGoodsInfo = {
                       goodsId:this.goods.ID,
                       Name:this.goods.NAME,
                       price:this.goods.ORI_PRICE,
                       image:this.goods.IMAGE1,
                       count:1
                   }
                   cartInfo.push(newGoodsInfo)
                   localStorage.cartInfo = JSON.stringify(cartInfo)
                   Toast.success('添加成功')
               }else{
                   Toast.success('已有此商品')
               }
                this.$router.push({
                   name:"Carts"
               })
           },
           goCart(){
            //    this.$router.push({
            //        path:"/carts"
            //    })
           },
           getInfo(id){
               axios({
                   url:URL.getDetails,
                   method:'post',
                   data:{goodsId:id}
               }).then(res=>{
                   this.goods = res.data.message
                   if(res.data.code == 500) {
                       Toast.fail('数据获取失败，服务器错误')
                   }
                //    console.log(res)
               }).catch(err=>{
                  Toast.fail('数据获取失败，服务器错误')
               })
           },
           goback(){
               this.$router.go(-1)
           }
       }
    }
</script>
<style  scoped>
    .goods-detail-img ,.detail{
        line-height: 0px;
    }
    .imgloading {
        position: absolute;
        transform: translate(200%,0%);
        left: 30%;
        top: 25%;
    }
    .goods-name {
        background: #fff;
    }
    .goods-price{
        background: #fff;
    }
    .goods-name,.goods-price {
        text-align:  center
    }
    .goods-bottom {
        position: fixed;
        left: 0;
        bottom: 0;
        z-index: 1;
        width: 100%;
        display: flex;
        flex-wrap: nowrap;
    }
    .goods-bottom > div {
        flex: 1;
        padding: 5px;
        
    }
</style>