import { createRouter, createWebHistory } from "vue-router";

const routes = [{
  path: '/login',
  name: 'login',
  component: () => import('@/views/Login/login.vue'),
  hidden: true,
},
  {
    path: "/",
    redirect: "/login",
    hidden: true,
  },
]
const router = createRouter({
  mode: 'hash',
  history: createWebHistory(),
  routes,
})

export default router
