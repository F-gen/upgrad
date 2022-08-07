<!--
 * @Author: eureka fugen1999@163.com
 * @Date: 2022-08-06 10:07:50
 * @LastEditors: eureka
 * @LastEditTime: 2022-08-07 12:22:45
 * @FilePath: \upgrad-main\src\views\System\channel\channel.vue
 * @Description: 
 * 
 * Copyright (c) 2022 by eureka, All Rights Reserved. 
-->

<template>
  <div class="bg-[#f0f2f5] w-full box-border p-6">
    <div class="bg-[#fff] p-6">
      <a-tabs v-model:activeKey="activeKey" @change="changtab">
        <a-tab-pane key="channelBrand" tab="Brand Channel" />
        <a-tab-pane key="channelConfig" tab="Channel" />
      </a-tabs>
      <component :is="componentList[componentId]" />
    </div>
  </div>
</template>

<script>
import channelConfig from './channel-config.vue';
import channelBrand from './channel-brand.vue';
export default {
  name: "Keyword",
};
let componentList = {
  channelConfig,
  channelBrand,
};
</script>

<script setup>
const activeKey = ref("channelBrand");
const componentId = ref("channelBrand");
const changtab = (activeKey) => {
  componentId.value = activeKey;
};
</script>
