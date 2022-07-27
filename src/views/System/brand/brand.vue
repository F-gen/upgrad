<template>
  <div />
</template>

<script>
export default {
  name: 'BrandConfig',
};
</script>

<script setup>
const Allbrand = async () => {
 const data= await api.queryAllBrandName()
 console.log(data);

}
Allbrand()
</script>
