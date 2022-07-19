import { createRouter,createWebHistory } from "vue-router";
// import Home from '../views/Home/Home.vue';
import login from '../views/Login/login.vue'
const routes=[{
  path:'/',
  name: 'login',
  component: login
}]
const router=createRouter({
  history:createWebHistory(),
  routes
})

export default router
