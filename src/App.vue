
<template>
  <a-config-provider :locale="zhCN">
    <a-spin :spinning="spinning">
      <router-view />
    </a-spin>
  </a-config-provider>
</template>
<script setup>
import zhCN from 'ant-design-vue/es/locale/zh_CN';
import 'dayjs/locale/zh-cn';
import dayjs from 'dayjs';


dayjs.locale('zh-cn');
let store = useStore();
let spinning = computed(() => store.getters.spinning);
</script>

