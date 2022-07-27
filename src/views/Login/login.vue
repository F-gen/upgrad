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
    token = "74358c62-08ca-45c5-b37e-15c54efb19f4"

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
