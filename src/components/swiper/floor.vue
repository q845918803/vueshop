<template >
         <div class="floor" >
            <div class="floor-info" v-for="(row, index) in floorData" :key="index">
                <div class="floor-title">{{row.floorName}}</div>
                <div class="floor-anomaly">
                       <div class="floor-left">
                    <img :src="row.item[0].image"  width="100%" alt="">
                </div>
                <div class="floor-right">
                    <div>
                        <img :src="row.item[1].image" width="100%" alt="">
                    </div>
                    <div>
                        <img :src="row.item[2].image" width="100%" alt="">
                    </div>
                </div>
                </div>
             
            </div>
        </div>
</template>

<script>
    export default {
        name: 'floor',
        props:{
            floorData:{
                type: Array,
                default: [],
            }
        },
        data(){
            return {

            }
        },
        created(){
            
        },
        mounted(){
           
        },
        
    }
</script>

<style scoped>
    .floor-info {
        border-radius: .5rem;
    }
    .floor-anomaly {
        display: flex;
        flex-direction: row;
        line-height: 0px;
        border-radius: 1.3rem;
    }
    .floor-anomaly div {
        width: 10rem;
        box-sizing: border-box;
        -webkit-box-sizing: border-box;
    }
     .floor-anomaly > div {
         flex: 1;
         border-right: 1px solid #eee;
     }
     .floor-anomaly .floor-right div{
        line-height: 0px;
        width: 100%;
     }
     .floor-anomaly .floor-right div{
         border-bottom:1px solid #eee;
     }
     .floor-title {
         background: #eee;
         height: 1.6rem;
         line-height: 1.6rem;
         font-size: 12px;
         text-align: center;
         font-weight: bold;
        
     }
</style>