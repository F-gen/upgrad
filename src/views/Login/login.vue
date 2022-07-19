<template>
  <div @click="loginFn"> </div>
</template>

<script>
export default {
  name: 'HomeLayout',
};
</script>

<script setup>
const loginFn = async () => {
  let token;
  if (window.location.hostname === "localhost") {
    token = await api.getFutailToken();
  } else {
    token = this.$route.query.token;
  }
  let data = await api.login({ token: token });
  this.$store.commit("user/setToken", data);
  //   store.commit("user/setToken", data);
  this.$router.replace({
    path: "/dashboard",
  });
}
</script>
