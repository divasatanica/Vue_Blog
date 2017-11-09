import Vue from 'vue'
import Router from 'vue-router'

/* components */

import blogHeader from '@/components/common/header/header'
import navBar from '@/components/common/nav-bar'
// import indexPassage from '@/components/index-passage-container'
// import login from '@/components/login-message'
// import display from '@/components/passage-display'
// import post from '@/components/post-container';

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'index',
      component: resolve => require(['../components/index/index.vue'], resolve)
    },
    {
      path: '/login',
      name: 'login',
      components: {
        login: resolve => require(['../components/common/login/login-message.vue'], resolve)
      },
    },
    {
      path: '/article/:page',
      name: 'passages',
      component: resolve => require(['../components/passage/list/index-passage-container.vue'], resolve)
    },
    {
      path: '/p/:id',
      name: 'display',
      component: resolve => require(['../components/passage/display/passage-display.vue'], resolve)
    },
    {
      path: '/post',
      name: 'post',
      component: resolve => require(['../components/passage/post/post-container.vue'], resolve),
      beforeEnter : (to, from, next) => {
        if(this.a.app.$_proxy && this.a.app.$_proxy(null, 'get')) {
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
