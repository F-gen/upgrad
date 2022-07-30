<template>
  <div class="bg-[#f0f2f5] w-full box-border p-6">
    <div class="bg-light-50 p-6">
      <a-tabs v-model:activeKey="activeKey" @change="changtab">
        <a-tab-pane key="BrandConfig" tab="Brand" />
        <a-tab-pane key="BrandCatagory" tab="Category" />
      </a-tabs>
      <component :is="componentList[componentId]" />
    </div>
  </div>
</template>

<script>
import BrandCatagory from "./brand-catagory.vue";
import BrandConfig from "./brand-config.vue";
export default {
  name: 'Brand',
};
let componentList = {
  BrandCatagory,
  BrandConfig
}
</script>

<script setup>
const activeKey = ref('BrandConfig')
const componentId = ref('BrandConfig')
const changtab = (activeKey) => {
  componentId.value = activeKey
}
</script>
