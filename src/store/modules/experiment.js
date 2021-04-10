import experimentApi from '../../api/experiment'

const state = () => ({})

const getters = {}

const mutations = {}

const actions = {
  selectAllExperiments(context, { success, failure }) {
    experimentApi.selectAllExperiments({
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

  selectExperimentByAlias(context, { alias, success, failure }) {
    experimentApi.selectExperimentByAlias({
      alias,
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

  likeExperiment(context, { id, like, success, failure }) {
    experimentApi.likeExperiment({
      id,
      like,
      success(res) {
        if (res.status == 200 && res.data.code == 200) {
          success()
        } else failure(res)
      },
      failure(res) {
        failure(res)
      }
    })
  },

  selectChoiceQuestion(context, { experimentId, choiceType, success, failure }) {
    experimentApi.selectChoiceQuestion({
      experimentId,
      choiceType,
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

  submitTest(context, { choiceArray, experimentId,  success, failure }) {
    experimentApi.submitTest({
      choiceArray,
      experimentId,
      success(res) {
        if (res.status == 200 && res.data.code == 200) {
          success(res)
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
