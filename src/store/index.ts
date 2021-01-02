import { createStore } from 'vuex'
import {qanda} from '@/store/modules/qanda'
import {user} from '@/store/modules/user'
import {chat} from '@/store/modules/chat'
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
    chat,
  },
  plugins: [createPersistedState()]
})
