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
      <a-form-item label="Filter Word">
        <!-- search -->
        <div class=" flex items-center mb-[6px]">
          <a-select v-model:value="searchText" show-search style="width: 186px" @search="searchFilterword">
            <a-select-option v-for="(item, index) in item.filterword" :key="index" :value="item">
              {{ item }}
            </a-select-option>
          </a-select>
          <button @click="onSearch" class=" relative pt-1 h-8 rounded-r text-[#fff] bg-[#1890ff] w-[89px]">
            <span class="iconify inline align-middle mr-1 mb-1 text-sm" data-icon="material-symbols:search"
              data-inline="false" />
            Search
          </button>
        </div>
        <!-- search -->
        <!-- 新增 input-->
        <div
          class="w-[275px] h-[120px] rounded  pt-1 pr-[10px] pb-1 pl-[10px] overflow-scroll border-solid border-[#ccc] border-[1px]">
          <a-input v-if="inputVisible" ref="input" type="text" size="small" class="mr-1 w-[78px]"
            v-model:value="inputValue" @blur="handleInputConfirm" @keyup.enter="handleInputConfirm" />
          <!-- 新增 -->
          <a-tag v-else style="background: #fff; borderstyle: dashed" @click="addinput">
            <span class="iconify inline " data-icon="material-symbols:add" data-inline="false"></span>
            New Tag
          </a-tag>
          <!-- 修改已有 -->
          <a-input v-if="isshow" type="text" ref="input" size="small" class="mr-1 w-[78px]" style=" width: 120px"
            v-model:value="inputval" @blur="handleInputChange" @keyup.enter="handleInputChange" />
          <a-tag v-else @click="showinput(val)" v-for="(val, index) in item.filterword" :key="val"
            :closable="index !== 0" @close="() => handleClose(val)">
            {{ val }}
          </a-tag>
        </div>

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
  filterword: [],
  backupfilterword: []
})

defineExpose({
  visible,
  item,
})
// 过滤词词中的搜索
const searchText = ref('')
const onSearch = () => { }
const searchFilterword = (value) => {
  searchText.value = value;
  item.backupfilterword = item.filterword
  item.backupfilterword.forEach((i) => {
    if (i.startsWith(value)) {
      let temp = []
      temp.push(i)
      item.filterword = temp
    }
  })

}
// 新增input  tag
const inputVisible = ref(false)
const inputValue = ref('')
const input = ref()
const handleInputConfirm = () => { }
const addinput = () => {
  inputVisible.value = true
  input.value.focus()
}

// 修改input  tag
const isshow = ref(false)
const inputval = ref('')
const handleInputChange = () => { }
const showinput = () => { }
const handleClose = () => { }
// 校验 确认提交
const ruleForm = ref()
const handleOk = async () => {
  // await ruleForm.value.validate();
  resetItem()
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
  resetItem()

}
const resetItem = () => {
  visible.value = false
  item.report = ''
  item.tempId = false
  item.reportId = null
  item.indName = ''
  item.indId = null
  item.filterField = ''
  item.filterFieldId = null
  item.filterCond = null
  item.tags = []
}
</script>
