<template>
  <div class="w-full ">
    <div>
      <a-form layout="inline">
        <a-form-item class="w-50">
          <a-select v-model:value="searchText" show-search placeholder="Select a person" :filter-option="false"
            :show-arrow="false" @search="SearchBrand" @blur="getBrandAgain">
            <a-select-option v-for="item, index in BrandItems" :key="index" :value="item">
              {{ item }}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item>
          <a-button type="primary" @click="onSearch">
            <template #icon>
              <SearchOutlined />
            </template>
            Search
          </a-button>
          <a-button type="primary" class="ml-3" @click="reset">
            <template #icon>
              <undo-outlined />
            </template>
            Reset
          </a-button>
          <a-button type="primary" class="ml-3" @click="add">
            <template #icon>
              <plus-outlined />
            </template>
            New
          </a-button>
        </a-form-item>
      </a-form>
    </div>
    <div class="mt-4">
      <a-table :columns="columns" :data-source="tabData" bordered :pagination="paginationOption"
        :scroll="{ x: 1500, y: 'calc(100vh - 316px)' }">
        <template #bodyCell="{ column }">
          <template v-if="column.key === 'action'">
            <a>Edit</a>
            <a-divider type="vertical" />
            <a>Delete</a>
          </template>
        </template>
      </a-table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BrandConfig',
};
</script>

<script setup>

const BrandItems = ref([])
const BackupBrandItems = ref([])
const columns = reactive([
  { title: 'NO', dataIndex: 'key', key: 'key' },
  { title: 'Brand Eng Name', dataIndex: 'brandNameEn', key: 'brandNameEn' },
  { title: 'Brand Name', dataIndex: 'brandNameCn', key: 'brandNameCn' },
  { title: 'Category', dataIndex: 'brandType', key: 'brandType' },
  { title: 'Is BQ Operate', dataIndex: 'bqOperate', key: 'bqOperate' },
  { title: 'Action', dataIndex: 'action', key: 'action' },
])
const paginationOption = reactive(
  {
    showQuickJumper: true,
    pageSizeOptions: ["10", "20", "30", "40", "50", "100"],
    showSizeChanger: true,
    defaultPageSize: 50,
  },
)
const tabData = ref([])
const searchText = ref('')
const SearchBrand = (value) => {

  let timer
  if (timer) clearTimeout(this.timer);
  timer = setTimeout(async () => {
    BrandItems.value = await api.queryAllBrandName({ keyword: value, });
    clearTimeout(timer);
  }, 500);
  searchText.value = value;
}
const getBrandAgain = () => {
  BrandItems.value = BackupBrandItems.value
}
const Allbrand = async () => {
  const data = await api.queryAllBrandName()
  BrandItems.value = data
  BackupBrandItems.value = data
}

const onSearch = async () => {
  const data = await api.queryBrand({
    keyword: searchText.value,
  });
  tabData.value = data.map((item, index) => {
    item.key = index + 1;
    return item;
  });
}

const reset = () => {

}
const add = () => {

}
Allbrand()
onSearch()
</script>
