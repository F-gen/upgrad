<template>
  <div>
    <a-form layout="inline">
      <a-form-item label="Report Type">
        <a-select v-model:value="reportType" showArrow style="width: 150px" @change="getTopicTable(reportType)">
          <a-select-option :value="item.code" v-for="item in report_type" :key="item.code">{{ item.value }}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item>
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
  <!-- table -->
  <div class="mt-4">
    <a-table :columns="columns" :data-source="tabData" bordered :pagination="paginationOption"
      :scroll="{ y: 'calc(100vh - 376px)' }">
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <a @click="edit(record)">Edit</a>
          <a-divider type="vertical" />
          <a-popconfirm title="确定删除该主题 ?" @confirm="dele(record)">
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
  <a-modal :visible="visible" :title="!item.topicId ? '新增主题' : '编辑主题'" centered @ok="handleOk" @cancel="handleCancel">
    <a-form ref="ruleForm" :model="item" :label-col="{ span: 6 }" :wrapper-col="{ span: 14 }">
      <a-form-item label="Report Type" name="reportType">
        <a-select v-model:value="item.reportTypeId">
          <a-select-option :value="item.code" v-for="item in report_type" :key="item.code">{{ item.value }}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="Topic Name" name="topicName" :rules="[
          {
            required: true,
            message: 'Topic Name 不能为空',
            trigger: 'blur',
          },
        ]">
        <a-input v-model:value="item.topicName" />
      </a-form-item>
      <a-form-item label="Topic Name Eng">
        <a-input v-model:value="item.topicNameEn" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
import { message } from "ant-design-vue";
export default {
  name: "topic",
};
</script>

<script setup>
// reportType select
const report_type = ref([]);
const reportType = ref("");
const getRportType = async () => {
  report_type.value = await api.queryDict({ type: "report_type" });
};
getRportType();

// 重置 编辑 按钮
const reset = () => {
  reportType.value = "";
  getTopicTable("-1");
};
const add = () => {
  visible.value = true;
};

//table
const tabData = ref([]);
const columns = reactive([
  { title: "NO", dataIndex: "key", key: "key" },
  { title: "Topic Name", dataIndex: "topicName", key: "topicName" },
  { title: "Topic Name Eng", dataIndex: "topicNameEn", key: "topicNameEn" },
  { title: "Report Type", dataIndex: "reportType", key: "reportType" },
  { title: "Action", dataIndex: "action", key: "action" },
]);
const paginationOption = reactive({
  showQuickJumper: true,
  pageSizeOptions: ["10", "20", "30", "40", "50", "100"],
  showSizeChanger: true,
  defaultPageSize: 50,
});
const getTopicTable = async (value) => {
  const data = await api.queryTopic({
    reportId: value,
  });
  tabData.value = data.map((item, index) => {
    item.key = index + 1;
    return item;
  });
};
getTopicTable("-1");
// 编辑 删除 弹窗
const ruleForm = ref();
const visible = ref(false);
const item = reactive({
  reportType: "",
  reportTypeId: null,
  topicId: null,
  topicName: "",
  topicNameEn: "",
});
const edit = (record) => {
  visible.value = true;
  item.topicName = record.topicName;
  item.topicNameEn = record.topicNameEn;
  item.topicId = record.topicId;
  item.reportTypeId = record.reportTypeId;
};
const dele = async (record) => {
  await api.delTopic({
    topicId: record.topicId,
  });
  message.success("删除成功");
  if (reportType.value === "") {
    getTopicTable("-1");
  } else {
    getTopicTable(reportType.value);
  }
};
const handleOk = async () => {
  await ruleForm.value.validate();
  if (!item.topicId) {
    await api.insTopic({
      reportTypeId: item.reportTypeId,
      topicName: item.topicName,
      topicNameEn: item.topicNameEn,
    });
     message.success("新增成功");
    resetItem();
  } else {
    await api.updTopic({ ...item });
     message.success("编辑成功");
    resetItem();
  }
};
const handleCancel = () => {
  ruleForm.value.resetFields();
  resetItem();
};
const resetItem = () => {
  if (reportType.value === "") {
    getTopicTable("-1");
  } else {
    getTopicTable(reportType.value);
  }
  visible.value = false;

  item.reportTypeId = null;
  item.topicId = null;
  item.topicName = "";
  item.topicNameEn = "";
};
</script>
