// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import {Button, Row, Col, Swipe, SwipeItem, Lazyload, List} from 'vant'
/* eslint-disable no-new */

Vue
    .use(Button)
    .use(Row)
    .use(Col)
    .use(SwipeItem).use(Swipe)
    .use(Lazyload)
    .use(List)
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
