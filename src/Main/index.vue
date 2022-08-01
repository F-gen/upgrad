<template>
  <div class="flex relative h-screen flex-col">
    <!-- nav -->
    <div class="h-[60px] z-10  bg-stone-900 flex w-full justify-between fixed top-0 left-0">
      <!-- logo -->
      <div class="leading-14 ml-10">
        <img src="@/assets/MI.png" class="w-25 h-7 inline-block">
      </div>
      <!-- route -->
      <div>
        <ul class="flex leading-14">
          <li class="ml-20">
            <a class=" hover:text-primary text-[#fff] text-opacity-100" @click="toRoute('/Layout/BrandDiscovery')">
              Brand Discovery
            </a>
          </li>
          <li class="ml-20">
            <a class="text-white hover:text-primary text-opacity-100" @click="toRoute('/Layout/BrandNewsHome')">
              Brand News
            </a>
          </li>
          <!-- <li>Data Intelligence</li> -->
          <li class="ml-20">
            <a class="text-white hover:text-primary text-opacity-100" @click="toRoute('/Layout/OriginData')">
              Social Buzz
            </a>
          </li>
          <!-- System -->
          <li class="group">
            <span class="text-white cursor-pointer ml-20 mr-10 hover:text-primary ">System</span>
            <div
              class=" bg-[#ffffff] z-10 hidden absolute top-15 right-1/6  w-[328px] h-[380px]  flex-row border-zinc-200 border-solid border pl-3 pr-3  group-hover:flex">
              <div class="flex-1 mr-2">
                <!-- Configuration -->
                <div class="border-zinc-200 border-b-[1px] border-solid text-primary ">
                  <span class="iconify ml-5 mr-1 text-base align-middle inline-block" data-icon="fluent:apps-20-regular"
                    data-inline="false" />
                  <span class="align-middle inline-block">
                    Configuration
                  </span>
                </div>
                <!-- 渲染的子级 -->
                <div v-for="i, index in leftroute" :key="index" class="hover:text-primary leading-5 mt-5 ">
                  <span class="iconify ml-5 mr-2 text-base align-middle inline-block" :data-icon="i.icon"
                    data-inline="false" />
                  <span class="align-middle">
                    <RouterLink :to="i.path" class="text-[#333] inline-block">{{ i.title }}</RouterLink>
                  </span>
                </div>
              </div>
              <!-- right -->
              <div class="ml-2 flex-1">
                <!-- Others -->
                <div class="border-zinc-200 border-b-[1px] border-solid text-[#1890ff] ">
                  <span class="iconify ml-5 mr-1 text-base align-middle inline-block"
                    data-icon="iconoir:more-horiz-circled-outline" data-inline="false" />
                  <span class="align-middle inline-block">
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
              <span class="iconify text-2xl" data-icon="ic:round-person" data-inline="false" />
            </a-avatar>
            <span class="ml-3  text-white text-sm">{{ JSON.parse(username) }}</span>
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
    <div class="h-[calc(100vh-60px)] mt-[60px]">
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
const router=useRouter();
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
  window.location.href = import.meta.env.VITE_APP_BASE_LOGIN;
}
const toRoute = (paths) => {
  router.push({
    path: paths
  });
}
</script>
