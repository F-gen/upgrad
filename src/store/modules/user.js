export default {
  state: () => ({
    name: "eureka"

  }),
  getter: {},
  mutations: {
    setName(state, payload) {
      state.name = payload
    }
  },
  actions: {
    saveName({ commit }, data) {
      commit('setName', data)
    }
  }
}
