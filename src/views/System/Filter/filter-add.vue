<template>
  <a-modal :visible="visible" title="新增过滤词" @ok="handleOk" @cancel="handleCancel">
    <a-form ref="ruleForm" :model="item" :label-col="{ span: 6 }" :wrapper-col="{ span: 14 }">
      <a-form-item label="Report Type" name="reportId" :rules="[
        {
          required: true,
          message: 'Report Type Name 不能为空',
          trigger: 'blur',
        },
      ]">
        <a-select :show-arrow="false" v-model:value="item.reportId">
          <a-select-option v-for="item in report_type" :key="item.code" :value="item.code">
            {{ item.value }}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="Industry" name="indId" :rules="[
        {
          required: true,
          message: 'Industry 不能为空',
          trigger: 'blur',
        },
      ]">
        <a-select :show-arrow="false" v-model:value="item.indId">
          <a-select-option v-for="item in Industry" :key="item.indId" :value="item.indId">
            {{ item.indName }}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="Filter Field" name="filterFieldId" :rules="[
        {
          required: true,
          message: 'Filter Field 不能为空',
          trigger: 'blur',
        },
      ]">
        <a-select v-model:value="item.filterFieldId">
          <a-select-option v-for="item in filterfield" :key="item.code" :value="item.code">
            {{ item.value }}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="Filter Word State" name="filterCond" :rules="[
        {
          required: true,
          message: 'Filter Word State 不能为空',
          trigger: 'blur',
        },
      ]">
        <a-select v-model:value="item.filterCond">
          <a-select-option :value="0">不包含</a-select-option>
          <a-select-option :value="1"> 包含</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="Filter Word">
        <a-select mode="tags" style="width: 100%" placeholder="支持输入多个过滤词,并按回车键结束" :maxTagCount="2"
          v-model:value="item.tags">
        </a-select>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
import { message } from "ant-design-vue";
export default {
  name: 'FilterAdd',
};
</script>

<script setup>
const emits = defineEmits(["refresh"]);
const props = defineProps({
  Industry: {
    type: Array,
    default: () => [],
  },
  report_type: {
    type: Array,
    default: () => [],
  },
  filterfield: {
    type: Array,
    default: () => [],
  },
});

const ruleForm = ref()
const visible = ref(false)
const handleOk = async () => {
  await ruleForm.value.validate();
  await api.insFilter({
    filterCond: item.filterCond,
    filterFieldId: item.filterFieldId,
    filterWord: item.tags.join(","),
    industryId: item.indId,
    reportId: item.reportId,
  });
  emits("refresh")
  message.success('新增成功')
  resetItem()
}
const handleCancel = () => {
  ruleForm.value.resetFields();
  resetItem()
}
const item = reactive({
  reportId: null,
  indId: null,
  filterFieldId: null,
  filterCond: null,
  tags: [],
})
defineExpose({
  visible,
  item,
});
const resetItem = () => {
  visible.value = false
  item.reportId = null
  item.indId = null
  item.filterFieldId = null
  item.filterCond = null
  item.tags = []
}
</script>
