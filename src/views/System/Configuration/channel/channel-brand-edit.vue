<template>
  <div>
    <a-modal
      :visible="show"
      title="编辑品牌渠道"
      @ok="handleOk"
      @cancel="handlecancel"
    >
      <a-form
        :model="item"
        :label-col="{ span: 6 }"
        :wrapper-col="{ span: 14 }"
      >
        <a-form-item label="BrandName">
          <a-input v-model:value="item.brandName" disabled></a-input>
        </a-form-item>
        <a-form-item label="Channel">
          <a-select
            v-model:value="item.brandChannelInfo"
            mode="multiple"
            :max-tag-count="1"
         
          >
            <a-select-option
              v-for="(item, index) in channelDetail"
              :key="index"
              :value="item.channelName"
            >
              {{ item.channelName }}
            </a-select-option>
          </a-select>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
export default {
  name: "channel-brand-edit",
};
</script>

<script setup>
import { message } from "ant-design-vue";
const emits = defineEmits(["refresh"]);
const show = ref(false);
const item = reactive({
  brandId: null,
  brandName: "",
  brandChannelInfo: [],
});
const channelList = ref([]);

const handleOk = async () => {
    item.brandChannelInfo.forEach((item) => {
    channelDetail.value.forEach((item1) => {
      if (item === item1.channelName) {
        channelList.value.push(item1.channelId);
      }
    });
  });
  await api.updBrandChannel({
    brandId: item.brandId,
    channelList: channelList.value.join(","),
  });
  emits("refresh");
  resetItem();
  message.success("编辑成功");
};
const handlecancel = () => {
  resetItem();
};
const channelDetail = ref([]);
defineExpose({
  show,
  item,
  channelDetail,
});
const resetItem = () => {
  show.value = false;
  item.brandChannelInfo = [];
  channelList.value = [];
  item.brandName = "";
};
</script>
