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
    token = "0c6fdc60-0730-40bf-9b05-f8f75bf27866"

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
