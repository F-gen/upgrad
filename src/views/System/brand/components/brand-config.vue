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
          <a-button type="primary">
            <template #icon>
              <SearchOutlined />
            </template>
            Search
          </a-button>
        </a-form-item>
      </a-form>
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
const searchText = ref('')
const SearchBrand = () => {

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
</script>
<style lang="less" scoped>
</style>
