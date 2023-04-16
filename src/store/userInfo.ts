const uInfoLocal = localStorage.getItem('uInfo')
const uInfo = uInfoLocal && JSON.parse(uInfoLocal)
const state = {
  ...uInfo
}

const getters = {}

const mutations = {
  setUInfo(state:any, info:any) {
    console.log('info----', info)
    state.id = info.id
    state.userName = info.userName
  }
}

const actions = {}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}