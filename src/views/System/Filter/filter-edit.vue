<template>
  <a-modal :visible="visible" title="编辑过滤词" @ok="handleOk" @cancel="handleCancel">
    <a-form ref="ruleForm" :model="item" :label-col="{ span: 6 }" :wrapper-col="{ span: 14 }">
      <a-form-item label="Report Type">
        <a-input v-model:value="item.report" disabled></a-input>
      </a-form-item>
      <a-form-item label="Industry" name="indName" :rules="[
        {
          required: true,
          message: 'Industry 不能为空',
          trigger: 'blur',
        },
      ]">
        <a-select :show-arrow="false" v-model:value="item.indName" @change="changeInd">
          <a-select-option v-for="item in Industry" :key="item.indId" :value="item.indName">
            {{ item.indName }}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="Filter Field" name="filterField" :rules="[
        {
          required: true,
          message: 'Filter Field 不能为空',
          trigger: 'blur',
        },
      ]">
        <a-select v-model:value="item.filterField" @change="changeFilterField">
          <a-select-option v-for="item in filterfield" :key="item.code" :value="item.value">
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
      <a-form-item>


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
const props = defineProps({
  Industry: {
    type: Array,
    default: () => [],
  },

  filterfield: {
    type: Array,
    default: () => [],
  },
});
const changeInd = (val) => {
  props.Industry.forEach((i) => {
    i.indName == val ? item.indId = i.indId : ''
  })
}
const changeFilterField = (val) => {
  props.filterfield.forEach((i) => {
    i.value == val ? item.filterFieldId = i.code : ''
  })
}
const item = reactive({
  tempId: null,
  report: '',
  reportId: null,
  indName: '',
  indId: null,
  filterField: '',
  filterFieldId: null,
  filterCond: null,
  tags: [],
})
defineExpose({
  visible,
  item,
})
const ruleForm = ref()
const handleOk = async () => {
  // await ruleForm.value.validate();
  visible.value = false
  console.log(item);
  /*

  await api.updFilter({
    reportId: item.reportId,
    filterCond: item.filterCond,
    tempId: item.tempId,
    filterFieldId: item.filterFieldId,
    industryId: item.industryId,
    // filterWord: item.filterWord,

  });
  
  */
}
const handleCancel = () => {
  //  ruleForm.value.resetFields();
  visible.value = false
}
</script>
