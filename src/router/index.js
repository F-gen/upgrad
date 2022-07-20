import { createRouter,createWebHistory } from "vue-router";

const routes=[{
  path: '/login',
  name: 'login',
  component: () => import('../views/Login/login.vue'),

}, {
    path: '/dashboard',
    name: 'dashboard',
  component: () => import('../Main/index.vue')

  }
]
const router=createRouter({
  history:createWebHistory(),
  routes,
  base: process.env.VUE_APP_BASE_URL,
})

export default router
