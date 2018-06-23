import Vue from 'vue'
import Router from 'vue-router'
import Wheelsky from '@/components/Wheelsky'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Wheelsky,
      name: 'home',
      meta: {
        title: 'Bienvenue sur Wheelsky',
      },
      mode: 'history'
    },
  ],
})
