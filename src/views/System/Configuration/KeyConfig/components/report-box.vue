
<template>
  <a-modal :visible="visible" :title="item.code == null ? '新增报告类型' : '编辑报告类型'" @ok="handleOk" @cancel="handleCancel">
    <a-form ref="ruleForm" :model="item" :label-col="{ span: 6 }" :wrapper-col="{ span: 14 }">
      <a-form-item label="Report Type Name" name="value" :rules="[
        {
          required: true,
          message: 'Report Type Name 不能为空',
          trigger: 'blur',
        },
      ]">
        <a-input v-model:value="item.value" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
export default {
  name: "CatagoryBox",
};
</script>

<script setup>
import { message } from "ant-design-vue";
let visible = ref(false);
let item = reactive({
  code: null,
  typeName: "report_type",
  value: "",
});
const ruleForm = ref();
const emits = defineEmits(["refresh"]);
defineExpose({
  visible,
  item,
});

const handleOk = async () => {
  await ruleForm.value.validate()
  if (item.code == null) {
    await api.insDict(
      {
        ...item
      },
    );
    resetitem();
    emits("refresh");
    message.success("新增成功");
  } else {
    await api.updDict({
      ...item
    });
    resetitem();
    emits("refresh");
    message.success("编辑成功");
  }

};
const handleCancel = () => {
  ruleForm.value.resetFields();
  resetitem();
};
const resetitem = () => {
  visible.value = false;
  item.typeName = "report_type";
  item.value = "";
  item.code = null;
}
</script>
