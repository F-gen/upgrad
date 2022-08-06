
<template>
  <a-modal :visible="visible" :title="item.id == null ? '新增采集字' : '编辑采集字'" @ok="handleOk" @cancel="handleCancel">
    <a-form ref="ruleForm" autocomplete="off" :model="item" :label-col="{ span: 6 }" :wrapper-col="{ span: 14 }">
      <a-form-item label="Brand Name">
        <a-select v-model:value="item.brandName" :disabled="item.id ? true : false" show-search @search="handleSearch"
          @change="handleChangebrand">
          <a-select-option v-for="item in BrandItems" :key="item" :value="item">
            {{ item }}
          </a-select-option>
        </a-select>
      </a-form-item>

      <a-form-item label="Industry" name="showIndustry" :rules="[
        {
          required: true,
          message: 'Industry 不能为空',
          trigger: 'change',
        },
      ]">
        <a-select v-model:value="item.showIndustry" show-arrow mode="multiple" :max-tag-count="1" @change="changeInd">
          <a-select-option v-for="item in industrydata" :key="item.indId" :value="item.indName">
            {{ item.indName }}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="Keyword" name="keyword" :rules="[
        {
          required: true,
          message: 'Keyword 不能为空',
          trigger: 'change',
        },
      ]">
        <a-input v-model:value="item.keyword" />
      </a-form-item>
      <a-form-item label="Report Type" name="reportType" :rules="[
        {
          required: true,
          message: 'Report Type 不能为空',
          trigger: 'change',
        },
      ]">
        <a-select v-model:value="item.reportType" allow-clear show-arrow @change="changeReport">
          <a-select-option v-for="item in reportTypedata" :key="item.code" :value="item.value">
            {{ item.value }}
          </a-select-option>
        </a-select>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
export default {
  name: "KeywordConfigBox",
};
</script>

<script setup>
import { message } from "ant-design-vue";
let visible = ref(false);
let item = reactive({
  showIndustry: [],
  reportType: null,
  brandId: null,
  id: null,
  brandName: "",
  industryId: "",
  keyword: "",
  must: null,
  reportTypeId: null,
});
const ruleForm = ref();
const industrydata = ref([])
const reportTypedata = ref([])
const BrandItems = ref([])
const emits = defineEmits(["refresh"]);
const props = defineProps({
  industry: {
    type: Array,
    default: () => [],
  },
  reportType: {
    type: Array,
    default: () => [],
  },

});
const handleSearch = (value) => {
  let timer;
  if (timer) clearTimeout(this.timer);
  timer = setTimeout(async () => {
    BrandItems.value = await api.queryAllBrandName({ keyword: value });
    clearTimeout(timer);
  }, 1000);
}
const handleChangebrand = async (value) => {
  const brandDetail = await api.queryBrand({
    keyword: value,
  });
  item.brandId = brandDetail[0].brandId;
  console.log(item.brandId);
}
const changeInd = () => {
  let tempid = [];
  item.showIndustry.forEach((item) => {
    var temp = industrydata.value.find((val) => item === val.indName);
    tempid.push(temp.indId + "");
  });
  item.industryId = tempid.join(",");
}
const changeReport = () => {
  reportTypedata.value.forEach((val) => {
    if (val.value === item.reportType) {
      item.reportTypeId = val.code;
    }
  })
}
watchEffect(() => {
  if (props.industry) {
    industrydata.value = props.industry;
    reportTypedata.value = props.reportType;
  }
});
defineExpose({
  visible,
  item,
  BrandItems
});

const handleOk = async () => {

  await ruleForm.value.validate();
  if (item.id == null) {
    let data = await api.insBrandWord(
      {
        must: false,
        brandId: item.brandId,
        industryId: item.industryId,
        keyword: item.keyword,
        reportTypeId: item.reportTypeId,
      },
    );
    if (data) {
      message.warning(data.message);
    } else {
      message.success("新增成功");
    }
    resetItem();
    emits("refresh");

  } else {
    let data = await api.updBrandKeyword({
      brandId: item.brandId,
      must: item.must,
      id: item.id,
      industryId: item.industryId,
      keyword: item.keyword,
      reportTypeId: item.reportTypeId
    });
    if (data) {
      message.warning(data.message);
    } else {
      message.success("编辑成功");
    }
    resetItem();
    emits("refresh");

  }

};
const handleCancel = () => {
  ruleForm.value.resetFields();
  resetItem();
};
const resetItem = () => {
  visible.value = false;
  item.brandId = null;
  item.industryId = "";
  item.keyword = "";
  item.reportTypeId = null;
  item.must = null;
  item.reportType = null;
  item.showIndustry = [];
  item.id = null
  item.brandName = ""


}
</script>
