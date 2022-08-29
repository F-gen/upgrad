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
        <div class="filter_search">
          <a-select v-model:value="searchText" show-search style="width: 186px" @search="searchFilterword">
            <a-select-option v-for="(item, index) in item.filterword" :key="index" :value="item">
              {{ item }}
            </a-select-option>
          </a-select>
          <button @click="onSearch" class="search_btn">
            <search-outlined />
            Search
          </button>
        </div>
        <!-- search -->
        <!-- 新增 input-->
        <div class="add_input">
          <a-input v-if="inputVisible" ref="input" type="text" size="small" style="margin-right: 4px; width: 78px;"
            v-model:value="inputValue" @blur="handleInputConfirm" @keyup.enter="handleInputConfirm" />
          <!-- 新增 -->
          <a-tag v-else style="margin:4px 4px 4px 0;background-color: #fff;" @click="addinput">
            <plus-outlined />
            New Tag
          </a-tag>
          <!-- 修改已有 -->
          <a-input v-if="isshow" type="text" ref="input" size="small" class="mr-1  w-[78px]" style=" width: 120px"
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
  backupfilterword: [],
  filterList: []
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
const handleInputConfirm = () => {
  let inputValue = inputValue.value
  if (inputValue && item.filterList.indexOf(inputValue) === -1) {
    item.filterList = [...item.filterList, inputValue];
  }
  inputVisible.value = false;
  inputValue.val = "";
}
const addinput = () => {
  inputVisible.value = true
  // input.value.focus()
}

// 修改input  tag
const isshow = ref(false)
const inputval = ref('')
const temp = ref([])
const handleInputChange = (e) => {
  const inputValue = e.target.value;
  let tags = item.filterList;

  Array.prototype.indexOf = function (val) {
    for (var i = 0; i < this.length; i++) {
      if (this[i] == val) return i;
    }
    return -1;
  };
  Array.prototype.remove = function (val) {
    var index = this.indexOf(val);
    if (index > -1) {
      this.splice(index, 1);
    }
  };
  tags.remove(this.tempval);
  tags.unshift(inputValue.value);
  isshow.value = !isshow.value;
  tags = [...new Set(temp.value), ...new Set(tags)];
  // console.log(tags, "编辑完成");
  item.filterword = tags.join(",");
  item.filterList = tags;
  temp.value = [];

  searchText.value = "";
}
const showinput = () => { }
const handleClose = (val) => {
  const tags = item.filterList.filter((tag) => tag !== val);
  item.filterList = tags;
}
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

<style scoped lang="scss">
.filter_search {
  display: flex;
  align-items: center;
  margin-bottom: 6px;
}
.search_btn {
  position: relative;
  padding-top: 4px;
  height: 32px;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  color: #fff;
  border: 1px solid #1890ff;
  background-color: #1890ff;
  width: 89px;
}
.add_input {
  width: 275px;
  height: 120px;
  border-radius: 4px;
  padding: 4px 10px 4px 10px;
  overflow: scroll;
  border: 1px solid #ccc;

}
</style>
