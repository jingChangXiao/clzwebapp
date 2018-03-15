const state = {
  loading: {
    flag: false,
    hidden: false
  },
  headers: {}
}
const getters = {
  getHeaders () {
    return state.headers
  }
}
const mutations = {
  toggleLoading (state, show = false) {
    state.loading.flag = show
  },
  resetLoading () {
    state.loading = {
      flag: false,
      hidden: false
    }
  },
  setHeaders (state, option = {}) {
    Object.assign(state.headers, option)
  }
}
const actions = {}
export default {
  state,
  getters,
  mutations,
  actions
}
