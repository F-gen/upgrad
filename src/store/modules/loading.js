const state = {
  requestCount: 0,
  spinning: false,
};

const mutations = {
  setSpining: (state, data) => {
    state.spinning = data;
  },
};
export default {
  namespaced: true,
  state,
  mutations,
};
