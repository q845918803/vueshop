<template>
    <div class="goods-detail">
        <div class="goods-image">
            <img v-lazy="goods.IMAGE1" alt="" width="90%">
        </div>
        <div class="goods-name">
            {{}}
        </div>
        <div class="goods-price">
            {{}}
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import {URL} from '../../serviceAPI.config'
import {moneyFormat} from '../../assets/js/filter'
    export default {
       name:'Goods',
       props:{
           goods:{
               type:Object,
               default: {}
           }
       },
       data(){
           return {
               goodsId:'775e575ce28a4f89b1dfe2c99eb08ae7'
           }
       },
       filters:{
           moneyFormat(money){
              return  moneyFormat(money)
           }
       },
       created(){
           this.getInfo()
       },
       methods:{
           getInfo(){
               axios({
                   url:URL.getDetails,
                   method:'post',
                   data:{goodsId:this.goodsId}
               }).then(res=>{
                   console.log(res)
               }).catch(err=>{

               })
           }
       }
    }
</script>

<style  scoped>

</style>