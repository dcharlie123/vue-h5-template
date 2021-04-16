import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import NvButton from './views/Button.vue'
import ClearCookie from './views/ClearCookie.vue'
import AppTest from './views/AppTest.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/nvButton',
      name: 'nvButton',
      component: NvButton
    },
    {
      path: '/clearCookie',
      name: 'clearCookie',
      component: ClearCookie
    },
    {
      path: '/appTest',
      name: 'appTest',
      component: AppTest
    }
  ]
})
