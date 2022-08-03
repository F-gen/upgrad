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
    token = "6b43be52-eb55-4ec0-91b7-b2522b948997"

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
