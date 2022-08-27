
const getters = {
  spinning: (state) => state.loading.spinning,
  name: (state) => state.user.userName,
  token: (state) => state.user.token,
  email: (state) => state.user.email,
  roleId: (state) => state.user.roleId,
  routes: (state) => state.user.routes,
  btnNameList: (state) => state.user.btnNameList,
  routerNameList: (state) => state.user.routerNameList,
};
export default getters;
