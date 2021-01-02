import {State, Module} from '@/store/modules/chat/types'
import {getters, mutations, actions} from '@/store/modules/chat/methods'

export const state: State = {
  chats: [],
}


export const chat: Module = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}