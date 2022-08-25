import Vue from 'vue'
import userApi from '../../api/user'

const state = () => ({
  userInfo: Vue.$cookies.get('userInfo'),
  classrooms: null,
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
  },
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
      },
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
      },
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
      },
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
      },
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
      },
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
      },
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
      },
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
      },
    })
  },

  recordTestTime({ commit }, { experimentId, testName, time, success, failure }) {
    userApi.recordTestTime({
      experimentId,
      testName,
      time,

      success(res) {
        if (res.status == 200 && res.data.code == 200) {
          success(res)
        } else failure(res)
      },
      failure(res) {
        failure(res)
      },
    })
  },

  selectKexperimentByClass({ commit }, { classId, success, failure }) {
    userApi.selectKexperimentByClass({
      classId,
      success(res) {
        if (res.status == 200 && res.data.code == 200) {
          success(res.data.body)
        } else failure(res)
      },
      failure(res) {
        failure(res)
      },
    })
  },

  startExperiment({ commit }, { experimentId, success, failure }) {
    userApi.startExperiment({
      experimentId,
      success(res) {
        if (res.status == 200 && res.data.code == 200) {
          success(res.data.body)
        } else failure(res)
      },
      failure(res) {
        failure(res)
      },
    })
  },

  getClassById({ commit }, { classId, success, failure }) {
    userApi.getClassById({
      classId,
      success(res) {
        if (res.status == 200 && res.data.code == 200) {
          success(res.data.body)
        } else failure(res)
      },
      failure(res) {
        failure(res)
      },
    })
  },

  removeUser({ commit }, { userId, classId, success, failure }) {
    userApi.removeUser({
      userId,
      classId,
      success(res) {
        if (res.status == 200 && res.data.code == 200) {
          success(res)
        } else failure(res)
      },
      failure(res) {
        failure(res)
      },
    })
  },

  submitBehavior(
    { commit },
    { kexperimentId, name, type, content, isCorrect, correctContent, success, failure }
  ) {
    userApi.submitBehavior({
      kexperimentId,
      name,
      type,
      content,
      correctContent,
      isCorrect,
      success(res) {
        if (res.status == 200 && res.data.code == 200) {
          success(res)
        } else failure(res)
      },
      failure(res) {
        failure(res)
      },
    })
  },

  selectMyKexperiment({ commit }, { success, failure }) {
    userApi.selectMyKexperiment({
      success(res) {
        if (res.status == 200 && res.data.code == 200) {
          success(res.data.body)
        } else failure(res)
      },
      failure(res) {
        failure(res)
      },
    })
  },

  finishKexperiment({ commit }, { kexperimentId, success, failure }) {
    userApi.finishKexperiment({
      kexperimentId,
      success(res) {
        if (res.status == 200 && res.data.code == 200) {
          success(res)
        } else failure(res)
      },
      failure(res) {
        failure(res)
      },
    })
  },

  getKexperimentEvaluation({ commit }, { kexperimentId, success, failure }) {
    userApi.getKexperimentEvaluation({
      kexperimentId,
      success(res) {
        if (res.status == 200 && res.data.code == 200) {
          success(res.data.body)
        } else failure(res)
      },
      failure(res) {
        failure(res)
      },
    })
  },

  getUserInfo({ commit }, { success, failure }) {
    userApi.getUserInfo({
      success(res) {
        if (res.status == 200 && res.data.code == 200) {
          success(res.data.body)
        } else failure(res)
      },
      failure(res) {
        failure(res)
      },
    })
  },

  updateUserInfo({ commit }, { passWord, phoneNumber, realName, sex, grade, school, success, slogan, failure }) {
    userApi.updateUserInfo({
      passWord,
      phoneNumber,
      realName,
      sex,
      grade,
      school,
      slogan,
      success(res) {
        if (res.status == 200 && res.data.code == 200) {
          success(res)
        } else failure(res)
      },
      failure(res) {
        failure(res)
      },
    })
  },

  getEquipment({ commit }, { experimentId, success, failure }) {
    userApi.getEquipment({
      experimentId,
      success(res) {
        if (res.status == 200 && res.data.code == 200) {
          success(res.data.body)
        } else failure(res)
      },
      failure(res) {
        failure(res)
      },
    })
  },

  getStreamingDomainName({ commit }, { kexperimentId, success, failure }) {
    userApi.getStreamingDomainName({
      kexperimentId,
      success(res) {
        if (res.status == 200 && res.data.code == 200) {
          success(res.data.body)
        } else failure(res)
      },
      failure(res) {
        failure(res)
      },
    })
  },

  getRealExperimentEvaluation({ commit }, { kexperimentId, success, failure }) {
    userApi.getRealExperimentEvaluation({
      kexperimentId,
      success(res) {
        if (res.status == 200 && res.data.code == 200) {
          success(res.data.body)
        } else failure(res)
      },
      failure(res) {
        failure(res)
      },
    })
  },

  submitRealExperimentPosttest({ commit }, { kexperimentId, choiceArray, success, failure }) {
    userApi.submitRealExperimentPosttest({
      kexperimentId,
      choiceArray,
      success(res) {
        if (res.status == 200 && res.data.code == 200) {
          success(res.data.body)
        } else failure(res)
      },
      failure(res) {
        failure(res)
      },
    })
  },

  startNewMemo({ commit }, { memo_content, success, failure }) {
    userApi.startNewMemo({
      memo_content,
      success(res) {
        if (res.status == 200 && res.data.code == 200) {
          success(res.data.body)
        } else failure(res)
      },
      failure(res) {
        failure(res)
      },
    })
  },

  deleteMemoById({ commit }, { memo_id, success, failure }) {
    userApi.deleteMemoById({
      memo_id,
      success(res) {
        if (res.status == 200 && res.data.code == 200) {
          success(res.data.body)
        } else failure(res)
      },
      failure(res) {
        failure(res)
      },
    })
  },

  getUserMemoById({ commit }, { success, failure }) {
    userApi.getUserMemoById({
      success(res) {
        if (res.status == 200 && res.data.code == 200) {
          success(res.data.body)
        } else failure(res)
      },
      failure(res) {
        failure(res)
      },
    })
  },

  getKexperimentNumOfExperimentName({ commit }, { success, failure }) {
    userApi.getKexperimentNumOfExperimentName({
      success(res) {
        if (res.status == 200 && res.data.code == 200) {
          success(res.data.body)
        } else failure(res)
      },
      failure(res) {
        failure(res)
      },
    })
  },

  getAvgScore({ commit }, { success, failure }) {
    userApi.getAvgScore({
      success(res) {
        if (res.status == 200 && res.data.code == 200) {
          success(res.data.body)
        } else failure(res)
      },
      failure(res) {
        failure(res)
      },
    })
  },

  getAvgTotalTime({ commit }, { success, failure }) {
    userApi.getAvgTotalTime({
      success(res) {
        if (res.status == 200 && res.data.code == 200) {
          success(res.data.body)
        } else failure(res)
      },
      failure(res) {
        failure(res)
      },
    })
  },

  getPostNumOfUser({ commit }, { success, failure }) {
    userApi.getPostNumOfUser({
      success(res) {
        if (res.status == 200 && res.data.code == 200) {
          success(res.data.body)
        } else failure(res)
      },
      failure(res) {
        failure(res)
      },
    })
  },

  getSubScoreByTitle({ commit }, { title, success, failure }) {
    userApi.getSubScoreByTitle({
      title,
      success(res) {
        if (res.status == 200 && res.data.code == 200) {
          success(res.data.body)
        } else failure(res)
      },
      failure(res) {
        failure(res)
      },
    })
  },

  getStepInfo({ commit }, { stepName, kexperiment_id, success, failure }) {
    userApi.getStepInfo({
      stepName,
      kexperiment_id,
      success(res) {
        if (res.status == 200 && res.data.code == 200) {
          success(res.data.body)
        } else failure(res)
      },
      failure(res) {
        failure(res)
      },
    })
  },

  submitStepInfo({ commit }, { kexperiment_id, stepName, stepTime, stepInfo, success, failure }) {
    userApi.submitStepInfo({
      kexperiment_id,
      stepName,
      stepTime,
      stepInfo,
      success(res) {
        if (res.status == 200 && res.data.code == 200) {
          success(res.data.body)
        } else failure(res)
      },
      failure(res) {
        failure(res)
      },
    })
  },
}

export default { namespaced: true, state, getters, actions, mutations }
