<template>
  <a-modal :visible="visible" title="编辑过滤词" @ok="handleOk" @cancel="handleCancel">
    <a-form ref="ruleForm" :model="item" :label-col="{ span: 6 }" :wrapper-col="{ span: 14 }">
      <a-form-item label="Report Type">
        <a-input v-model:value="item.report" disabled></a-input>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
export default {
  name: 'filter-edit',
};
</script>

<script setup>
const visible = ref(false)
const item = reactive({
  report: '',
  reportId: null,
  indId: null,
  filterFieldId: null,
  filterCond: null,
  tags: [],
})
defineExpose({
  visible,
  item,
})
const ruleForm = ref()
const handleOk = () => {
  visible.value = false
}
const handleCancel = () => {
  visible.value = false
}
</script>
