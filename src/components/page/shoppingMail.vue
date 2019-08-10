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
                <span>{{ite.mallCategoryName}}</span>
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

            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import {swiper, swiperSlide} from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
// E:\workspaces\Vue\vueshangcheng\SmailShop\src\assets\image\location.png
export default {
      components:{
          swiper, swiperSlide
        },
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
        }
    },
    created () {
        this.name = 'Shopping mail';
        this._getIndex();
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
                    console.log(this.category)
                    this.adbanner = res.data.data.advertesPicture
                    this.bannerPicList = res.data.data.slides;
                 
                }
            }).catch(err=>{
                console.log(err)
            })
        }
    }
}
</script>
<style lang="" scoped>
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
</style>