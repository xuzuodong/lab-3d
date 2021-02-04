import { FlyCameraKeyboardInput } from '@babylonjs/core'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isAddIndicater: false
  },
  mutations: {
    addSwitch(state, flag) {
      state.isAddIndicater = flag
    }
  },
  actions: {
  },
  modules: {
  }
})
