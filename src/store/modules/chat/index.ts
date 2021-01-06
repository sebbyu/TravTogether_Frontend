import {State, Module} from '@/store/modules/chat/types'
import {getters, mutations, actions} from '@/store/modules/chat/methods'

export const state: State = {
  chat: null,
  chats: [],
  channelSocket: null,
  newText: "",
}


export const chat: Module = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}