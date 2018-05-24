import Vue from 'vue'
import Router from 'vue-router'
import Wheelsky from '@/components/wheelsky'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'yolo',
      component: Wheelsky,
    },
  ],
})
