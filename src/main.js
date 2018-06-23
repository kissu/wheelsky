// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import _ from 'vue-lodash'
// import Vue2TouchEvents from 'vue2-touch-events'

const options = { name: '_' }
Vue.use(_, options)
// Vue.use(Vue2TouchEvents)

Vue.config.productionTip = true

// Vue.use(Vue2TouchEvents, {
//   disableClick: true,
//   touchClass: '',
//   tapTolerance: 10,
//   swipeTolerance: 30,
//   longTapTimeInterval: 400
// })

/* eslint-disable */

var VueTouch = require('vue-touch')
Vue.use(VueTouch, { name: 'v-touch' })

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
})
