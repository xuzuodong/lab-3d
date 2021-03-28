import Vue from 'vue'
import userApi from '../../api/user'

const state = () => ({
  userInfo: Vue.$cookies.get('userInfo'),
  classrooms: null
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
  },

  updateClassrooms(state, classrooms) {
    state.classrooms = classrooms
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
  },

  selectMyClasses({ commit }, { success, failure }) {
    userApi.selectMyClasses({
      success(res) {
        if (res.status == 200 && res.data.code == 200) {
          commit('updateClassrooms', res.data.body)
          success()
        } else failure(res)
      },
      failure(res) {
        failure(res)
      }
    })
  },

  joinClass({ commit }, { classCode, success, failure }) {
    userApi.joinClass({
      classCode,
      success(res) {
        if (res.status == 200 && res.data.code == 200) {
          commit('updateClassrooms', res.data.body)
          success()
        } else failure(res)
      },
      failure(res) {
        failure(res)
      }
    })
  },

  quitClass({ commit }, { classId, success, failure }) {
    userApi.quitClass({
      classId,
      success(res) {
        if (res.status == 200 && res.data.code == 200) {
          commit('updateClassrooms', res.data.body)
          success()
        } else failure(res)
      },
      failure(res) {
        failure(res)
      }
    })
  },

  createClass({ commit }, { classInfo, success, failure }) {
    userApi.createClass({
      classInfo,
      success(res) {
        if (res.status == 200 && res.data.code == 200) {
          success(res.data.body)
        } else failure(res)
      },
      failure(res) {
        failure(res)
      }
    })
  },

  deleteClass({ state, commit }, { classId, success, failure }) {
    userApi.deleteClass({
      classId,
      success(res) {
        if (res.status == 200 && res.data.code == 200) {
          // 找到 state 中该教室存在第几位，找到后使用 splice() 删除
          commit(
            'updateClassrooms',
            state.classrooms.filter((c) => c.id != classId)
          )
          success()
        } else failure(res)
      },
      failure(res) {
        failure(res)
      }
    })
  },

  updateClassInfo({ commit }, { classInfo, success, failure }) {
    userApi.updateClassInfo({
      classInfo,
      success(res) {
        if (res.status == 200 && res.data.code == 200) {
          success()
        } else failure(res)
      },
      failure(res) {
        failure(res)
      }
    })
  }
}

export default { namespaced: true, state, getters, actions, mutations }
