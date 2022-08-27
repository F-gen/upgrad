

<template>
  <div style="margin-top: 16px">
    <a-card>
      <a-form layout="inline">
        <a-form-item label="用户ID">
          <a-input
            placeholder="请输入用户ID"
            v-model="search.username"
          ></a-input>
        </a-form-item>
        <a-form-item label="姓名">
          <a-input placeholder="请输入姓名" v-model="search.name"></a-input>
        </a-form-item>
        <a-form-item label="品牌">
          <a-select
            v-model.trim="brandId"
            show-search
            mode="multiple"
            :max-tag-count="1"
            style="width: 200px"
            :default-active-first-option="false"
            :show-arrow="false"
            :filter-option="false"
            :not-found-content="null"
            @search="handleSearch"
            @change="handleChange"
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
            <a-icon type="search" />Search
          </a-button>
          <a-button type="primary" style="margin-left: 10px" @click="reset">
            <a-icon type="redo" />Reset
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
          <span slot="action" slot-scope="text, record">
            <a @click="checkData(record)">数据权限</a>
          </span>
          <span slot="status" slot-scope="text, record">
            {{ record.status == 0 ? "未锁定 " : "锁定 " }}
          </span>
          <span slot="brandNameList" slot-scope="text, record">
            <Swiperscroll :record="record.brandNameList"> </Swiperscroll>
          </span>
        </a-table>
        <div class="page">
          <a-pagination
            v-model="UserList.pageNum"
            :page-size="UserList.pageSize"
            :total="total"
            show-size-changer
            :page-size-options="pageSizeOptions"
            :default-current="UserList.pageNum"
            @showSizeChange="onShowSizeChange"
            @change="onShowSizeChange"
          />
        </div>
      </div>
    </a-card>
    <a-modal
      v-model="visible"
      title="数据权限"
      @ok="handleOk"
      @cancel="handleCancel"
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
import { getSession } from "@/utils/auth";
import Swiperscroll from "@/components/Swiperscroll.vue";
export default {
  name: "user-config",
  components: {
    Swiperscroll,
  },
  data() {
    return {
      brandId: [], //  getUserList 使用
      data: [],
      columns: [
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
      ],
      search: {
        username: "", // 姓名eng
        name: "", // 姓名
      },
      Brand: [],
      backipBrand: [],
      visible: false,
      total: 0,
      pageSizeOptions: ["10", "20", "30", "40", "50", "100"],
      UserList: {
        brandIdList: [],
        userNameCn: "",
        userNameEn: "",
        pageNum: 1,
        pageSize: 10,
      },
      modalData: [],
    };
  },
  methods: {
       onShowSizeChange(current, pageSize) {
      this.UserList.pageNum = current;
      this.UserList.pageSize = pageSize;
      this.getUserList();
    },
    async getBasicData() {
      const { result } = await api.getBrandListOfUserRole({
        brandName: this.brandName,
      });
      this.Brand = result;
      this.backipBrand = this.Brand;
    },
    handleBlur() {
      this.Brand = this.backipBrand;
    },
    async getUserList() {
      const data = await api.getUserList(this.UserList);
      this.data = data.result.list;
      this.total = data.result.total;
    },
    handleSearch(name) {
      if (this.timer) clearTimeout(this.timer);
      this.timer = setTimeout(async () => {
        const { result } = await api.getBrandListOfUserRole({
          brandName: name,
        });

        this.Brand = result;
        clearTimeout(this.timer);
      }, 500);
    },
    handleChange() {},
    async onSearch() {
      this.UserList.brandIdList = this.brandId;
      this.UserList.userNameCn = this.search.name;
      this.UserList.userNameEn = this.search.username;
      const data = await api.getUserList(this.UserList);
      this.data = data.result.list;
      this.total = data.result.total;
    },
    reset() {
      this.UserList = {
        brandIdList: [],
        userNameCn: "",
        userNameEn: "",
        pageNum: 1,
        pageSize: 10,
      };
      this.search = {
        username: "", // 姓名eng
        name: "", // 姓名
      };
      this.brandId = [];
      this.getUserList();
    },
    //查看数据权限
    async checkData(record) {
      this.visible = true;
      //  const data= await api.getUserRoleDetail({
      //     id: record.id,
      //     userNameEn:record.userNameEn,
      //   })
      //   console.log(data);
      this.modalData = record.brandNameList;
    },
    handleOk() {
      this.visible = false;
      this.modalData = [];
    },
    handleCancel() {
      this.visible = false;
      this.modalData = [];
    },
  },
  created() {
    this.getBasicData();
    this.getUserList();
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
.page {
  margin-top: 16px;
  float: right;
}
</style>
