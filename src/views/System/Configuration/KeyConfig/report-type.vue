
<template>
  <div>
    <a-button type="primary" class="ml-3" @click="add">
      <plus-outlined />
      <span class="inline">New</span>
    </a-button>
  </div>
  <div class="mt-4">
    <a-table :columns="columns" :data-source="datas" bordered>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <a @click="edit(record)">Edit</a>
          <a-divider type="vertical" />
          <a-popconfirm title="确定删除该报告类型 ?" @confirm="dele(record)">
            <template #icon>
              <question-circle-outlined style="color: red" />
            </template>
            <a href="#">Delete</a>
          </a-popconfirm>
        </template>
      </template>
    </a-table>
    <Catagory ref="reportType" @refresh="getReport()" />
  </div>
</template>

<script>
export default {
  name: "reportType",
};
</script>

<script setup>
import { message } from "ant-design-vue";
import Catagory from "./components/report-box.vue";
const reportType = ref();
const datas = ref([]);
const columns = reactive([
  { title: "NO", dataIndex: "key", key: "key" },

  { title: "Report Type Name", dataIndex: "value", key: "value" },
  { title: "Action", dataIndex: "action", key: "action" },
]);
const getReport = async () => {

  const data = await api.queryDict({ type: "report_type" });
  datas.value = data.map((item, index) => {
    item.key = index + 1;
    return item;
  });

};
const add = () => {
  reportType.value.visible = true;
};
const edit = (record) => {
  reportType.value.visible = true;
  reportType.value.item.value = record.value;
  reportType.value.item.code = record.code;
};
const dele = async (record) => {
  await api.delDict({
    code: record.code,
    typeName: record.typeName,
    value: record.value,
  });
  message.success("删除成功");
  getReport();
};
getReport();
</script>
