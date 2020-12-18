import {Getter, Mutation, Action} from '@/store/modules/qanda/types'
import axios from 'axios'

const QAURL = "http://127.0.0.1:8000/questions/"

export const getters: Getter = {
  getQAs: state => state.QAs,

}

export const mutations: Mutation = {
  setQAs(state, QAs) {
    state.QAs = QAs
  }
}

export const actions: Action = {
  async PostQuestion({dispatch}, question) {
    await axios.post(QAURL, question)
    .then(() => {
      dispatch('GetQAs')
    })
    .catch(error => {
      console.log(error + " post question error")
    })
  },

  GetQAs({commit}) {
    axios.get(QAURL)
    .then(response => {
      commit('setQAs', response.data)
    }).catch(error => {
			console.log(error + " getQAs error")
		})
  },

}