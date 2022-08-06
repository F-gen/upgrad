<!--
 * @Author: eureka fugen1999@163.com
 * @Date: 2022-08-01 10:33:46
 * @LastEditors: eureka
 * @LastEditTime: 2022-08-04 11:34:09
 * @FilePath: \upgrad-main\src\views\System\brand\components\config-box.vue
 * @Description: 
 * 
 * Copyright (c) 2022 by eureka, All Rights Reserved. 
-->
<template>
  <a-modal
    :visible="visible"
    :title="!item.brandId ? '新增品牌' : '编辑品牌'"
    @ok="handleOk"
    @cancel="handleCancel"
  >
    <a-form
      ref="ruleForm"
      autocomplete="off"
      :model="item"
      :label-col="{ span: 6 }"
      :wrapper-col="{ span: 14 }"
    >
      <a-form-item
        label="Brand Name"
        name="brandNameCn"
        :rules="[
          {
            required: true,
            message: 'BrandName 不能为空',
            trigger: 'change',
          },
        ]"
      >
        <a-input v-model:value="item.brandNameCn" />
      </a-form-item>
      <a-form-item
        label="Brand Eng Name"
        name="brandNameEn"
        :rules="[
          {
            required: true,
            message: 'BrandName Eng 不能为空',
            trigger: 'change',
          },
        ]"
      >
        <a-input v-model:value="item.brandNameEn" />
      </a-form-item>
      <a-form-item label="Category">
        <a-select
          v-model:value="item.brandType"
          allow-clear
          @change="handleChange"
        >
          <a-select-option
            v-for="item in renderCategory"
            :key="item.code"
            :value="item.value"
          >
            {{ item.value }}
          </a-select-option>
        </a-select>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
export default {
  name: "ConfigBox",
};
</script>

<script setup>
import { message } from "ant-design-vue";
let visible = ref(false);
let renderCategory = ref([]);
let item = reactive({
  bqOperate: false,
  brandId: null,
  brandNameCn: "",
  brandNameEn: "",
  brandType: "",
  type: null,
});
const ruleForm = ref();

const emits = defineEmits(["refresh"]);
const props = defineProps({
  brandCategory: {
    type: Array,
    default: () => [],
  },
});
watchEffect(() => {
  if (props.brandCategory) {
    renderCategory.value = props.brandCategory;
  }
});
defineExpose({
  visible,
  item,
});
const handleChange = (val) => {
  renderCategory.value.forEach((type) => {
    if (type.value == val) {
      item.type = type.code - 0;
    }
  });
};
const handleOk = async () => {
  await ruleForm.value.validate();
  if (item.brandId == null) {
    await api.insBrand([
      {
        ...item,
      },
    ]);
    resetItem();
    emits("refresh");
    message.success("新增成功");
  } else {
    await api.updBrand({
      ...item,
    });
    resetItem();
    emits("refresh");
    message.success("编辑成功");
  }

};
const handleCancel = () => {
  ruleForm.value.resetFields();
  resetItem();
};
const resetItem = () => {
  visible.value = false;
  item.brandId = null;
  item.brandNameCn = "";
  item.brandNameEn = "";
  item.brandType = "";
  item.type = null;
}
</script>
