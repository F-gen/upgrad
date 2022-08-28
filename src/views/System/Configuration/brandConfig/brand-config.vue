<template>
  <div>
    <div>
      <a-form layout="inline">
        <a-form-item style="width:200px;">
          <a-select v-model:value="searchText" show-search :filter-option="false" :show-arrow="false"
            @search="SearchBrand" @blur="getBrandAgain">
            <a-select-option v-for="(item, index) in BrandItems" :key="index" :value="item">
              {{ item }}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item>
          <a-button type="primary" @click="onSearch">
            <search-outlined />
            <span class="inline">Search</span>
          </a-button>
          <a-button type="primary" class="ml-3" @click="reset">
            <undo-outlined />
            <span class="inline">Reset</span>
          </a-button>
          <a-button type="primary" class="ml-3" @click="add">
            <plus-outlined />
            <span class="inline">New</span>
          </a-button>
        </a-form-item>
      </a-form>
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
          <template v-if="column.key === 'bqOperate'">
            <a-switch checked-children="是" un-checked-children="否" :checked="record.bqOperate"
              @change="changebqOperate(record)" />
          </template>
        </template>
      </a-table>
    </div>
    <Config ref="configBrand" :brand-category="brandCategory" @refresh="onSearch()" />
  </div>
</template>


<script>
export default {
  name: "BrandConfig",
};
</script>

<script setup>
import { message } from "ant-design-vue";
import Config from "./components/config-box.vue";
// data
let BrandItems = ref([]);
let BackupBrandItems = ref([]);
const configBrand = ref(null);

const columns = reactive([
  { title: "NO", dataIndex: "key", key: "key" },
  { title: "Brand Eng Name", dataIndex: "brandNameEn", key: "brandNameEn" },
  { title: "Brand Name", dataIndex: "brandNameCn", key: "brandNameCn" },
  { title: "Category", dataIndex: "brandType", key: "brandType" },
  { title: "Is BQ Operate", dataIndex: "bqOperate", key: "bqOperate" },
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
let brandCategory = ref([]);
// mehtods
const SearchBrand = (value) => {
  let timer;
  if (timer) clearTimeout(timer);
  timer = setTimeout(async () => {
    BrandItems.value = await api.queryAllBrandName({ keyword: value });
    clearTimeout(timer);
  }, 1000);
  searchText.value = value;
};
const getBrandAgain = () => {
  BrandItems.value = BackupBrandItems.value;
};
const getBaseData = async () => {
  const data = await api.queryAllBrandName();
  BrandItems.value = data;
  BackupBrandItems.value = data;
  let Category = await api.queryDict({
    type: "brand_type",
  });
  brandCategory.value = Category;
};

// 初始搜索
const onSearch = async () => {
  const data = await api.queryBrand({
    keyword: searchText.value,
  });
  tabData.value = data.map((item, index) => {
    item.key = index + 1;
    return item;
  });

};

// 按钮是否运营
const changebqOperate = async (record) => {
  await api.updBrand({
    bqOperate: !record.bqOperate,
    brandId: record.brandId,
    brandNameCn: record.brandNameCn,
    brandNameEn: record.brandNameEn,
    type: record.type,
    brandType: record.brandType,
  });
  message.success("编辑成功");
  onSearch();
};
// 重置
const reset = () => {
  searchText.value = "";
  BrandItems.value = BackupBrandItems.value;
  onSearch();
};
//弹层 新增 品牌
const add = () => {
  configBrand.value.visible = true;
};
//弹层 新增 编辑品牌
const edit = async (record) => {
  configBrand.value.visible = true;
  configBrand.value.item.brandId = record.brandId;
  configBrand.value.item.brandNameCn = record.brandNameCn;
  configBrand.value.item.brandNameEn = record.brandNameEn;
  configBrand.value.item.brandType = record.brandType;
  configBrand.value.item.type = record.type;
};
// 删除品牌
const dele = async (record) => {
  await api.delBrand({
    brandId: record.brandId,
  });
  onSearch();
  message.success("删除成功");
};
getBaseData();
onSearch();
</script>
<style scoped lang="scss">
.mt-4{
  margin-top: 16px;
}
.ml-3 {
  margin-left: 12px;
}
</style>
