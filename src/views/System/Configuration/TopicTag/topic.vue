<!--
 * @Author: eureka fugen1999@163.com
 * @Date: 2022-08-06 10:07:50
 * @LastEditors: eureka
 * @LastEditTime: 2022-08-09 18:26:02
 * @FilePath: \upgrad-main\src\views\System\TopicTag\topic.vue
 * @Description: 
 * 
 * Copyright (c) 2022 by eureka, All Rights Reserved. 
-->
<template>
  <div class="bg-[#f0f2f5] w-full box-border p-6">
    <div class="bg-[#fff] p-6">
      <a-tabs v-model:activeKey="activeKey" @change="changtab">
        <a-tab-pane key="TagConfig" tab="Tag" />
        <a-tab-pane key="TopicConfig" tab="Topic" />
      </a-tabs>
      <component :is="componentList[componentId]" />
    </div>
  </div>
</template>

<script>
import TopicConfig from "./topic-config.vue";
import TagConfig from "./tag-config.vue";
export default {
  name: "topictag",
};
let componentList = {
  TagConfig,
  TopicConfig,
};
</script>

<script setup>
const activeKey = ref("TagConfig");
const componentId = ref("TagConfig");
const changtab = (activeKey) => {
  componentId.value = activeKey;
};
</script>
