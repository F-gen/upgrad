<!--
 * @Author: eureka fugen1999@163.com
 * @Date: 2022-07-31 08:51:20
 * @LastEditors: eureka
 * @LastEditTime: 2022-08-04 13:34:55
 * @FilePath: \upgrad-main\src\views\System\brand\brand-catagory.vue
 * @Description: 
 * 
 * Copyright (c) 2022 by eureka, All Rights Reserved. 
-->
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
          <a-popconfirm title="确定删除该类型 ?" @confirm="dele(record)">
            <template #icon>
              <question-circle-outlined style="color: red" />
            </template>
            <a href="#">Delete</a>
          </a-popconfirm>
        </template>
      </template>
    </a-table>
    <Catagory ref="catagoryref" @refresh="getCategory()" />
  </div>
</template>

<script>
export default {
  name: "Catagory",
};
</script>

<script setup>
import { message } from "ant-design-vue";
import Catagory from "./components/catagory-box.vue";
const catagoryref = ref();
const datas = ref([]);
const columns = reactive([
  { title: "NO", dataIndex: "key", key: "key" },

  { title: "Category Name", dataIndex: "value", key: "value" },
  { title: "Action", dataIndex: "action", key: "action" },
]);
const getCategory = async () => {

  const data = await api.queryDict({ type: "brand_type" });
  datas.value = data.map((item, index) => {
    item.key = index + 1;
    return item;
  });

};
const add = () => {
  catagoryref.value.visible = true;
};
const edit = (record) => {
  catagoryref.value.visible = true;
  catagoryref.value.item.value = record.value;
  catagoryref.value.item.code = record.code;
};
const dele = async (record) => {
  await api.delDict({
    code: record.code,
    typeName: record.typeName,
    value: record.value,
  });
  message.success("删除成功");
  getCategory();
};
getCategory();
</script>
<style scoped lang="scss">
.mt-4{
  margin-top: 16px;
}
.ml-3{
  margin-left: 12px;
}



</style>
