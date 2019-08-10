<template>
    <div class="hot-list">
        <div class="hot-list-title">热门推荐</div>
        <van-list>
            <van-row futter="20">
                <van-col span="12" v-for="(item, index) in hotGoods" :key="index">
                   <goods-info :item="item"></goods-info>
                </van-col>
            </van-row>
        </van-list>
    </div>
</template>

<script>
import GoodsInfo from '../../components/swiper/goods-info'
    export default {
        name:'HotList',
        props:{
            hotGoods:{
                type:Array,
                default:[]
            }
        },
        components:{
            GoodsInfo
        }
    }
</script>

<style scoped>
    .hot-list-title {
        height: 1.5rem;
        text-align: center;
        font-size: 12px;
        font-weight: bold;
        line-height: 1.5rem;
    }
</style>