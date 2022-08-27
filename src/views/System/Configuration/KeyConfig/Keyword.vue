
<template>
  <div class="bg-[#f0f2f5] w-full box-border p-6">
    <div class="bg-[#fff] p-6">
      <a-tabs v-model:activeKey="activeKey" @change="changtab">
        <a-tab-pane key="keywordConfigVue" tab="Keyword" />
        <a-tab-pane key="reportTypeVue" tab="ReportType" />
      </a-tabs>
      <component :is="componentList[componentId]" />
    </div>
  </div>
</template>

<script>
import keywordConfigVue from './keyword-config.vue';
import reportTypeVue from './report-type.vue';
export default {
  name: "Keyword",
};
let componentList = {
  keywordConfigVue,
  reportTypeVue,
};
</script>

<script setup>
const activeKey = ref("keywordConfigVue");
const componentId = ref("keywordConfigVue");
const changtab = (activeKey) => {
  componentId.value = activeKey;
};
</script>
