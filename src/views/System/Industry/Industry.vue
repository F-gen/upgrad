<!--
 * @Author: eureka fugen1999@163.com
 * @Date: 2022-07-31 08:51:20
 * @LastEditors: eureka
 * @LastEditTime: 2022-08-04 15:39:47
 * @FilePath: \upgrad-main\src\views\System\Industry\Industry.vue
 * @Description: 
 * 
 * Copyright (c) 2022 by eureka, All Rights Reserved. 
-->
<template>
  <div class="bg-[#f0f2f5] w-full box-border p-6">
    <div class="bg-[#fff] p-6">
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
              <a-popconfirm title="确定删除该行业 ?" @confirm="dele(record)">
                <template #icon>
                  <question-circle-outlined style="color: red" />
                </template>
                <a href="#">Delete</a>
              </a-popconfirm>
            </template>
          </template>
        </a-table>
      </div>
      <a-modal :visible="visible" :title="item.indId == null ? '新增行业' : '编辑行业'" centered @ok="handleOk"
        @cancel="handleCancel">
        <a-form ref="ruleForm" :model="item" :label-col="{ span: 6 }" :wrapper-col="{ span: 14 }">
          <a-form-item label="Industry Name" name="indName" :rules="[
            {
              required: true,
              message: 'Industry Name 不能为空',
              trigger: 'blur',
            },
          ]">
            <a-input v-model:value="item.indName" />
          </a-form-item>
          <a-form-item label="Industry Eng Name">
            <a-input v-model:value="item.indNameEn" />
          </a-form-item>
        </a-form>
      </a-modal>
    </div>
  </div>
</template>

<script>
export default {
  name: "Industry",
};
</script>

<script setup>
import { message } from "ant-design-vue";
const columns = reactive([
  { title: "NO", dataIndex: "key", key: "key" },
  { title: "Industry Name", dataIndex: "indName", key: "indName" },
  { title: "Industry Eng Name", dataIndex: "indNameEn", key: "indNameEn" },
  { title: "Action", dataIndex: "action", key: "action" },
]);

const datas = ref([]);
const visible = ref(false);
const item = reactive({
  indId: null,
  indName: "",
  indNameEn: "",
});
const ruleForm = ref();
const edit = (record) => {
  visible.value = true;
  item.indId = record.indId;
  item.indName = record.indName;
  item.indNameEn = record.indNameEn;
};
const dele = async (record) => {
  await api.delInd({
    indId: record.indId,
  });
  getIndustry();
  message.success("删除成功");
};
const add = () => {
  visible.value = true;
};
const handleOk = async () => {
  await ruleForm.value.validate();
  if (item.indId == null) {
    await api.insIndInfo([{ ...item }]);
    resetItem();
    getIndustry();
    message.success("新增成功");
  } else {
    await api.updIndInfo({ ...item });
    resetItem();
    getIndustry();
    message.success("编辑成功");
  }
  
};
const handleCancel = () => {
 ruleForm.value.resetFields();
resetItem()
};
const getIndustry = async () => {
  const data = await api.queryInd();
  datas.value = data.map((item, index) => {
    item.key = index + 1;
    return item;
  });
};
const resetItem=() => {
    visible.value = false;
  item.indId = null;
  item.indName = "";
  item.indNameEn = "";
}
getIndustry();
</script>
