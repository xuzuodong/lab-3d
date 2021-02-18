import Vue from 'vue'
import userApi from '../../api/user'

const state = () => ({
  userInfo: Vue.$cookies.get('userInfo')
})

const getters = {}

const mutations = {
  updateUserInfo(state, userInfo) {
    state.userInfo = userInfo
  },

  logout(state) {
    state.userInfo = null
    Vue.$cookies.remove('userInfo')
    window.location.reload()
  }
}

const actions = {
  login({ commit }, { username, password, success, failure }) {
    userApi.login({
      username,
      password,
      success(res) {
        if (res.status == 200 && res.data.code == 200) {
          commit('updateUserInfo', res.data.body)
          Vue.$cookies.set('userInfo', res.data.body)
          success(res.data.body)
        } else failure(res)
      },
      failure(res) {
        failure(res)
      }
    })
  },

  register({ commit }, { username, password, userType, success, failure }) {
    userApi.register({
      username,
      password,
      userType,
      success(res) {
        if (res.status == 200 && res.data.code == 200) {
          success(res.data.body)
        } else failure(res)
      },
      failure(res) {
        failure(res)
      }
    })
  }
}

export default { namespaced: true, state, getters, actions, mutations }
