<template>
  <div>
    <div class="flex justify-between">
      <div>
        <a-form layout="inline">
          <a-form-item class="w-[200px]" label="Brand">
            <a-select v-model:value="searchText" show-search :filter-option="false" :show-arrow="false"
              @search="SearchBrand" @blur="getBrandAgain">
              <a-select-option v-for="(item, index) in BrandItems" :key="index" :value="item">
                {{ item }}
              </a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item label="Report Type">
            <a-select v-model:value="ReportTypeId" :show-arrow="false" style="width: 150px">
              <a-select-option v-for="item in reportType" :key="item.code" :value="item.code">
                {{ item.value }}
              </a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item>
            <a-button type="primary" @click="getKeyList">
              <span class="iconify inline align-middle mr-1 mb-1 text-sm" data-icon="material-symbols:search"
                data-inline="false" />
              <span class="inline">Search</span>
            </a-button>
            <a-button type="primary" class="ml-3" @click="reset">
              <span class="iconify inline align-middle mr-1 mb-1 text-sm" data-icon="carbon:reset"
                data-inline="false" />
              <span class="inline">Reset</span>
            </a-button>
            <a-button type="primary" class="ml-3" @click="add">
              <span class="iconify inline align-middle mr-1 mb-1 text-base" data-icon="ic:round-plus"
                data-inline="false" />
              <span class="inline">New</span>
            </a-button>
          </a-form-item>
        </a-form>
      </div>
      <div>
        <a-button title="下载数据" @click="downFn">
          <span class="iconify inline align-middle mr-1 mb-1 text-base text-[#1890ff]" data-icon="ant-design:download"
            data-inline="false" />
          <span style="color: #1890ff" title="下载数据"> 下载</span>
        </a-button>
      </div>
    </div>
    <div class="mt-4">
      <a-table :columns="columns" :data-source="tabData" bordered :pagination="paginationOption"
        :scroll="{ y: 'calc(100vh - 376px)' }">
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'action'">
            <a @click="edit(record)">Edit</a>
            <a-divider type="vertical" />
            <a-popconfirm title="确定删除该品牌 ?" @confirm="dele(record)">
              <template #icon>
                <question-circle-outlined style="color: red" />
              </template>
              <a href="#">Delete</a>
            </a-popconfirm>
          </template>
          <template v-if="column.key === 'must'">
            <a-switch checked-children="是" un-checked-children="否" :checked="record.must" @change="isMust(record)" />
          </template>
        </template>
      </a-table>
    </div>
    <Config ref="configKeyword" :report-type="reportType" :industry="industry" :brand-items="BackupBrandItems"
      @refresh="getKeyList()" />
  </div>
</template>


<script>
export default {
  name: "KeywordConfig",
};
</script>

<script setup>
import { message } from "ant-design-vue";
import Config from "./components/keyconfig-box.vue";
import { downloadFile } from "@/utils/tool";
// data
let BrandItems = ref([]);
const BackupBrandItems = ref([]);
const industry = ref([])
const brandDetail = ref([]) //获取品牌详情 得id
const reportType = ref([]) //报告类型
const ReportTypeId = ref(null) //报告类型id
const configKeyword = ref(null);
const columns = reactive([
  { title: "NO", dataIndex: "key", key: "key" },
  { title: "Brand Eng Name", dataIndex: "brandName", key: "brandName" },
  { title: "keyword", dataIndex: "keyword", key: "keyword" },
  { title: "Industry", dataIndex: "industry", key: "industry" },
  { title: "Report Type", dataIndex: "reportType", key: "reportType" },
  { title: "Is Must", dataIndex: "must", key: "must" },
  { title: "Action", dataIndex: "action", key: "action" },
]);
const paginationOption = reactive({
  showQuickJumper: true,
  pageSizeOptions: ["10", "20", "30", "40", "50", "100"],
  showSizeChanger: true,
  defaultPageSize: 50,
});
let tabData = ref([]);
let searchText = ref("");
let query = reactive({
  brandId: "-1",
  reportId: "-1",
})
// mehtods
const downFn = async () => {
  const data = await api.downloadBrandKeyword();
  let fileName = "采集词" + ".xlsx";
  // downloadFile
  downloadFile({
    fileName: fileName,
    fileData: data,
  });
  message.success("下载成功");
}
const SearchBrand = (value) => {
  let timer;
  if (timer) clearTimeout(this.timer);
  timer = setTimeout(async () => {
    BrandItems.value = await api.queryAllBrandName({ keyword: value });
    clearTimeout(timer);
  }, 1000);
  searchText.value = value;
};
const getBrandAgain = () => {
  BrandItems.value = BackupBrandItems.value;
};
// 品牌  行业 报告类型
const getBaseData = async () => {
  industry.value = await api.queryInd();
  const data = await api.queryAllBrandName();
  brandDetail.value = await api.queryBrand();
  BrandItems.value = data;
  BackupBrandItems.value = data;
  reportType.value = await api.queryDict({ type: "report_type" });

};
watch(() => [searchText.value, ReportTypeId.value], ([newsearchText, newReport], [oldsearchText, oldReport]) => {
  if (searchText.value) {
    brandDetail.value.forEach((item) => {
      if (searchText.value === item.brandNameEn) {
        query.brandId = item.brandId;
      }
    });
  }
  if (ReportTypeId.value) {
    query.reportId = ReportTypeId.value;
  }
})
// watchEffect(() => {
//   if (searchText.value) {
//     brandDetail.value.forEach((item) => {
//       if (value === item.brandNameEn) {
//         query.brandId = item.brandId;
//       }
//     });
//   } else if (ReportTypeId.value) {
//     query.reportId = ReportTypeId.value;

//   }
// });
// 初始获取表格数据
const getKeyList = async () => {
  const data = await api.queryBrandKeyword({
    ...query
  });
  tabData.value = data.map((item, index) => {
    item.showIndustry = item.industry.split(",");
    item.key = index + 1;
    return item;
  });

};

//IsMust 的 确认 
const isMust = async (record) => {
  let data = await api.updBrandKeyword({
    must: !record.must,
    brandId: record.brandId,
    id: record.id,
    industryId: record.industryId,
    keyword: record.keyword,
    reportTypeId: record.reportTypeId,
  });
  if (data) {
    message.warning(data.message);
  } else {
    message.success("编辑成功");
  }
  getKeyList();
};
// 重置
const reset = () => {
  query.brandId = "-1";
  query.reportId = "-1";
  ReportTypeId.value = "";
  searchText.value = '';
  getKeyList();
};
//弹层 新增 品牌
const add = () => {
  configKeyword.value.visible = true;
  configKeyword.value.BrandItems = BrandItems.value;
}
//弹层 新增 编辑品牌
const edit = async (record) => {
  console.log(record);
  configKeyword.value.visible = true;
  configKeyword.value.item.showIndustry = record.showIndustry;
  configKeyword.value.item.id = record.id;
  configKeyword.value.item.brandId = record.brandId;
  configKeyword.value.item.reportType = record.reportType;
  configKeyword.value.item.brandName = record.brandName;
  configKeyword.value.item.industryId = record.industryId;
  configKeyword.value.item.keyword = record.keyword;
  configKeyword.value.item.reportTypeId = record.reportTypeId;
};
// 删除品牌
const dele = async (record) => {
  await api.delBrandKeyword({
    id: record.id,
  });
  getKeyList();
  message.success("删除成功");
};
getBaseData();
getKeyList();
</script>
