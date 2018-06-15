import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import goods from './components/goods/goods'
import ratings from './components/ratings/ratings'
import sellers from './components/sellers/sellers'

import './common/stylus/index.styl'

Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(VueResource)

let router = new VueRouter({
  linkActiveClass:'active',
  routes:[
    {path:"/goods",component:goods},
    {path:"/ratings",component:ratings},
    {path:"/sellers",component:sellers}
    ],
  mode:"history"
})

/* eslint-disable no-new */
new Vue({
  router,
  el: '#app',
  // components:{App},
  // template:'<App/>',
  render: h => h(App)
})
