import { createStore } from 'vuex'
import {qanda} from '@/store/modules/qanda'
import {RootState} from '@/store/types'


export default createStore<RootState>({
  state: {
		rootState: "",
  },
  mutations: {
  },
  actions: {
  },
  modules: {
		qanda,
  }
})
