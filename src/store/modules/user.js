
import { getSession, setSession } from "../../utils/auth.js";
const state = {
  userName: getSession("userName"),
  token: getSession("token"),
  roles: [],
};
const mutations = {
  setToken: (state, data) => {
    state.userName = data.userInfo.userName;
    state.token = data.token;

    setSession("token", data.token);
    setSession("userName", JSON.stringify(data.userInfo.userName));
  },
};

const actions = {};

export default {
  namespaced: true,
  actions,
  state,
  mutations,
};
