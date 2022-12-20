/*
 * @Author: jack.hai
 * @Date: 2022-03-06 18:35:00
LastEditTime: 2022-08-26 18:22:05
 * @Description:
 */
import { getSession, setSession, resoveDynRoute, removeSession } from "@/utils/auth";
import BasicRoute from "@/router/BasicRoute";
import { Store } from "vuex";
import { message } from 'ant-design-vue';



// import { resetRouter } from "@/router/index";
const state = {
  userName: getSession("userName"),
  token: getSession("token"),
  name: getSession("name"),
  routes: [],
  roleId: null,
  btnNameList: [],
  routerNameList: [],
  // setRoleToken:'',
};
const mutations = {
  setToken: (state, data) => {
    localStorage.setItem("name", data?.userInfo.name ? JSON.stringify(data.userInfo.name) : null);
    localStorage.setItem("email", data?.userInfo.name ? JSON.stringify(data?.userInfo.email) : null);
    // state.userName = data.userInfo.username;
    // state.token = data.token;

    setSession("name", data?.userInfo.name ? JSON.stringify(data.userInfo.name) : null);
    setSession("token", data.token);
    setSession("email", data?.userInfo.email ? JSON.stringify(data.userInfo.email) : null);
    setSession("userName", data?.userInfo.username ? JSON.stringify(data.userInfo.username) : null);

  },
  setRoles: (state, data) => {
    state.roleId = data;
  },
  // setRoleToken: (state, data) => {
  //   state.setRoleToken = data;
  // },
  setRoute: (state, data) => {
    state.routes = data;

  },
  routerNameList: (state, data) => {
    state.routerNameList = data;

  },
  setbtnNameList: (state, data) => {
    state.btnNameList = data
    // setSession('btnNameList',JSON.stringify(data))
  },

};

const actions = {
  getRoutByRole: async (context) => {
    if (getSession('userName')) {
      console.log("存在");
    } else {
      this.$router.push('/login')
      console.log("去login");
    }
    const data = await api.getUserList({
      userNameEn: JSON.parse(getSession("userName")),
    });
    if (data.result.list == null || data.result.list == undefined) {

      message.warning('暂无权限，请联系管理员开通')
      setTimeout(() => {
        location.href = process.env.VUE_APP_BASE_LOGIN;
      }, 800);

    }
    context.commit("setRoles", data.result.list[0].roleType);
    // context.commit('setBrandIdList', data.result.list[0].brandIdList)
    // context.commit('setBrandNameList', data.result.list[0].brandNameList)
    const { result } = await api.getRoleKeyList({
      roleId: data.result.list[0].roleType
    })
    context.commit("setbtnNameList", result.btnNameList)
    context.commit("routerNameList", result.routerNameList)
    // 处理baseRoute 与 角色菜单  生成动态路由
    let endRoute = resoveDynRoute(BasicRoute, result.routerNameList)
    context.commit("setRoute", endRoute);
    return endRoute;
  },
  resetToken: (context) => {
    removeSession("token");
    removeSession("name");
    // resetRouter();
  },
};



export default {
  namespaced: true,
  actions,
  state,
  mutations,
};
