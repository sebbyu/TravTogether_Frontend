import { createStore } from 'vuex'
import {qanda} from '@/store/modules/qanda'
import {user} from '@/store/modules/user'
import {RootState} from '@/store/types'
import createPersistedState from 'vuex-persistedstate'

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
  },
  plugins: [createPersistedState()]
})
