import { createRouter,createWebHistory } from "vue-router";

import login from '../views/Login/login.vue'
const routes=[{
  path:'/',
  name: 'login',
  component: () => import('@/views/Login/login.vue'),

}, {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('@/Main/')

  }
]
const router=createRouter({
  history:createWebHistory(),
  routes,
  base: process.env.VUE_APP_BASE_URL,
})

export default router
