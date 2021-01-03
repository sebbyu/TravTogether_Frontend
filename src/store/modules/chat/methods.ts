import {Getter, Mutation, Action} from '@/store/modules/chat/types'
import axios from 'axios'
import {state as userState} from '@/store/modules/user/index'

const CHATSURL = "http://127.0.0.1:8000/chats/"
const MSGSURL = "http://127.0.0.1:8000/messages/"


export const getters: Getter = {
  getChats: state => state.chats,
// =====================================================
  getChat: state => state.chat,
// =====================================================
// =====================================================
// =====================================================
// =====================================================
// =====================================================
// =====================================================
// =====================================================
}



export const mutations: Mutation = {
  setChats(state, chats) {
    state.chats = chats
  },
// =====================================================
  setChat(state, chat) {
    state.chat = chat
  },
// =====================================================
// =====================================================
// =====================================================
// =====================================================
// =====================================================
// =====================================================
// =====================================================
}



export const actions: Action = {
  async GetChats({commit}) {
    try {
      const response = await axios.get(CHATSURL)
      commit("setChats", response.data)
    } catch (error) {
      console.log(error.message + " ERROR SENDING MESSAGE")
    }
  },
// =====================================================
  async GetChat({commit}, chatId) {
    try {
      const response = await axios.get(CHATSURL+chatId+'/')
      commit("setChat", response.data)
    } catch(error) {
      console.log(error.message)
    }
  },
// =====================================================
  async SendChat({dispatch}, form) {
    const msgForm = new FormData()
    msgForm.append("chatId", form.chatId)
    msgForm.append("newText", form.newText)
    if (userState.user) {
      msgForm.append("userNickname", userState.user.nickname)
    }
    try {
      await axios.post(MSGSURL, msgForm)
      await dispatch("GetChats")
    } catch(error) {
      console.log(error.message)
    }
  }
// =====================================================
// =====================================================
// =====================================================
// =====================================================
// =====================================================
// =====================================================
// =====================================================
}