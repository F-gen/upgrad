<template>
  <a-button type="primary" class="ml-3" @click="add">
    <plus-outlined />
    <span class="inline">New</span>
  </a-button>
  <div class="mt-4">
    <a-table :columns="columns" :data-source="datas" bordered>
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
  <a-modal :visible="visible" :title="!this.item.id ? '新增平台' : '编辑平台'" centered @ok="handleOk" @cancel="handleCancel">
    <a-form ref="ruleForm" :model="item" :label-col="{ span: 6 }" :wrapper-col="{ span: 14 }">
      <a-form-item label="Channel Name" name="platName" :rules="[
          {
            required: true,
            message: 'Channel Name 不能为空',
            trigger: 'blur',
          },
        ]">
        <a-input v-model:value="item.platName" />
      </a-form-item>
      <a-form-item label="Platfrom Eng Name">
        <a-input v-model:value="item.platNameEn" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
export default {
  name: "platform-config",
};
</script>

<script setup>
import { message } from "ant-design-vue";
const columns = reactive([
  { title: "NO", dataIndex: "key", key: "key" },
  { title: "Platform Name", dataIndex: "platName", key: "platName" },
  { title: "Platform Eng Name", dataIndex: "platNameEn", key: "platNameEn" },
  { title: "Action", dataIndex: "action", key: "action" },
]);

const datas = ref([]);
const visible = ref(false);
const item = reactive({
  platId: null,
  platName: "",
  platNameEn: "",
});
const ruleForm = ref();
const edit = (record) => {
  visible.value = true;
  item.platId = record.platId;
  item.platName = record.platName;
  item.platNameEn = record.platNameEn;
};
const dele = async (record) => {
  await api.delPlatform({
    platformId: record.platId,
  });
  getplatform();
  message.success("删除成功");
};
const add = () => {
  visible.value = true;
};
const getplatform = async () => {
  const data = await api.queryPlatform();
  datas.value = data.map((item, index) => {
    item.key = index + 1;
    return item;
  });
};
const handleOk = async () => {
  await ruleForm.value.validate();
  if (item.platId == null) {
    await api.insPlatform([{ ...item }]);
    resetItem();
    getplatform();
    message.success("新增成功");
  } else {
    await api.updPlatform({ ...item });
    resetItem();
    getplatform();
    message.success("编辑成功");
  }
};
const handleCancel = () => {
  ruleForm.value.resetFields();
  resetItem();
};
const resetItem = () => {
  visible.value = false;
  item.platId = null;
  item.platName = "";
  item.platNameEn = "";
};
getplatform();
</script>
