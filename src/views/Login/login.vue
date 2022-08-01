<template>
  <div />
</template>

<script>

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
    token = "17f5b1d7-60fe-4191-9d5c-3aaf3f5a2c5c"

  } else {
    token = router.query.token;
  }
  let data = await api.login({ token: token });
  store.commit("user/setToken", data);
  //   store.commit("user/setToken", data);
  router.replace({
    path: "/Layout/BrandDiscovery",
  });
}
loginFn();
</script>
