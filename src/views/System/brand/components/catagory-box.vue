<!--
 * @Author: eureka fugen1999@163.com
 * @Date: 2022-08-01 10:33:46
 * @LastEditors: eureka
 * @LastEditTime: 2022-08-04 11:15:32
 * @FilePath: \upgrad-main\src\views\System\brand\components\catagory-box.vue
 * @Description: 
 * 
 * Copyright (c) 2022 by eureka, All Rights Reserved. 
-->
<template>
  <a-modal
    :visible="visible"
    :title="item.code == null ? '新增品牌类型' : '编辑品牌类型'"
    @ok="handleOk"
    @cancel="handleCancel"
  >
    <a-form
      ref="ruleForm"
    
      :model="item"
      :label-col="{ span: 6 }"
      :wrapper-col="{ span: 14 }"
    >
      <a-form-item
        label="Category Name"
        name="value"
        :rules="[
          {
            required: true,
            message: 'Category Name 不能为空',
            trigger: 'blur',
          },
        ]"
      >
        <a-input v-model:value="item.value" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
export default {
  name: "catagory-box",
};
</script>

<script setup>
import { message } from "ant-design-vue";
let visible = ref(false);
let item = reactive({
  code: null,
  typeName: "brand_type",
  value: "",
});
const ruleForm = ref();
const emits = defineEmits(["refresh"]);
defineExpose({
  visible,
  item,
});

const handleOk =async () => {
 await ruleForm.value.validate()
  if (item.code == null) {
    await api.insDict(
        {
         ...item
        },
      );
      item.typeName = "brand_type";
      item.value = "";
      item.code = null;
      emits("refresh");
      message.success("新增成功");
    } else {
     await api.updDict({
       ...item
      });
      item.typeName = "brand_type";
      item.value = "";
      item.code = null;
      emits("refresh");
      message.success("编辑成功");
    }
    visible.value = false;
};
const handleCancel = () => {
 ruleForm.value.resetFields();
  visible.value = false;
  item.typeName = "brand_type";
  item.value = "";
  item.code = null;
};
</script>
