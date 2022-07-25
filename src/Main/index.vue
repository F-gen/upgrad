<template>
  <div class="flex relative h-screen flex-col">
    <!-- nav -->
    <div class="h-15 z-2 bg-stone-900 flex w-full justify-between fixed top-0 left-0">
      <!-- logo -->
      <div class="leading-14 ml-10">
        <img src="@/assets/MI.png" class="w-25 h-7 inline-block">
      </div>
      <!-- route -->
      <div>
        <ul class="flex leading-15">
          <li class="ml-20">
            <RouterLink to="/dashboard/BrandDiscovery" class="text-white">
              Brand Discovery
            </RouterLink>
          </li>
          <li class="ml-20">
            <RouterLink to="/dashboard/BrandNewsHome" class="text-white">
              Brand News
            </RouterLink>
          </li>
          <!-- <li>Data Intelligence</li> -->
          <li class="ml-20">
            <RouterLink to="/dashboard/OriginData" class="text-white">
              Social Buzz
            </RouterLink>
          </li>
          <!-- System -->
          <li class="group">
            <span class="text-white cursor-pointer ml-20 mr-10">System</span>
            <div
              class="absolute top-15 right-1/6 w-82 h-95 flex flex-row border-zinc-200 border-solid border pl-3 pr-3 hidden group-hover:flex">
              <div class="flex-1 mr-2">
                <!-- Configuration -->
                <div class="border-zinc-200 border-b-1 border-solid text-[#1890ff] ">
                  <span class="iconify ml-5 mr-1 text-base align-middle" data-icon="fluent:apps-20-regular"
                    data-inline="false" />
                  <span class="align-middle">
                    Configuration
                  </span>
                </div>
                <!-- 渲染的子级 -->
                <div v-for="i, index in leftroute" :key="index"
                  class="border-zinc-200  hover:text-[#1890ff] leading-5 mt-5 ">
                  <span class="iconify ml-5 mr-2 text-base align-middle" :data-icon="i.icon" data-inline="false" />
                  <span class="align-middle">
                    <RouterLink :to="i.path" class="text-[#333]">{{ i.title }}</RouterLink>
                  </span>
                </div>
              </div>
              <!-- right -->
              <div class="ml-2 flex-1">
                <!-- Others -->
                <div class="border-zinc-200 border-b-1 border-solid text-[#1890ff] ">
                  <span class="iconify ml-5 mr-1 text-base align-middle" data-icon="iconoir:more-horiz-circled-outline"
                    data-inline="false" />
                  <span class="align-middle">
                    Others
                  </span>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <!-- use -->
      <div class="text-white leading-14 mr-8">
        <a-dropdown>
          <div>
            <a-avatar>
              <span class="iconify" data-icon="ic:round-person" data-inline="false" />
            </a-avatar>
            <span class="ml-10px text-base text-white text-sm">{{ JSON.parse(username) }}</span>
          </div>

          <template #overlay>
            <a-menu>
              <a-menu-item key="logout" @click="quit()">
                <span class="flex items-center">
                  <span class="iconify mr-1" data-icon="majesticons:logout-line" data-inline="false" />
                  <span>退出登录</span>
                </span>
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </div>
    </div>
    <!-- main -->
    <div class="h-screen mt-15">
      <router-view />
    </div>
    <div>
      <a-back-top />
      <strong style="color: rgba(64, 64, 64, 0.6)" />
    </div>
  </div>
</template>

<script>
import { getSession, removeSession } from "@/utils/auth";
export default {
  name: 'MainLayout',
};
</script>

<script setup>
const leftroute = reactive([
  {
    path: '/System/brand',
    icon: 'ant-design:trademark-circle-outlined',
    title: 'Brand'
  },
  {
    path: '/System/Industry',
    icon: 'tabler:building-skyscraper',
    title: 'Industry'
  },
  {
    path: '/System/KeyConfig',
    icon: 'fluent:target-arrow-20-regular',
    title: 'Keyword'
  },
  {
    path: '/System/Channel',
    icon: 'ant-design:apartment-outlined',
    title: 'Channel'
  },
  {
    path: '/System/Platform',
    icon: 'fluent:desktop-pulse-48-regular',
    title: 'Platform'
  },
  {
    path: '/System/Topictag',
    icon: 'ant-design:tag-outlined',
    title: 'Topic Tag'
  },
  {
    path: '/System/Filter',
    icon: 'ant-design:filter-outlined',
    title: 'Filter Word'
  },

])
const username = getSession("userName");
const quit = () => {
  // removeSession("token");
  window.location.href = "https://biuat.ibaiqiu.com/a/dist/";
}

</script>
