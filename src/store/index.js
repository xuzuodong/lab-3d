import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import user from './modules/user'
import experiment from './modules/experiment'

export default new Vuex.Store({
  state: {
    isAddIndicater: false,
    liquidType: 'acid'
  },
  mutations: {
    changeLiquid(state, type) {
      state.liquidType = type
    },
    addSwitch(state, flag) {
      state.isAddIndicater = flag
    }
  },
  actions: {},
  modules: { user, experiment }
})
