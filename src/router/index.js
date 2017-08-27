import Vue from 'vue'
import Router from 'vue-router'

/* components */

import blogHeader from '@/components/header'
import navBar from '@/components/nav-bar'
import passageDisplay from '@/components/passage-display'
import indexPassage from '@/components/index-passage-container'
import login from '@/components/login-message'
import display from '@/components/passage-display'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'login',
      components: {
        login: login
      }
    },
    {
      path: '/article',
      name: 'passages',
      component: indexPassage
    },
    {
      path: '/article/:id',
      name: 'display',
      component: display
    }
  ]
})
