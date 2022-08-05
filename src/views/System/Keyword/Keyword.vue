
<template>
  <div class="bg-[#f0f2f5] w-full box-border p-6">
    <div class="bg-[#fff] p-6">
      <a-tabs v-model:activeKey="activeKey" @change="changtab">
        <a-tab-pane key="Keyword" tab="Keyword" />
        <a-tab-pane key="ReportType" tab="ReportType" />
      </a-tabs>
      <component :is="componentList[componentId]" />
    </div>
  </div>
</template>

<script>
export default {
  name: "Keyword",
};
let componentList = {
  BrandCatagory,
  BrandConfig,
};
</script>

<script setup>
const activeKey = ref("BrandConfig");
const componentId = ref("BrandConfig");
const changtab = (activeKey) => {
  componentId.value = activeKey;
};
</script>
