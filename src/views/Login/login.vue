<template>
  <div />
</template>

<script>
import { useStore } from 'vuex';
import { useRouter } from 'vue-router'
export default {
  name: 'HomeLayout',
};
</script>

<script setup>
const loginFn = async () => {
  let token;
  const store = useStore();
  const router = useRouter();
  if (window.location.hostname === "localhost") {
    // token = await api.getFutailToken();
    token = "8d7168ff-fc81-4835-a5c2-7cf681cf7be3"

  } else {
    token = router.query.token;
  }
  let data = await api.login({ token: token });
  store.commit("user/setToken", data);
  //   store.commit("user/setToken", data);
  router.replace({
    path: "/dashboard",
  });
}
loginFn();
</script>
