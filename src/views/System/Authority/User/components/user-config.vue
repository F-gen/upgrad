<template>
  <div style="margin-top: 16px">
    <a-card>
      <a-form layout="inline">
        <a-form-item label="用户ID">
          <a-input
            placeholder="请输入用户ID"
            v-model:value="search.username"
          ></a-input>
        </a-form-item>
        <a-form-item label="姓名">
          <a-input
            placeholder="请输入姓名"
            v-model:value="search.name"
          ></a-input>
        </a-form-item>
        <a-form-item label="品牌">
          <a-select
            v-model:value="brandId"
            show-search
            mode="multiple"
            :max-tag-count="1"
            style="width: 200px"
            :default-active-first-option="false"
            :show-arrow="false"
            :filter-option="false"
            :not-found-content="null"
            @search="handleSearch"
            @blur="handleBlur"
          >
            <a-select-option
              v-for="(item, index) in Brand"
              :key="index"
              :value="item.brandId"
            >
              {{ item.brandNameEn }}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item>
          <a-button type="primary" style="margin-left: 10px" @click="onSearch">
            <search-outlined />Search
          </a-button>
          <a-button type="primary" style="margin-left: 10px" @click="reset">
            <undo-outlined />Reset
          </a-button>
        </a-form-item>
      </a-form>

      <div style="margin-top: 16px">
        <a-table
          :columns="columns"
          :data-source="data"
          bordered
          :pagination="false"
        >
          <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'action'">
              <a @click="checkData(record)">数据权限</a>
            </template>
            <template v-if="column.key === 'brandNameList'">
              <Swiperscroll :record="record.brandNameList"></Swiperscroll>
            </template>
            <template v-if="column.key === 'status'">
              {{ record.status == 0 ? "未锁定 " : "锁定 " }}
            </template>
          </template>
        </a-table>
        <div class="page">
          <a-pagination
            v-model:current="UserList.pageNum"
            v-model:pageSize="UserList.pageSize"
            :total="total"
            show-size-changer
            @showSizeChange="onShowSizeChange"
            @change="onShowSizeChange"
          />
        </div>
      </div>
    </a-card>
    <a-modal
      :visible="visible"
      title="数据权限"
      @ok="handleOk"
      @cancel="handleOk"
      center
    >
      <div style="height: 300px; overflow: auto">
        <div
          v-for="(i, index) in modalData"
          :key="index"
          style="padding: 5px; font-size: 14px"
        >
          {{ i }}
        </div>
      </div>
    </a-modal>
  </div>
</template>

<script>
export default {
  name: "user",
};
</script>

<script setup>
const search = reactive({
  username: "", // 姓名eng
  name: "", // 姓名
});
const brandId = ref([]); //  getUserList 使用
const data = ref([]);
const columns = ref([
  { title: "用户ID", key: "userNameEn", dataIndex: "userNameEn" },
  { title: "姓名", key: "userNameCn", dataIndex: "userNameCn" },
  { title: "邮箱", key: "email", dataIndex: "email" },
  {
    title: "品牌",
    key: "brandNameList",
    scopedSlots: { customRender: "brandNameList" },
    width: "200px",
  },
  { title: "角色", key: "roleName", dataIndex: "roleName" },
  {
    title: "状态",
    key: "status",
    scopedSlots: { customRender: "status" },
  },
  {
    title: "操作",
    key: "action",
    scopedSlots: { customRender: "action" },
  },
]);
const Brand = ref([]);
const backipBrand = ref([]);
const visible = ref(false);
const modalData = ref([]);
const total = ref(0);

const UserList = reactive({
  brandIdList: [],
  userNameCn: "",
  userNameEn: "",
  pageNum: 1,
  pageSize: 10,
});
const brandName = ref("");
const onShowSizeChange = (current, pageSize) => {
  UserList.pageNum = current;
  UserList.pageSize = pageSize;
  getUserList();
};
const getBasicData = async () => {
  const { result } = await api.getBrandListOfUserRole({
    brandName: brandName.value,
  });
  Brand.value = result;
  backipBrand.value = result;
};
getBasicData();
const handleBlur = () => {
  Brand.value = backipBrand.value;
};
const getUserList = async () => {
  const tabledata = await api.getUserList({ ...UserList });
  // console.log(data.result.list, "???data");
  data.value = tabledata.result.list;
  total.value = tabledata.result.total;
};
getUserList();
const handleSearch = async (name) => {
  let timer;
  if (timer) clearTimeout(timer);
  timer = setTimeout(async () => {
    const { result } = await api.getBrandListOfUserRole({
      brandName: name,
    });

    Brand.value = result;
    clearTimeout(timer);
  }, 500);
};
const onSearch = async () => {
  UserList.brandIdList = brandId.value;
  UserList.userNameCn = search.name;
  UserList.userNameEn = search.username;
  const tabledata = await api.getUserList({ ...UserList });
  // console.log(data.result.list, "???data");
  data.value = tabledata.result.list;
  total.value = tabledata.result.total;
};
const reset = () => {
  UserList.brandIdList = [];
  UserList.userNameCn = "";
  UserList.userNameEn = "";
  UserList.pageNum = 1;
  UserList.pageSize = 10;
  search.name = "";
  search.username = "";
  brandId.value = [];
  getUserList();
};
const checkData = (record) => {
  visible.value = true;
  modalData.value = record.brandNameList;
};
const handleOk = () => {
  visible.value = false;
  modalData.value = [];
};
</script>
<style lang="scss" scoped>
.page {
  margin-top: 16px;
  float: right;
}
</style>
