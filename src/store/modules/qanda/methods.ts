import {Getter, Mutation, Action} from '@/store/modules/qanda/types'
import axios from 'axios'

const QAURL = "http://127.0.0.1:8000/qandas/"

export const getters: Getter = {
  getQAs: state => state.QAs,

}

export const mutations: Mutation = {
  setQAs(state, QAs) {
    state.QAs = QAs
  }
}

export const actions: Action = {
  async postQuestion({dispatch}, question) {
    await axios.post(QAURL, question)
    .then(() => {
      dispatch('getQAs')
    })
    .catch(error => {
      console.log(error + " post question error")
    })
  },

  async getQAs({commit}) {
    await axios.get(QAURL)
    .then(response => {
      commit('setQAs', response.data)
    })
  },

}