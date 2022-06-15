import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    active: Number(localStorage.getItem('active')) ?? 0
  },
  getters: {
  },
  mutations: {
    chagestate (state, payload) {
      localStorage.setItem('active', payload)
    }
  },
  actions: {

  },
  modules: {
  }
})
