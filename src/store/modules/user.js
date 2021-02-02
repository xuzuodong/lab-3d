import Vue from 'vue'
import userApi from '../../api/user'

const state = () => ({
  userInfo: Vue.$cookies.get('userInfo')
})

const getters = {}

const mutations = {
  updateUserInfo(state, userInfo) {
    state.userInfo = userInfo
  }
}

const actions = {
  login({ commit }, { username, password, success, failure }) {
    userApi.login({
      username,
      password,
      success(res) {
        if (res.status == 200) {
          commit('updateUserInfo', res.data)
          success(res.data)
        } else failure(res)
      },
      failure(res) {
        failure(res)
      }
    })
  },

  register({ commit }, { username, password, userType, success, failure }) {
    userApi.login({
      username,
      password,
      userType,
      success(res) {
        if (res.status == 200) {
          commit('updateUserInfo', res.data)
          success(res.data)
        } else failure(res)
      },
      failure(res) {
        failure(res)
      }
    })
  }
}

export default { namespaced: true, state, getters, actions, mutations }
