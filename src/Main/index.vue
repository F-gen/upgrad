<template>
  <div class="mainpage">
    <!-- nav -->
    <div class="nav">
      <!-- logo -->
      <div class="logo">
        <img src="@/assets/MI.png" class="logo-img">
      </div>
      <!-- route -->
      <div>
        <ul class="nav-route">
          <li class="route_first">
            <a @click="toRoute('/Layout/BrandDiscovery')">
              Brand Discovery
            </a>
          </li>
          <li class="route_first">
            <a @click="toRoute('/Layout/BrandNewsHome')">
              Brand News
            </a>
          </li>
          <!-- <li>Data Intelligence</li> -->
          <li class="route_first">
            <a @click="toRoute('/Layout/OriginData')">
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
                <div class="border-zinc-200 border-b-[1px] border-solid text-primary ">
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
      <div class="user">
        <a-dropdown>
          <div>
            <a-avatar>
              <span class="iconify text-2xl" data-icon="ic:round-person" data-inline="false" />
            </a-avatar>
            <span style="margin-right:12px; ">{{ JSON.parse(username) }}</span>
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
    <div class="main">
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
const router = useRouter();
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

<style scoped lang="scss">
.mainpage {
  // position: relative;
  // height: 100vh;
  display: flex;
  flex-direction: column;

  .nav {
    display: flex;
    height: 60px;
    z-index: 10;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background-color: #20242a;
    justify-content: space-between;

    .logo {
      line-height: 56px;
      margin-left: 40px;

      .logo-img {
        width: 100px;
        height: 28px;
        // border-radius: 50%;
        background-color: #20242a;
        display: inline-block;
        // vertical-align: middle;
      }
    }

    .nav-route {
      display: flex;
      line-height: 56px;
      font-size: 14px;

      .route_first {
        margin-left: 40px;

        a {
          color: #fff;

        }
      }
    }

    .user {
      color: #fff;
      line-height: 56px;
      margin-right: 32px;
    }
  }

  .main {
    margin-top: 60px;

    height: calc(100vh - 60px);
  }
}






</style>
