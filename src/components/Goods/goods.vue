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
           this.goodsItem = this.$route.query.goodsItem
           console.log(this.goodsItem)
           this.getInfo(this.goodsItem.goodsId)
       },
       methods:{
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
                   console.log(res)
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
    .goods-detail-img {
        line-height: 0px;
    }
    .imgloading {
        position: absolute;
        transform: translate(200%,0%);
        left: 30%;
        top: 25%;
    }
</style>