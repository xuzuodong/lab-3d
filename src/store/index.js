import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import user from './modules/user'
import experiment from './modules/experiment'

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {},
  modules: { user, experiment }
})
