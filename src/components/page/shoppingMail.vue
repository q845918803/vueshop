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
                    <img class="swiper-item" v-lazy="img.imageUrl" alt="" width="100%">
                </van-swipe-item>
            </van-swipe>
        </div>
    </div>
</template>
<script>
// E:\workspaces\Vue\vueshangcheng\SmailShop\src\assets\image\location.png
export default {
    data(){
        return {
            locationIcon: require('../../assets/image/location.png'),
            bannerPicList: [
                {imageUrl: require('../../assets/image/banner01.jpg')},
                {imageUrl: require('../../assets/image/banner02.jpg')},
                {imageUrl: require('../../assets/image/banner03.jpg')},
                {imageUrl: require('../../assets/image/banner04.jpg')},
                {imageUrl: require('../../assets/image/banner05.jpg')},
            ]
        }
    },
    created () {
        this.name = 'Shopping mail';
    },
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
    }
</style>