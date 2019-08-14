import Vue from 'vue'
import Router from 'vue-router'
import ShoppingMail from '@/components/page/shoppingMail'
import Register from '@/components/register/register'
import Login from '@/components/login/login'
import Goods from '@/components/Goods/goods'
import CategoryList from '@/components/CategoryList/categorylist'
import CategorySub from '@/components/CategoryList/categorysub'
import Persion from '@/components/Persion/persion'
import Carts from '@/components/Cart/cart'
import Main from '@/components/page/main'
Vue.use(Router)

export default new Router ({
  routes: [
    {
      path:'/main',
      name:'Main',
      component:Main,
      children:[
        {
          path: '/',
          redirect:'/home',
          name: 'ShoppingMail',
        },
        {
          path:'/home',
          name:'Home',
          component: ShoppingMail
        },
        {
          path:'/categorylist',
          name:'CateforyList',
          component:CategoryList,
          children:[
            {
              path:':id',
              component:CategorySub
            }
          ]
        },
        {
          path:'/carts',
          name:'Carts',
          component:Carts
        },
        {
          path:'/register',
          name:'Register',
          component: Register
        },
        {
          path:'/login',
          name:'Login',
          component: Login
        },
        {
          path:'/goods',
          name:'Goods',
          component:Goods
        },
        {
          path:'/persion',
          name:'Persion',
          component:Persion
        }
      ]
    },
   
   
  ]
})
