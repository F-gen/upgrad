<template>
  <div>
    {{ value1 }}
  </div>
</template>

<script>
export default {
  name: 'BrandConfig',
};
</script>

<script setup>
const value1 = ref("")
const Allbrand = async () => {
  const value = await api.queryAllBrandName()
  console.log(value);
  value1.value = value[0]
}
Allbrand()
</script>
