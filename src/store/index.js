import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    liquidType: 'acid'
  },
  mutations: {
    changeLiquid(state, type) {
      state.liquidType = type
    }
  },
  actions: {
  },
  modules: {
  }
})
