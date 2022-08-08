<!--
 * @Author: eureka fugen1999@163.com
 * @Date: 2022-07-31 08:51:20
 * @LastEditors: eureka
 * @LastEditTime: 2022-08-07 12:26:14
 * @FilePath: \upgrad-main\src\views\System\channel\channel-config.vue
 * @Description: 
 * 
 * Copyright (c) 2022 by eureka, All Rights Reserved. 
-->
<template>
 
      <a-button type="primary" class="ml-3" @click="add">
        <span class="iconify inline align-middle mr-1 mb-1 text-base" data-icon="ic:round-plus" data-inline="false" />
        <span class="inline">New</span>
      </a-button>
      <div class="mt-4">
        <a-table :columns="columns" :data-source="datas" bordered>
          <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'action'">
              <a @click="edit(record)">Edit</a>
              <a-divider type="vertical" />
              <a-popconfirm title="确定删除该渠道 ?" @confirm="dele(record)">
                <template #icon>
                  <question-circle-outlined style="color: red" />
                </template>
                <a href="#">Delete</a>
              </a-popconfirm>
            </template>
          </template>
        </a-table>
      </div>
      <a-modal :visible="visible" :title="item.channelId == null ? '新增渠道' : '编辑渠道'" centered @ok="handleOk"
        @cancel="handleCancel">
        <a-form ref="ruleForm" :model="item" :label-col="{ span: 6 }" :wrapper-col="{ span: 14 }">
          <a-form-item label="Channel Name" name="channelName" :rules="[
            {
              required: true,
              message: 'Channel Name 不能为空',
              trigger: 'blur',
            },
          ]">
            <a-input v-model:value="item.channelName" />
          </a-form-item>
          <a-form-item label="Channel Eng Name">
            <a-input v-model:value="item.channelNameEn" />
          </a-form-item>
        </a-form>
      </a-modal>
  
</template>

<script>
export default {
  name: "channel-config",
};
</script>

<script setup>
import { message } from "ant-design-vue";
const columns = reactive([
  { title: "NO", dataIndex: "key", key: "key" },
  { title: "Channel Name", dataIndex: "channelName", key: "channelName" },
  { title: "Channel Eng Name", dataIndex: "channelNameEn", key: "channelNameEn" },
  { title: "Action", dataIndex: "action", key: "action" },
]);

const datas = ref([]);
const visible = ref(false);
const item = reactive({
  channelId: null,
  channelName: "",
  channelNameEn: "",
});
const ruleForm = ref();
const edit = (record) => {
  visible.value = true;
  item.channelId = record.channelId;
  item.channelName = record.channelName;
  item.channelNameEn = record.channelNameEn;
};
const dele = async (record) => {
  await api.delChannel({
   channelId: record.channelId,
  });
  getChannel();
  message.success("删除成功");
};
const add = () => {
  visible.value = true;
};
const handleOk = async () => {
  await ruleForm.value.validate();
  if (item.channelId == null) {
    await api.insChannel([{ ...item }]);
   resetItem();
    getChannel();
    message.success("新增成功");
  } else {
    await api.updChannel({ ...item });
   resetItem();
    getChannel();
    message.success("编辑成功");
  }

};
const handleCancel = () => {
 ruleForm.value.resetFields();
resetItem()
};
const getChannel = async () => {
  const data = await api.queryChannel();
  datas.value = data.map((item, index) => {
    item.key = index + 1;
    return item;
  });
};
const resetItem = () => {
  visible.value = false;
  item.channelId = null;
  item.channelName = "";
  item.channelNameEn = "";
}
getChannel();
</script>
