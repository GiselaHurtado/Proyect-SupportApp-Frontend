import { createStore } from 'vuex'

export default createStore({
  state: {
    requests: []
  },
  mutations: {
    ADD_REQUEST(state, request) {
      state.requests.push(request)
    }
  },
  actions: {
    addRequest({ commit }, request) {
      commit('ADD_REQUEST', request)
    }
  },
  getters: {
    getAllRequests: (state) => state.requests
  }
})