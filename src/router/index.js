import { createRouter, createWebHistory } from "vue-router";
import Layout from "@/Main/index.vue";
const routes = [{
  path: '/login',
  name: 'login',
  component: () => import('@/views/Login/login.vue'),

}, {
  path: '/dashboard',
  name: 'dashboard',
    component: Layout,
    children: [
      {
        path: "BrandDiscovery",
        component: () => import("@/views/BrandDiscovery/brandExplore.vue"),
        meta: { title: "Brand Discovery" },
      },
      {
        path: "BrandNewsHome",
        component: () => import("@/views/BrandNewsHome/BrandNewsHome.vue"),
        meta: { title: "BrandNewsHome" },
        // name: "BrandNewsHome",

      },
      // {
      //   path: "BrandNews",
      //   component: () => import("@/views/BrandNewsHome/BrandNews"),
      //   meta: { title: "BrandNews" },
      //   name: "BrandNews",
      // },
      {
        path: "OriginData",
        component: () => import("@/views/OriginalData/OriginalData.vue"),
        meta: { title: "Rawdata" },
      },
    ]
  }, {
    path: "/System",
    component: Layout,
    meta: { title: "System" },
    children: [
      {
        path: "brand",
        component: () =>
          import("@/views/System/brand/brand.vue"),
        meta: { title: "Brand" },
      },
      {
        path: "Industry",
        component: () =>
          import("@/views/System/Industry/Industry.vue"),
        meta: { title: "Industry" },
      },
      {
        path: "KeyConfig",
        component: () => import("@/views/System/Keyword/Keyword.vue"),
        meta: { title: "Keyword" },
      },
      {
        path: "Channel",
        component: () => import("@/views/System/channel/channel.vue"),
        meta: { title: "Channel " },
      },
      {
        path: "Platform",
        component: () => import("@/views/System/platform/platform.vue"),
        meta: { title: "Platform " },
      },
      {
        path: "Topictag",
        component: () => import("@/views/System/TopicTag/topic.vue"),
        meta: { title: "Topic Tag " },
      },
      {
        path: "Filter",
        component: () => import("@/views/System/Filter/Filter.vue"),
        meta: { title: "Filter Word" },
      },
    ],

}
]
const router = createRouter({
  mode: 'hash',
  history: createWebHistory(),
  routes,
})

export default router
