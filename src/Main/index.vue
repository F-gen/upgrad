<template>
  <div class="flex relative h-screen flex-col">
    <!-- nav -->
    <div class="h-15 z-2 bg-stone-900 flex w-full justify-between">
      <!-- logo -->
      <div class="leading-14 ml-10">
        <img src="@/assets/MI.png" class="w-25 h-7 inline-block">
      </div>
      <!-- route -->
      <div class="text-white">
        <ul class="flex leading-14">
          <li>
            <RouterLink to="/">
              Brand Discovery
            </RouterLink>
          </li>
          <li>Brand News {{ num }}</li>
          <!-- <li>Data Intelligence</li> -->
          <li>Social Buzz</li>
          <li>System</li>
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
    <div class="h-[calc(100vh-60px)]">
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
const num=ref(0)
const username = getSession("userName");
const quit = () => {
  // removeSession("token");
  window.location.href = "https://biuat.ibaiqiu.com/a/dist/";
}
</script>
