const state = {
  loading: {
    flag: false
  },
  headers: {}
}
const getters = {}
const mutations = {
  toggleLoading (state, show = false) {
    state.loading.flag = show
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
