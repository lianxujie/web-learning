export default {
  namespaced: true,
  state () {
    return {
      // 个人权证相关
      userInfo: {
        token: '',
        userId: ''
      }
    }
  },
  mutations: {
    // 所有mutation的第一个参数都是state
    setUserInfo (state, obj) {
      state.userInfo = obj
    }
  },
  actions: {},
  getters: {}
}
