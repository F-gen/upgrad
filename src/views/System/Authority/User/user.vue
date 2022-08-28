<template>
  <div class="page">
    <div>
      <a-radio-group :value="comName" button-style="solid" @change="change">
        <a-radio-button value="User"> 用户管理 </a-radio-button>
        <a-radio-button value="Role"> 角色管理 </a-radio-button>
      </a-radio-group>
    </div>
    <div>
      <component :is="componentList[componentId]"></component>
    </div>
  </div>
</template>

<script>
import Role from "./components/role.vue";
import User from "./components/user-config.vue";
export default {
  name: 'auth-user',
};
let componentList = {
  Role,
  User
}
</script>

<script setup>
const comName = ref('User')
const componentId = ref('User')
const change = (e) => {
  comName.value = e.target.value
  componentId.value = e.target.value
}
</script>
<style scoped lang="scss">
.page {
  padding: 16px;
  background-color: #f1f2f6;
  height: 100%;
}

</style>
