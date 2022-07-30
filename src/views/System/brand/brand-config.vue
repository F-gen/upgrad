<template>
  <div class="w-full h-full">
    <div>
      <a-form layout="inline">
        <a-form-item class="w-50">
          <a-select v-model:value="searchText" show-search placeholder="Select a person" :filter-option="false"
            :show-arrow="false" @search="SearchBrand" @blur="getBrandAgain">
            <a-select-option v-for="item, index in BrandItems" :key="index" :value="item">
              {{ item }}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item>
          <a-button type="primary" @click="onSearch">
            <template #icon>
              <SearchOutlined />
            </template>
            Search
          </a-button>
          <a-button type="primary" class="ml-3" @click="reset">
            <template #icon>
              <undo-outlined />
            </template>
            Reset
          </a-button>
          <a-button type="primary" class="ml-3" @click="add">
            <template #icon>
              <plus-outlined />
            </template>
            New
          </a-button>
        </a-form-item>
      </a-form>
    </div>
    <div>
      <a-table :columns="columns" :data-source="tableDATA" bordered />
    </div>
  </div>
</template>

<script>
export default {
  name: 'BrandConfig',
};
</script>

<script setup>

const BrandItems = ref([])
const BackupBrandItems = ref([])
const columns = ref([])
const tableDATA = ref([])
const searchText = ref('')
const SearchBrand = (value) => {
  let timer
  if (timer) clearTimeout(this.timer);
  timer = setTimeout(async () => {
    BrandItems.value = await api.queryAllBrandName({ keyword: value, });
    clearTimeout(timer);
  }, 500);
}
const getBrandAgain = () => {
  BrandItems.value = BackupBrandItems.value
}
const Allbrand = async () => {
  const data = await api.queryAllBrandName()
  BrandItems.value = data
  BackupBrandItems.value = data
}
Allbrand()
const onSearch = () => {

}
const reset = () => {

}
const add = () => {

}
</script>
<style lang="less" scoped>
</style>
