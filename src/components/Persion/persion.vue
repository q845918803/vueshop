<template>
    <div class="persion">
        <div>
            
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import {Toast} from 'vant'
import {URL} from '../../serviceAPI.config'
    export default {
        data(){
            return {
                name:'perdsion',
                user:{}
            }
        },
        created(){
            this._checkUserInfo()
        },
        methods:{
            _checkUserInfo(){
                if(localStorage.userInfo){
                    let pdata =JSON.parse(localStorage.userInfo)
                    axios({
                        url:URL.findUser,
                        method: 'post',
                        data: pdata
                    }).then(res=>{
                        if(res.data.code==200 && res.data.data.length>=1){
                            this.user = res.data.data
                        }
                    }).catch(err=>{
                        Toast.fail('登录过期请重新登录')
                        console.log('登录过期')

                    })
                }else{

                }
                
            }
        }
    }
</script>

<style  scoped>

</style>