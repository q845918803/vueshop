import Vue from 'vue'
import Router from 'vue-router'
import ShoppingMail from '@/components/page/shoppingMail'
import Register from '@/components/register/register'
Vue.use(Router)

export default new Router({
  routes: [
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
      path:'/register',
      name:'Register',
      component: Register
    }
  ]
})
