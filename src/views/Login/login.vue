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
    token = "f5e4c27c-b66b-4c82-9af0-e354eba1ddc9";
  } else {
    token = router.query.token;
  }
  let data = await api.login({ token: token });

  store.commit("user/setToken", data);
  await api.saveAuthorizationInfo({ token: token });

  router.replace({
    path: "/Layout/BrandNewsHome/",
  });
}
loginFn();
</script>
