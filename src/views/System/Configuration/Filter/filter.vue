<template>
  <div class="bg">
    <div class="bg-container">
      <div>
        <a-form layout="inline">
          <a-form-item style="width:200px;" label="Report Type">
            <a-select :show-arrow="false" @change="changereport">
              <a-select-option v-for="item in report_type" :key="item.code" :value="item.code">
                {{ item.value }}
              </a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item label="Industry" style="width:200px;">
            <a-select :show-arrow="false" @change="changeInd">
              <a-select-option v-for="item in Industry" :key="item.indId" :value="item.indId">
                {{ item.indName }}
              </a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item>
            <a-button type="primary" @click="onSearch">
              <search-outlined />
              <span class="inline">Search</span>
            </a-button>
            <a-button type="primary" style="margin-left: 12px;" @click="reset">
              <undo-outlined />
              <span class="inline">Reset</span>
            </a-button>
            <a-button type="primary" style="left: 12px;" @click="add">
              <plus-outlined />
              <span class="inline">New</span>
            </a-button>
          </a-form-item>
        </a-form>
      </div>
      <div style="margin-top: 16px;">
        <a-table :columns="columns" :data-source="tabData" bordered :pagination="paginationOption"
          :scroll="{ y: 'calc(100vh - 376px)' }">
          <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'action'">
              <a @click="edit(record)">Edit</a>
              <a-divider type="vertical" />
              <a-popconfirm title="确定删除该过滤词 ?" @confirm="dele(record)">
                <template #icon>
                  <question-circle-outlined style="color: red" />
                </template>
                <a href="#">Delete</a>
              </a-popconfirm>
            </template>
            <template v-if="column.key === 'filterCond'">
              <span>{{ record.filterCond === 0 ? "不包含" : "包含" }}</span>
            </template>
          </template>
        </a-table>
      </div>
    </div>
  </div>
  <filterEdit ref="editfilter" :Industry="Industry" :filterfield="filterfield" />
  <filterAdd ref="addfilter" @refresh="onSearch" :Industry="Industry" :report_type="report_type"
    :filterfield="filterfield" />
</template>

<script>
import filterEdit from './filter-edit.vue'
import filterAdd from './filter-add.vue'
import { message } from 'ant-design-vue';

export default {
  name: ' Filterword',
};
</script>

<script setup>
// 搜索栏
const report_type = ref([])
const Industry = ref([])
const filterfield = ref([])
const getData = async () => {
  report_type.value = await api.queryDict({ type: "report_type" });
  Industry.value = await api.queryInd();
  filterfield.value = await api.queryDict({ type: "filter_field" });
}
getData()
const changereport = (val) => {
  console.log(val);
  reportId.value = val;
}
const changeInd = (val) => {
  console.log(val);
  industryId.value = val;
}
const reportId = ref('')
const industryId = ref('')
const onSearch = () => {
  if (reportId.value === '') {
    reportId.value = '-1'
  }
  if (industryId.value === '') {
    industryId.value = '-1'
  }
  getTableData(industryId.value, reportId.value)
}
const reset = () => {
  reportId.value = ''
  industryId.value = ''
  getTableData('-1', '-1')
}

const addfilter = ref()
const add = () => {
  addfilter.value.visible = true
}

// 表格  
const getTableData = async (ind, rep) => {
  let data = await api.queryFilter({
    industryId: ind,
    reportId: rep
  });
  tabData.value = data.map((item, index) => {
    item.key = index + 1;
    return item;
  });
}
getTableData('-1', '-1')
const tabData = ref([])
const columns = ref([
  { title: "NO", dataIndex: "key", key: "key" },
  { title: "Report Type", dataIndex: "report", key: "report" },
  { title: "Industry", dataIndex: "industry", key: "industry" },
  { title: "Filter Field", dataIndex: "filterField", key: "filterField" },
  { title: "Filter Condition", dataIndex: "filterCond", key: "filterCond" },
  { title: "Filter Word", dataIndex: "filterWord", key: "filterWord", ellipsis: true },
  { title: "Action", dataIndex: "action", key: "action" },

])
const paginationOption = reactive({
  showQuickJumper: true,
  pageSizeOptions: ["10", "20", "30", "40", "50", "100"],
  showSizeChanger: true,
  defaultPageSize: 50,
});
const editfilter = ref()
const edit = (record) => {

  editfilter.value.visible = true
  editfilter.value.item.report = record.report
  editfilter.value.item.reportId = record.reportId
  editfilter.value.item.indName = record.industry
  editfilter.value.item.filterField = record.filterField
  editfilter.value.item.filterCond = record.filterCond
  editfilter.value.item.tempId = record.tempId
  editfilter.value.item.filterword = record.filterList
  editfilter.value.item.renderList = record.filterList

}
const dele = async (record) => {
  await api.delFilter({
    tempId: record.tempId,
  });
  message.success('删除成功');
  onSearch();
}
</script>
<style scoped lang="scss">
.bg {
  width: 100%;
  background-color: #f0f2f5;
  padding: 24px;
}

.bg-container {

  background-color: #fff;
  padding: 24px;
}

</style>
