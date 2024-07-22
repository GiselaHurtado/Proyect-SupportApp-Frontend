import { createStore } from 'vuex'

export default createStore({
  state: {
    requests: []
  },
  mutations: {
    ADD_REQUEST(state, request) {
      state.requests.push(request)
    },
    UPDATE_REQUEST(state, updatedRequest) {
      const index = state.requests.findIndex(r => r.id === updatedRequest.id)
      if (index !== -1) {
        state.requests[index] = updatedRequest
      }
    }
  },
  actions: {
    addRequest({ commit }, request) {
      commit('ADD_REQUEST', request)
    },
    updateRequest({ commit }, updatedRequest) {
      commit('UPDATE_REQUEST', updatedRequest)
    }
  },
  getters: {
    getAllRequests: (state) => state.requests,
    getRequestById: (state) => (id) => state.requests.find(request => request.id === id)
  }
})
