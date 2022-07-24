import { createRouter, createWebHistory } from "vue-router";

const routes = [{
  path: '/login',
  name: 'login',
  component: () => import('@/views/Login/login.vue'),

}, {
  path: '/dashboard',
  name: 'dashboard',
  component: () => import('@/Main/index.vue')

}
]
const router = createRouter({
  mode: 'hash',
  history: createWebHistory(),
  routes,
})

export default router
