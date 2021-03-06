import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/home/'
import Login from './views/login'
import Main from './views/home/main'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home',
      component: Home
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/home',
      component: Home,
      children: [
        {
          path: '',
          component: Main
        },
        {
          path: 'commont',
          component: () => import('./views/home/comment.vue')
        },
        {
          path: 'material',
          component: () => import('./views/material/index.vue')
        },
        {
          path: 'articles',
          component: () => import('./views/contentList/index.vue')
        },
        {
          path: 'publish',
          component: () => import('./views/publish/index.vue')
        },
        {
          path: 'publish/:id',
          component: () => import('./views/publish/index.vue')
        },
        {
          path: 'account',
          component: () => import('./views/account/index.vue')
        }
      ]
    }
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    // }
  ]
})
