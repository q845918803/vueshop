<template>
    <div>
        <swiper>
            <swiper-slide v-for="(item,index) in  slide" :key="index">
                slide{{item}}
            </swiper-slide>
        </swiper>
    </div>
</template>

<script>
    import 'swiper/dist/css/swiper.css'
    import { swiper, swiperSlide } from 'vue-awesome-swiper'
    export default {
        props: {

        },
        data(){
            return {
                slide: [1,2,3,4,5,6]
            }
        },
        components:{
            swiper, swiperSlide
        },
       
    }
</script>

<style scoped>

</style>