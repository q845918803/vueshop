const BASEURL = ' https://www.easy-mock.com/mock/5d4d599718b37129b732d70e/example/';
const LOCALURL = 'http://localhost:3000'
export const URL = {
    getShoppinfMallInfo: BASEURL + 'index',
    getGoodsInfo: BASEURL + 'getGoodsInfo',
    registerUser: LOCALURL + '/user/register',
    login: LOCALURL + '/user/login',
    getDetails: LOCALURL + '/goods/getDetails',
    getCateforyList: LOCALURL + '/goods/getCateforyList',
    getCategorySubList: LOCALURL + '/goods/getCategorySubList'
}
