<template>
  <div class="bg">
    <div class="bg-container">
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
<style scoped lang="scss">
.bg {
  width: 100%;
  background-color: #f0f2f5;
  padding: 24px;
}

.bg-container {

  background-color: #fff;
  padding: 24px;
}

</style>
