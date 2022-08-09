
<template>
  <div>
    <a-form layout="inline">
      <a-form-item label="Brand Eng Name">
        <a-select
          style="width: 200px"
          v-model:value="searchText"
          show-search
          :filter-option="false"
          :show-arrow="false"
          @search="SearchBrand"
          @blur="getBrandAgain"
        >
          <a-select-option
            v-for="(item, index) in BrandItems"
            :key="index"
            :value="item"
          >
            {{ item }}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="Channel">
        <a-select
          style="width: 200px"
          :maxTagCount="1"
          mode="multiple"
          v-model:value="channelidlist"
        >
          <a-select-option
            v-for="item in channelInfo"
            :key="item.key"
            :value="item.channelId"
          >
            {{ item.channelName }}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item>
        <a-button type="primary" @click="onSearch">
          <span
            class="iconify inline align-middle mr-1 mb-1 text-sm"
            data-icon="material-symbols:search"
            data-inline="false"
          />
          <span class="inline">Search</span>
        </a-button>
        <a-button type="primary" class="ml-3" @click="reset">
          <span
            class="iconify inline align-middle mr-1 mb-1 text-sm"
            data-icon="carbon:reset"
            data-inline="false"
          />
          <span class="inline">Reset</span>
        </a-button>
      </a-form-item>
    </a-form>
  </div>
  <div class="mt-4">
    <a-table
      :data-source="tabData"
      bordered
      :pagination="paginationOption"
      :columns="columns"
      :scroll="{ y: 'calc(100vh - 376px)' }"
    >
      >
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <a @click="edit(record)">Edit</a>
        </template>
        <template v-if="column.key === 'brandChannelInfo'">
          <a-tag
            v-for="item in record.brandChannelInfo"
            :key="item.channelName"
          >
            {{ item.channelName }}
          </a-tag>
        </template>
      </template>
    </a-table>
  </div>
  <ChannelBrandEdit ref="editchannel" @refresh="onSearch" />
</template>

<script>
import ChannelBrandEdit from "./channel-brand-edit.vue";
export default {
  name: "channel-brand",
};
</script>

<script setup>
let channelidlist=ref([])
const paginationOption = reactive({
  showQuickJumper: true,
  pageSizeOptions: ["10", "20", "30", "40", "50", "100"],
  showSizeChanger: true,
  defaultPageSize: 50,
});
const columns = reactive([
  { title: "NO", dataIndex: "key", key: "key" },
  { title: "Brand Eng Name", dataIndex: "brandName", key: "brandName" },
  { title: "Channel", dataIndex: "brandChannelInfo", key: "brandChannelInfo" },
  { title: "Action", dataIndex: "action", key: "action" },
]);
let BrandItems = ref([]);
let BackupBrandItems = ref([]);
const editchannel = ref(null);
let searchText = ref("");
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
let tabData = ref([]);
const channelInfo = ref([]);// channel 数据
const getBaseData = async () => {
  const data = await api.queryAllBrandName();
  BrandItems.value = data;
  BackupBrandItems.value = data;
  channelInfo.value = await api.queryChannel();
};
const onSearch = async () => {
  let {result} = await api.queryBrandChannel({
    brandName: searchText.value,
    channelIdList: channelidlist.value,
  });
  tabData.value = result.map((item, index) => {
    item.key = index + 1;
    return item;
  });
};
const reset = () => {
  searchText.value = "";
  channelidlist.value = [];
  BrandItems.value = BackupBrandItems.value;
  onSearch();
};
const edit = (record) => {
  editchannel.value.show = true;
  editchannel.value.item.brandId = record.brandId;
  editchannel.value.channelDetail = channelInfo.value;
  editchannel.value.item.brandName = record.brandName;
  let obj = [];
  record.brandChannelInfo.forEach((val) => {
    obj.push(val.channelName);
  });

  editchannel.value.item.brandChannelInfo = obj;
};
getBaseData();
onSearch();
</script>
