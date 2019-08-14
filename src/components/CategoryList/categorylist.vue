<template>
    <div>
        <div class="navbar-div">
            <van-nav-bar title="类别列表"></van-nav-bar>
        </div>
        <van-row class="content">
            <van-col span="6" class="info-left">
                <div class="leftNav">
                    <ul>
                        <li :class="{cateGortyActive: indexId == index}" @click="selectItem(item,index)" v-for="(item,index) in cateGoryList" :key="index">
                            {{item.MALL_CATEGORY_NAME}}
                        </li>
                    </ul>
                </div>
            </van-col>
            <van-col span="18" class="info-right">
                <div class="sublist" >
                    <van-tabs @click="selectSub" v-model="active" >
                        <van-tab v-for="(item,index) in sublist" :key="index" :title="item.MALL_SUB_NAME" >
                        </van-tab>
                    </van-tabs>
                </div>
                <div class="list-div">
                    <van-pull-refresh v-model="isRefresh" @refresh="swiperDownFresh">
                        <van-list @load="swiperUpLoading" v-model="loading" :finished="finished">
                            <div class="list-item" v-for="(item,index) in goodslist" @click="goGoodsInfo(item)" :key="index">
                                <div class="list-item-img">
                                    <img :src="item.IMAGE1" width="100%" alt="" :onerror="errImg">
                                </div>
                                <div class="list-item-text">
                                <div>
                                    {{item.NAME | fixTitle}}
                                </div>
                                <div>
                                    {{item.ORI_PRICE}}
                                </div>
                                </div>
                                
                            </div>
                        </van-list>
                    </van-pull-refresh>
                  
                </div>
            </van-col>
        </van-row>
    </div>
</template>

<script>
import {URL} from '../../serviceAPI.config'
import axios from 'axios'
import {Toast} from 'vant'
import {fixTitle} from '../../assets/js/filter'
    export default {
        data(){
            return {
                cateGoryList:[],//大类
                indexId: 0,
                sublist:[],//小类
                active: 0,
                loading: false,// 上拉动作节流
                finished: false,//是否完成
                postData:{
                    page: 1,
                    totalPage: 10,
                    id: ''
                },
                errImg: 'this.src="'+require('../../assets/image/errorimg.png')+'"',
                goodslist:[],
                isRefresh: false // 下拉刷新
            }
        },
        created(){
            this._getCateGoryList()
            this._getCateGorySub()
        },
        mounted(){
         this.initUI()
        },
        filters:{
            fixTitle(money){
                return fixTitle(money)
            }
        },
        methods: {
            goGoodsInfo(item){
                // console.log(item)
                this.$router.push({
                    name:'Goods',
                    params:{goodsitem:item}
                })
            },
            selectSub(index,title){
                    this.goodslist = []
                    this.postData.page = 1
                    this.postData.id = this.sublist[index].ID
                    this.finished = false
                    this._getGoodsForSubId()
                    
                },
             _getGoodsForSubId(){
                axios({
                    url:URL.getGoodsForCategoryId,
                    method:'post',
                    data: this.postData
                }).then(res=>{
                    if(res.data.code == 200 && res.data.data.length){
                        this.postData.page ++
                        this.goodslist = this.goodslist.concat(res.data.data)
                    }else {
                        this.finished = true
                    }
                    // console.log(res)
                }).catch(err=>{
                    console.log(err)
                })
            },
            swiperDownFresh(){
                setTimeout(()=>{
                    this.postData.page = 1
                    this.isRefresh = false
                    this.finished = false
                    this.goodslist = []
                    this.swiperUpLoading()
                    
                },500)
                
            },
            initUI(){
                   let winHeight = document.documentElement.clientHeight
                   let subHeight = document.getElementsByClassName('sublist')[0].clientHeight
                    let topHeight = document.getElementsByClassName('navbar-div')[0].clientHeight
                    // console.log(topHeight);
                    let leftHeight = document.getElementsByClassName('leftNav')[0]
                    let listHeight = document.getElementsByClassName('list-div')[0]
                    leftHeight.style.height = (winHeight - topHeight -50)+ 'px'
                    listHeight.style.height = (winHeight - topHeight - subHeight -50) + 'px'
            },
            swiperUpLoading(){
                setTimeout(()=>{
                    this.postData.id = this.postData.id ? this.postData.id:this.sublist[0].ID
                    this._getGoodsForSubId()
                },600)
            },
            _getCateGoryList(){
                axios({
                    url:URL.getCategoryList,
                    method: 'get'
                }).then(res=>{
                    if(res.data.code == 200 && res.data.message){
                        this.cateGoryList = res.data.message
                        // console.log(this.cateGoryList)
                        this._getCateGorySub(this.cateGoryList[0].ID)
                    }else {
                        Toast.fail('数据获取失败')
                    }
                }).catch(err=>{
                    Toast.fail('服务器异常')
                    console.log(err)
                })
            },
            selectItem(item,index){
                this.indexId = index;
                this.postData.page =1
                this.finished = false
                this.goodslist = []
                this._getCateGorySub(item.ID)
                this.active = 0;
            },
             _getCateGorySub(id){
            axios({
                url:URL.getCategorySubList,
                method:'post',
                data:{
                    ID:id
                }
            }).then(res=>{
                if(res.data.code = 200 && res.data.message){
                    // this.indexId = id
                    this.sublist = res.data.message
                    this.postData.id = this.sublist[0].ID
                    this.swiperUpLoading()
                }else {
                    Toast.fail('请求失败，服务器错误！')
                    // console.log(res)
                }
                // console.log(res)
            }).catch(err=>{
                console.log(err)
            })
        }
        },
       
    }
</script>

<style  scoped>
    .leftNav ul {
        display: flex;
        flex-direction: column;
        background: #fff;
        height: 100%;
    }
    .leftNav ul li {
        display: block;
        text-align:  center;
        font-size: .9rem;
        padding-top: .5rem;
        padding-bottom: .5rem;

    }
    .list-item-img{
        flex: 8;
    }
    .cateGortyActive {
        background: #eee;
    }
    .list-div {
        overflow: scroll;
    }
    .list-item {
        text-align: center;
        line-height: 1.5rem;
        border-bottom: 1px solid #f0f0f0;
        background: #fff;
        display: flex;
        flex-direction: row;
    }
    .list-item-text {
        flex: 16;
        margin-top: 10px;
        margin-bottom: 10px;
    }
</style>