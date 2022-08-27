<!--
 * @Author: eureka fugen1999@163.com
 * @Date: 2022-08-09 17:12:25
 * @LastEditors: eureka
 * @LastEditTime: 2022-08-10 15:24:13
 * @FilePath: \upgrad-main\src\views\System\TopicTag\tag-config.vue
 * @Description: 
 * 
 * Copyright (c) 2022 by eureka, All Rights Reserved. 
-->
<template>
  <a-form layout="inline">
    <a-form-item label="Report Type">
      <a-select
        @change="changeReport"
        v-model:value="reportTypeId"
        :show-arrow="false"
        style="width: 150px"
      >
        <a-select-option
          v-for="item in report_type"
          :key="item.code"
          :value="item.code"
        >
          {{ item.value }}
        </a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item class="w-[200px]" label="Topic">
      <a-select
        v-model:value="topicId"
        show-search
        :filter-option="false"
        :show-arrow="false"
      >
        <a-select-option
          v-for="item in topicList"
          :key="item.topicId"
          :value="item.topicId"
        >
          {{ item.topicName }}
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
  <!-- table -->
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
          <a-popconfirm title="确定删除该标签 ?" @confirm="dele(record)">
            <template #icon>
              <question-circle-outlined style="color: red" />
            </template>
            <a href="#">Delete</a>
          </a-popconfirm>
        </template>
      </template>
    </a-table>
  </div>
  <!-- 弹窗 -->
  <a-modal
    :visible="visible"
    :title="item.tagI == null ? '新增标签' : '编辑标签'"
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
        label="Topic Name"
        name="topicId"
        :rules="[
          {
            required: true,
            message: 'TopicName 不能为空',
            trigger: 'blur',
          },
        ]"
      >
        <a-select v-model:value="item.topicId">
          <a-select-option
            v-for="val in topicAllList"
            :key="val.topicId"
            :value="val.topicId"
          >
            {{ val.topicName }}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item
        label="Tag"
        name="tag"
        :rules="[
          {
            required: true,
            message: 'Tag 不能为空',
            trigger: 'blur',
          },
        ]"
      >
        <a-input v-model:value="item.tag" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
import { message } from "ant-design-vue";
export default {
  name: "tag",
};
</script>

<script setup>
//搜索栏
const report_type = ref([]);
const getRportType = async () => {
  report_type.value = await api.queryDict({ type: "report_type" });
};
getRportType();
const topicList = ref([]);
const topicId = ref(null);
const reportTypeId = ref(null);
const changeReport = async (val) => {
  topicList.value = await api.queryTopic({
    reportId: val,
  });
};
const onSearch = () => {
  if (reportTypeId.value == null) {
    message.warning("请选择报告类型");
    return;
  } else if (topicId.value == null) {
    message.warning("请选择主题");
    return;
  } else {
    getTagList(topicId.value);
  }
};
const getTagList = async (val) => {
  let data = await api.queryTag({ topicId: val });
  tabData.value = data.map((item, index) => {
    item.key = index + 1;
    return item;
  });
};
getTagList("-1");
const reset = () => {
  reportTypeId.value = null;
  topicId.value = null;
  getTagList("-1");
};
const add = () => {
  visible.value = true;
};

//table
const columns = reactive([
  { title: "NO", dataIndex: "key", key: "key" },
  { title: "Tag", dataIndex: "tag", key: "tag" },
  { title: "Topic Name", dataIndex: "topicName", key: "topicName" },
  { title: "Action", dataIndex: "action", key: "action" },
]);
const tabData = ref([]);
const paginationOption = reactive({
  showQuickJumper: true,
  pageSizeOptions: ["10", "20", "30", "40", "50", "100"],
  showSizeChanger: true,
  defaultPageSize: 50,
});
const edit = (record) => {
  visible.value = true;
  item.topicName = record.topicName;
  item.tag = record.tag;
  item.topicId = record.topicId;
  item.tagId = record.tagId;
};
const dele = async (record) => {
  await api.delTag({
    tagId: record.tagId,
  });
  if (topicId.value == null) {
    getTagList("-1");
  } else {
    getTagList(topicId.value);
  }
  message.success("删除成功");
};

// 弹层
const visible = ref(false);
const ruleForm = ref();
const item = reactive({
  tag: "",
  topicName: "",
  tagId: null,
  topicId: null,
});
const topicAllList = ref([]);
const getAlltopic = async () => {
  topicAllList.value = await api.queryTopic({
    reportId: "-1",
  });
};
getAlltopic();
const handleOk = async () => {
  await ruleForm.value.validate();
  if (item.tagId == null) {
    const data = await api.insTag({
      tag: item.tag,
      topicId: item.topicId,
    });
    console.log(data,"data");
    // if (data.code === 500 || data.success === false) {
    //   message.error(data.message);
    //   return;
    // }
    message.success("新增成功");
  } else {
    const data = await api.updTag({
      tag: item.tag,
      tagId: item.tagId,
      topicId: item.topicId,
      topicName: item.topicName,
    });

    console.log(data,"data");
    // if (data.code === 500 || data.success === false) {
    //   message.error(data.message);
    //   return;
    // }
    message.success("编辑成功");
  }
  resetItem();
};
const handleCancel = () => {
  ruleForm.value.resetFields();
  resetItem();
};
const resetItem = () => {
  if (topicId.value == null) {
    getTagList("-1");
  } else {
    getTagList(topicId.value);
  }
  visible.value = false;
  item.tag = "";
  item.topicName = "";
  item.tagId = null;
  item.topicId = null;
};
</script>
