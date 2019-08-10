<template>
    <div class="goods-info">
        <img v-lazy="item.image" alt="" >
        <div>{{item.name | fixTitle}}</div>
        <div>￥{{item.price | moneyFormat}}</div>
    </div>
</template>

<script>
import {moneyFormat,fixTitle} from '../../assets/js/filter'
    export default {
        props:{
            item:{
                type:Object,
                default:{}
            }
        },
        filters: {
            moneyFormat(money){
                return moneyFormat(money)
            },
            fixTitle(title){
                return fixTitle(title)
            }
        }
    }
</script>

<style scoped>
    .goods-info {
        background: #fff;
        height: 13rem;
    }
    .goods-info img {
        width: 95%;
        margin: 0px auto
    }
    .goods-info div {
        height: 1rem;
        line-height: 1rem;
        font-size: 13px;
        text-align: center;
    }
</style>