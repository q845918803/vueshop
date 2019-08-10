<template>
    <div>
        <div class="search-bar">
            <van-row class="test-row">
                <van-col span='3'><img width="75%" class="locationIcon" :src="locationIcon" alt=""></van-col>
                <van-col span="16">
                    <input type="text" class="search-input">
                </van-col>
                <van-col span="5">
                    <van-button class="search-button" type="primary">搜索</van-button>
                </van-col>
            </van-row>
        </div>
        <!-- swiper area -->
        <div class="swiper-area">
            <van-swipe :autoplay="3000">
                <van-swipe-item v-for="(img, index) in bannerPicList" :key="index">
                    <img class="swiper-item" v-lazy="img.image" alt="" width="100%">
                </van-swipe-item>
            </van-swipe>
        </div>
        <!-- type-bar -->
        <div class="type-bar">
            <div v-for="(ite,index) in category" :key="index">
                <img v-lazy="ite.image" alt="" >
                <span>{{ite.mallCategoryName | fixTitle}}</span>
            </div>
        </div>
        <!-- adbanner -->
        <div class="adbanner">
            <img v-lazy="adbanner.PICTURE_ADDRESS" alt="">
        </div>
        <!-- recommend goods -->
        <div class="recommend-list">
            <div class="recommend-title">
               &nbsp;&nbsp; 商品推荐
            </div>
            <div class="recommend-body">
                <swiper :options="swiperOption">
                    <swiper-slide v-for="(item,index) in recommendGoods" :key="index">
                        <div  class="recommed-item">
                            <!-- 无法使用lazyload -->
                            <img :src="item.image" width="80%" alt="">
                            <div>{{item.goodsName |fixTitle }}</div>
                            <div>￥{{item.price |moneyFormat}}(￥{{item.mallPrice |moneyFormat}})</div>
                        </div>
                    </swiper-slide>
                </swiper>
            </div>
        </div>
        <!-- floor1 -->
        <floor-item v-if=" floor[0].item.length > 1" :floorData="floor"></floor-item>
        <hot-list v-if="hotGoods.length > 0" :hotGoods="hotGoods"></hot-list>
    </div>
</template>
<script>
import axios from 'axios'
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import FloorItem from '../../components/swiper/floor'
import HotList from '../../components/swiper/hot-list'
import {moneyFormat,fixTitle} from '../../assets/js/filter'
const swiperOption = {
    slidesPerView: 3
}
export default {
    data(){
      
        return {
            locationIcon: require('../../assets/image/location.png'),
            bannerPicList: [
                // {imageUrl: require('../../assets/image/banner01.jpg')},
                // {imageUrl: require('../../assets/image/banner02.jpg')},
                // {imageUrl: require('../../assets/image/banner03.jpg')},
                // {imageUrl: require('../../assets/image/banner04.jpg')},
                // {imageUrl: require('../../assets/image/banner05.jpg')},
            ],
            category:[],
            adbanner:[],
            recommendGoods:[],
            swiperOption:swiperOption,
            floor: [
                {
                    floorName:'',
                    item:[]
                },
                 {
                    floorName:'',
                    item:[]
                },
                {
                    floorName:'',
                    item:[]
                },
            ],
            hotGoods:[]
        }
    },
    created () {
        this.name = 'Shopping mail';
         this._getIndex();
    },
    mounted(){
       
    },
    methods:{
        _getIndex(){
            axios(
                {
                    url:' https://www.easy-mock.com/mock/5d4d599718b37129b732d70e/example/index',
                    method: 'get',
                }
            ).then(res=>{
                // console.log(res)
                if(res.status == 200) {
                    this.category = res.data.data.category
                    this.adbanner = res.data.data.advertesPicture
                    this.bannerPicList = res.data.data.slides
                    this.recommendGoods = res.data.data.recommend
                    this.floor[0].item = res.data.data.floor1
                    this.floor[1].item = res.data.data.floor2
                    this.floor[2].item = res.data.data.floor3
                    this.floor[0].floorName = res.data.data.floorName.floor1;
                    this.floor[1].floorName = res.data.data.floorName.floor2;
                    this.floor[2].floorName = res.data.data.floorName.floor3;
                    this.hotGoods= res.data.data.hotGoods
                }
            }).catch(err=>{
                console.log(err)
            })
        }
    },
    watch:{
    },
    components: {
        swiper,swiperSlide,FloorItem,HotList
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
<style lang="" scoped>
    /* *{
        box-sizing: b;
    } */
    .search-bar {
        height:2.2rem;
        background-color: #e501e5;
        overflow: hidden;
    }
    .search-input {
        width: 100%;
        height: 1.3rem;
        border: 0px;
        border-bottom: 1px solid #eee;
        background-color: #e501e5;
        color: #eee;
        margin-top: 0.3rem;
    }
    .locationIcon {
        padding-left: 0.3rem;
        padding-top: .1rem;
    }
    .search-button {
        height: 1rem;
        margin-top: .5rem;
        margin-left: .2rem;
        width: 3.5rem;
        line-height: 1rem;
        font-size: 0.5rem;
        text-align: center;
    }
    .swiper-area {
        clear: both;
        margin-top:0px;
        max-height: 13rem;
        overflow: hidden;
        height: 9.2rem;;
    }
    .type-bar {
        background: #fff;
        margin: .1rem .3rem .3rem .3rem;
        border-radius: .3rem;
        font-size: 14px;
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap
    }
    .type-bar div {
        padding: .3rem;
        font-size: .8rem;
        text-align:  center;
        width: 20%;
    
    }
    .type-bar div img {
        width: 80%;
        margin: 0px auto
    }
    .adbanner {
        width: 100%;
    }
    .adbanner img {
        width: 100%;
    }
    .recommend-title {
        background: #fff;
        width: 100%;
        border-bottom: 1px solid #eee;
        font-size: .5rem;
        height: 1rem;
        line-height: 1rem;
        color: #e501e5;
    }
    .recommend-body {
        background: #fff;
        border-bottom: 1px solid #eee;
        
    }
    .recommed-item {
        width: 100%;
        background: #fff;
        text-align: center;
        font-size: 10px;
        border-left: 1px solid #eee;
        height: 9rem;
    }
    
</style>