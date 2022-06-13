import Vue from 'vue'
import VueRouter from 'vue-router'

import LoginView from '../views/LoginView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: LoginView
  },
  {
    path: '/layout',
    name: 'layout',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/LayoutView.vue'),
    children: [
      {
        path: 'home',
        name: 'home',
        component: () => import(/* webpackChunkName: "about" */ '../views/HomeView.vue')
      },
      {
        path: 'user',
        name: 'user',
        component: () => import(/* webpackChunkName: "about" */ '../views/UserView.vue')
      }
    ]
  },
  {
    path: '/search',
    name: 'search',
    component: () => import(/* webpackChunkName: "about" */ '../views/serch/SearchView.vue')
  },
  {
    path: '/personalinfo',
    name: 'personalinfo',
    component: () => import(/* webpackChunkName: "about" */'../views/userinfo/PersonalInfo.vue')
  },
  {
    // 收藏历史
    path: '/collections',
    name: 'collections',
    component: () => import(/* webpackChunkName: "about" */ '../views/userinfo/ColleCtions.vue')
  },
  {
    path: '/robot',
    name: 'robot',
    component: () => import(/* webpackChunkName: "about" */ '../views/robot/RobotView.vue')
  },
  {
    path: '/messasge',
    name: 'message',
    component: () => import(/* webpackChunkName: "about" */ '../views/userinfo/MessageView.vue')
  }, {
    path: '/textinfo',
    name: 'textinfo',
    component: () => import(/* webpackChunkName: "about" */ '../views/text/ArticleView.vue')
  },
  {
    path: '/dynamic',
    name: 'dynamic',
    component: () => import(/* webpackChunkName: "about" */ '../views/userinfo/UserDynamic.vue')
  },
  {
    path: '/fans',
    name: 'fans',
    component: () => import(/* webpackChunkName: "about" */ '../views/userinfo/FansView.vue')
  }

]

const router = new VueRouter({
  routes
})

export default router
