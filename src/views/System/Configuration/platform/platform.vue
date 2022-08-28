<!--
 * @Author: eureka fugen1999@163.com
 * @Date: 2022-08-06 10:07:50
 * @LastEditors: eureka
 * @LastEditTime: 2022-08-08 17:21:36
 * @FilePath: \upgrad-main\src\views\System\platform\platform.vue
 * @Description: 
 * 
 * Copyright (c) 2022 by eureka, All Rights Reserved. 
-->

<template>
  <div class="bg">
    <div class="bg-container">
      <a-tabs v-model:activeKey="activeKey" @change="changtab">
        <a-tab-pane key="PlatformDetail" tab="Brand Platform" />
        <a-tab-pane key="PlatformConfig" tab="Platform
" />
      </a-tabs>
      <component :is="componentList[componentId]" />
    </div>
  </div>
</template>

<script>
import PlatformConfig from "./platform-config.vue";
import PlatformDetail from "./platform-brand.vue";
export default {
  name: "platform",
};
let componentList = {
  PlatformConfig,
  PlatformDetail,
};
</script>

<script setup>
const activeKey = ref("PlatformDetail");
const componentId = ref("PlatformDetail");
const changtab = (activeKey) => {
  componentId.value = activeKey;
};
</script>
