<template>
  <div class="page">
    <!-- nav -->
    <div class="basicheader">
      <div class="logo">
        <router-link to="/Layout/BrandDiscovery">
          <div>
            <img
              src="../assets/MI.png"
              alt=""
              class="img"
            >
          </div>
        </router-link>
      </div>
      <div class="route">
        <nav id="menu">
          <div
            v-for="(item, index) in routes[0].children"
            :key="index"
          >
            <div
              v-show="!item.hidden"
              :class="[
                item.children ? 'menu-item highlight' : 'nochildren highlight',
              ]"
            >
              <!-- 一级 -->
              <div
                class="menu-text"
                @click="routeReplace(item.path)"
              >
                <a
                  :style="
                    torouterName == item.meta.title ? 'color:#1890ff' : ''
                  "
                >{{ item.meta.title }}</a>
              </div>
              <!-- 三级开始 -->

              <div class="sub-menu double">
                <!-- 二级 -->

                <div
                  v-for="i in item.children"
                  :key="i.path"
                >
                  <!-- 二级标题config... -->
                  <div
                    v-show="!item.hidden"
                    v-if="i.children"
                    class="menu-text_border"
                  >
                    <div class="icon">
                      <span :class="['iconfont', i.meta.icon]" />
                    </div>

                    <div class="title">
                      {{ i.meta.title }}
                    </div>

                    <!-- <span >{{ i.meta.title }}</span> -->
                  </div>
                  <!-- 二级标题config... end -->
                  <!-- 三级star-->
                  <div
                    v-for="inner in i.children"
                    :key="inner.path"
                    class="icon-box gb a"
                    @click="routeReplace(inner.path)"
                  >
                    <div class="icon">
                      <span :class="['iconfont', inner.meta.icon]" />
                    </div>
                    <div class="text">
                      <div class="title">
                        {{ inner.meta.title }}
                      </div>
                    </div>
                  </div>
                  <!-- 三级结束 -->
                </div>

                <div />
              </div>
            </div>
          </div>
        </nav>
      </div>
      <div class="user">
        <a-dropdown placement="bottom">
          <div>
            <a-avatar>
              <user-outlined />
            </a-avatar>
            <span style="margin-left: 12px; color: #fff">{{
              JSON.parse(username)
            }}</span>
            <down-outlined style="margin-left: 4px" />
          </div>

          <template #overlay>
            <a-menu style="width: 130px; margin-right: 24px">
              <a-menu-item
                v-show="
                  !$store.getters.routerNameList.includes('DownloadCenter')
                "
                @click="routeReplace('/Layout/DownloadCenter')"
              >
                <span class="dropItem">
                  <download-outlined style="margin: 0 10px" />
                  <span>下载中心</span>
                </span>
              </a-menu-item>
              <a-menu-divider
                v-show="
                  !$store.getters.routerNameList.includes('DownloadCenter')
                "
              />
              <a-menu-item
                key="logout"
                @click="quit()"
              >
                <span class="dropItem">
                  <close-outlined style="margin: 0 10px" />

                  <span class="text">退出登录</span>
                </span>
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </div>
    </div>
    <!-- container -->
    <div class="container">
      <router-view />
    </div>
    <!-- back-top -->
    <div>
      <a-back-top />
      <strong style="color: rgba(64, 64, 64, 0.6)" />
    </div>

    <div
      class="online"
      @click="onlinetack"
    >
      <div
        class="icon"
        style="margin-left: 3px"
      >
        <message-outlined />
      </div>
      <div class="message">
        在线运维
      </div>
    </div>
  </div>
</template>

<script>
import { getSession, removeSession } from "@/utils/auth";
export default {
  name: "MainLayout",
};
</script>

<script setup>
const router = useRouter();
const store = useStore();
const routes = store.getters.routes;

const username = getSession("userName");
const quit = () => {
  window.location.href = 'https://biuat.ibaiqiu.com/a/dist/';
};
const torouterName = ref("Brand Insight");
const routeReplace = (route) => {
  if (route == "/Layout/BrandNewsHome") {
    torouterName.value = "Brand Insight";
  } else if (route == "/Layout/Overview") {
    torouterName.value = "Social Intelligence";
  } else if (route == "/Layout/OriginData") {
    torouterName.value = "Social Buzz";
  } else if (route.indexOf("System") !== -1) {
    torouterName.value = "System";
  } else if (route == "/Layout/DownloadCenter") {
    torouterName.value = "";
  }
  router.push({
    path: route,
  });
};
</script>

<style scoped lang="scss">
@import "./Main.scss";
</style>
