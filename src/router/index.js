import Vue from 'vue'
import Router from 'vue-router'

/* components */

import blogHeader from '@/components/header'
import navBar from '@/components/nav-bar'
// import indexPassage from '@/components/index-passage-container'
// import login from '@/components/login-message'
// import display from '@/components/passage-display'
// import post from '@/components/post-container';

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'login',
      components: {
        login: resolve => require(['../components/login-message.vue'], resolve)
      },
    },
    {
      path: '/article/:page',
      name: 'passages',
      component: resolve => require(['../components/index-passage-container.vue'], resolve)
    },
    {
      path: '/p/:id',
      name: 'display',
      component: resolve => require(['../components/passage-display.vue'], resolve)
    },
    {
      path: '/post',
      name: 'post',
      component: resolve => require(['../components/post-container.vue'], resolve),
      beforeEnter : (to, from, next) => {
        if(window.$_proxy && window.$_proxy(null, 'get')) {
          next();
        }else{
          next({
            path: '/login'
          })
        }
      }
    }
  ]
})
