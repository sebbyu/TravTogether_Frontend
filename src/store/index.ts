import { createStore } from 'vuex'
import {qanda} from '@/store/modules/qanda'
import {user} from '@/store/modules/user'
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
    user,
  }
})
