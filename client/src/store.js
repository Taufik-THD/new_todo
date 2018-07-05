import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    allTodo: null,
    today: null,
    formAdd: false
  },
  mutations: {
    allTodo (state, getTodo) {
      state.allTodo = getTodo
    },
    today (state, getTodo) {
      state.today = getTodo
    },
    formAdd (state, formOn) {
      state.formAdd = true
    }
  },
  actions: {
    getTodo ({ commit }, payload) {
      axios({
        method: 'post',
        url: 'http://35.240.145.166/todo',
        data: {
          token: payload
        }
      }).then(response => {
        const dataToday = []
        const date = new Date()
        response.data.forEach(val => {
          if (val.deadline === String(date.toUTCString().slice(5, 16).split(' ').join('-'))) {
            dataToday.push(val)
          }
        })
        commit('today', dataToday)
        commit('allTodo', response.data)
      }).catch(err => {
        console.log(err)
      })
    },
    formOn ({ commit }, payload) {
      commit('formAdd')
    }
  }
})
