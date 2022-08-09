<template>
  <div>
    <div>
      <a-form layout="inline">
        <a-form-item label="Brand Eng Name">
          <a-select
            style="width: 200px"
            v-model:value="searchText"
            show-search
            :filter-option="false"
            :show-arrow="false"
            @search="searchBrand"
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
        <a-form-item label="Platform Name">
          <a-select
            v-model:value="platformId"
            style="width: 200px"
            :maxTagCount="1"
            mode="multiple"
          >
            <a-select-option
              v-for="item in platform"
              :key="item.key"
              :value="item.platId"
            >
              {{ item.platName }}
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
          <a-button type="primary" class="ml-3" @click="add">
            <span
              class="iconify inline align-middle mr-1 mb-1 text-base"
              data-icon="ic:round-plus"
              data-inline="false"
            />
            <span class="inline">New</span>
          </a-button>
        </a-form-item>
      </a-form>
    </div>
    <div class="mt-4">
      <a-table
        :columns="columns"
        :data-source="tabData"
        bordered
        :pagination="paginationOption"
        :scroll="{ y: 'calc(100vh - 376px)' }"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'action'">
            <a @click="edit(record)">Edit</a>
            <a-divider type="vertical" />
            <a-popconfirm title="确定删除该平台 ?" @confirm="dele(record)">
              <template #icon>
                <question-circle-outlined style="color: red" />
              </template>
              <a href="#">Delete</a>
            </a-popconfirm>
          </template>
        </template>
      </a-table>
    </div>
    <a-modal
      :visible="visible"
      :title="!item.id ? '新增平台' : '编辑平台'"
      centered
      @ok="handleOk"
      @cancel="handleCancel"
    >
      <a-form
        ref="ruleForm"
        :model="item"
        :label-col="{ span: 6 }"
        :wrapper-col="{ span: 14 }"
      >
        <a-form-item
          label="Brand Name"
          name="brandName"
          :rules="[
            { required: true, message: 'Brand Name 不能为空', trigger: 'blur' },
          ]"
        >
          <a-select
            v-model:value="item.brandName"
            show-search
            :disabled="item.id == null ? false : true"
            :default-active-first-option="false"
            :filter-option="false"
            :not-found-content="null"
            @search="searchBrand"
            @change="handleChangeBrand"
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
        <a-form-item
          label="Platform Name"
          name="platformName"
          :rules="[
            {
              required: true,
              message: 'Platform Name 不能为空',
              trigger: 'blur',
            },
          ]"
        >
          <a-select
            v-model:value="item.platformName"
            show-search
            :disabled="item.id == null ? false : true"
            allow-clear
            @change="handleChangePlatform"
          >
            <a-select-option
              v-for="(item, index) in platform"
              :key="index"
              :value="item.platName"
            >
              {{ item.platName }}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item
          label="official ID"
          name="officialId"
          :rules="[
            {
              required: true,
              message: 'official ID 不能为空',
              trigger: 'blur',
            },
          ]"
        >
          <a-input v-model:value="item.officialId" />
        </a-form-item>
        <a-form-item label="official Url">
          <a-input v-model:value="item.officialUrl" />
        </a-form-item>
        <a-form-item label="official Username">
          <a-input v-model:value="item.officialUserName" />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>


<script>
export default {
  name: "PlatformBrand",
};
</script>

<script setup>
import { message } from "ant-design-vue";
let platformId = ref([]);
// data
let BrandItems = ref([]); // 品牌数据
let BackupBrandItems = ref([]);
const visible = ref(false);
const columns = reactive([
  { title: "NO", dataIndex: "key", key: "key" },
  { title: "Brand Eng Name", dataIndex: "brandName", key: "brandName" },
  { title: "Platform Name", dataIndex: "platformName", key: "platformName" },
  { title: "official ID", dataIndex: "officialId", key: "officialId" },
  { title: "official Url", dataIndex: "officialUrl", key: "officialUrl" },
  {
    title: "official Username",
    dataIndex: "officialUserName",
    key: "officialUserName",
  },
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
let platform = ref([]); // 平台数据
const ruleForm = ref();
const item = reactive({
  id: null,
  brandId: null,
  brandName: "",
  platformId: null,
  platformName: "",
  officialId: "",
  officialUrl: "",
  officialUserName: "",
});

const searchBrand = (value) => {
  let timer;
  if (timer) clearTimeout(this.timer);
  timer = setTimeout(async () => {
    BrandItems.value = await api.queryAllBrandName({ keyword: value });
    clearTimeout(timer);
  }, 1000);
  searchText.value = value;
};
const handleChangeBrand = async () => {
  let data = await api.queryBrand({
    keyword: item.brandName,
  });
  item.brandId = data[0].brandId;
};
const handleChangePlatform = (value) => {
  item.platformName = value;
  item.platformId = platform.value.find((val) => val.platName === value).platId;
};
const getBrandAgain = () => {
  BrandItems.value = BackupBrandItems.value;
};
// 平台平台表格   平台选项
const getBaseData = async () => {
  const data = await api.queryAllBrandName();
  platform.value = await api.queryPlatform();
  BrandItems.value = data;
  BackupBrandItems.value = data;
};

// 初始搜索
const onSearch = async () => {
  const { result } = await api.queryBrandPlatform({
    brandName: searchText.value,
    platformIdList: platformId.value,
  });
  tabData.value = result.map((item, index) => {
    item.key = index + 1;
    return item;
  });
};

// 重置
const reset = () => {
  searchText.value = "";
  platformId.value = [];
  BrandItems.value = BackupBrandItems.value;
  onSearch();
};
//弹层 新增 平台
const add = () => {
  visible.value = true;
  if (searchText.value !== "") {
    item.brandName = searchText.value;
    handleChangeBrand();
  }
};
//弹层 新增 编辑平台
const edit = async (record) => {
  visible.value = true;
  item.id = record.id;
  item.brandId = record.brandId;
  item.brandName = record.brandName;
  item.platformId = record.platformId;
  item.platformName = record.platformName;
  item.officialId = record.officialId;
  item.officialUrl = record.officialUrl;
  item.officialUserName = record.officialUserName;
};
const handleOk = async () => {
  await ruleForm.value.validate();
  if (item.id == null) {
    await api.insBrandPlatform([{ ...item }]);
    message.success("新增成功");
    onSearch();
  } else {
    await api.updBrandPlatform({ ...item });
    message.success("编辑成功");
    onSearch();
  }
  resetItem();
};
const handleCancel = () => {
  ruleForm.value.resetFields();
  resetItem();
};
const resetItem = () => {
  item.id = null;
  item.brandId = null;
  item.brandName = "";
  item.platformId = null;
  item.platformName = "";
  item.officialId = "";
  item.officialUrl = "";
  item.officialUserName = "";
  visible.value = false;
};
// 删除平台
const dele = async (record) => {
  await api.delBrandPlatform({
    id: record.id,
  });
  onSearch();
  message.success("删除成功");
};
getBaseData();
onSearch();
</script>
