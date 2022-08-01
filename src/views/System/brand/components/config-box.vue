<!--
 * @Author: eureka fugen1999@163.com
 * @Date: 2022-08-01 10:33:46
 * @LastEditors: eureka
 * @LastEditTime: 2022-08-01 15:09:51
 * @FilePath: \upgrad-main\src\views\System\brand\components\config-box.vue
 * @Description: 
 * 
 * Copyright (c) 2022 by eureka, All Rights Reserved. 
-->
<template>
  <a-modal :visible="visible" title="Basic Modal" @ok="handleOk" @cancel="handleCancel">
    <!-- <a-form-model ref="ruleForm" :model="item" :label-col="{ span: 6 }" :wrapper-col="{ span: 14 }" :rules="rules">
      <a-form-model-item label="Brand Name" prop="brandNameCn">
        <a-input v-model="item.brandNameCn" />
      </a-form-model-item>
      <a-form-model-item label="Brand Eng Name" prop="brandNameEn">
        <a-input v-model="item.brandNameEn" />
      </a-form-model-item>
      <a-form-model-item label="Category">
        <a-select v-model="item.brandType" allow-clear @change="handleChange">
          <a-select-option v-for="item in renderTypeOption" :key="item.code" :value="item.value">
            {{ item.value }}
          </a-select-option>
        </a-select>
      </a-form-model-item>
    </a-form-model> -->
  </a-modal>
</template>

<script setup>
const visible = ref(false);
// const visible = visible;
// const props = defineProps({
//   visible: {
//     type: Boolean,
//     default: false,
//   },

// });
// let show = computed(() => props.visible);
const emits = defineEmits(['refresh',]);
defineExpose({
  visible
});
const handleOk = () => {
  emits('refresh');
  console.log("handleOk");
  visible.value = false;
}
const handleCancel = () => {
  visible.value = false
}
</script>
