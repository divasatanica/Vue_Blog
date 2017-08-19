import Vue from 'vue'
import Router from 'vue-router'

/* components */

import blogHeader from '@/components/header'
import navBar from '@/components/nav-bar'
import passageDisplay from '@/components/passage-display'
import indexPassage from '@/components/index-passage-container'
import login from '@/components/login-message'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'login',
      components: {
        default: indexPassage,
        login: login
      }
    },
    {
      path: '/',
      name: 'passages',
      component: indexPassage
    }
  ]
})
