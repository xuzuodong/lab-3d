import experimentApi from '../../api/experiment'

const state = () => ({
  experiments: null
})

const getters = {}

const mutations = {
  setExperiments(state, experiments) {
    state.experiments = experiments
  }
}

const actions = {
  selectAllExperiments({ commit }, { success, failure }) {
    experimentApi.selectAllExperiments({
      success(res) {
        if (res.status == 200 && res.data.code == 200) {
          commit('setExperiments', res.data.body)
          success(res.data.body)
        } else failure(res)
      },
      failure(res) {
        failure(res)
      }
    })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
