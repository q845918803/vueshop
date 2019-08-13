// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import {Tabs,Tab,Loading,Button, Row, Col, Swipe, SwipeItem, Lazyload, List, Field, NavBar} from 'vant'
/* eslint-disable no-new */

Vue
    .use(Button)
    .use(Row)
    .use(Col)
    .use(SwipeItem).use(Swipe)
    .use(Lazyload)
    .use(List)
    .use(Field)
    .use(NavBar)
    .use(Loading)
    .use(Tabs).use(Tab)
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
