import {Getter, Mutation, Action} from '@/store/modules/chat/types'
import axios from 'axios'
import {Message} from '@/store/modules/chat/types'

const CHATSURL = "http://127.0.0.1:8000/chats/"
const MSGSURL = "http://127.0.0.1:8000/messages/"
const WEBSOCKETURL = "ws://127.0.0.1:8000/ws/chatroom/"


export const getters: Getter = {
  getChats: state => state.chats,
// =====================================================
  getChat: state => state.chat,
// =====================================================
  getChannelSocket: state => state.channelSocket,
// =====================================================
  getNewText: state => state.newText,
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
  setNewText(state, newText) {
    state.newText = newText
  },
// =====================================================
  setWebSocket(state, chatId) {
    state.channelSocket = new WebSocket(WEBSOCKETURL+chatId+'/')
  },
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
  async sSendChat({dispatch}, form) {
    const msgForm = new FormData()
    msgForm.append("chatId", form.chatId)
    msgForm.append("newText", form.newText)
    msgForm.append("userNickname", form.userNickname)
    try {
      await axios.post(MSGSURL, msgForm)
      await dispatch("GetChats")
    } catch(error) {
      console.log(error.message)
    }
  },
// =====================================================
  GetWebSocket({dispatch, commit}, chatId) {
    commit('setWebSocket', chatId)
    dispatch("GetWebSocketEvents", chatId)
  },
// =====================================================
  GetWebSocketEvents({commit, dispatch, state}, chatId) {
    if (state.channelSocket) {
      state.channelSocket.onopen = () => {
        console.log(`Chatroom-${chatId} Connection Established.`)
      }
      state.channelSocket.onmessage = (event) => {
        const parsed = JSON.parse(event.data)
        commit("setNewText", JSON.parse(event.data)['newText'])
        const newMessage = {
          user: parsed['userNickname'],
          text: parsed['newText'],
          created: new Date().toString()
        } as Message
        dispatch("AddNewMessage", newMessage)
      }
      state.channelSocket.onerror = (event) => {
        console.log("WebSocket Error " + event)
      },
      state.channelSocket.onclose = () => {
        console.error('Chat socket closed unexpectedly')
      }
    }
  },
// =====================================================
  SendChat({state}, form) {
    state.channelSocket?.send(JSON.stringify({'userNickname': form.userNickname,
    'newText': form.newText}))
  },
// =====================================================
  AddNewMessage({state}, newMessage) {
    state.chat?.messages.push(newMessage)
  }
// =====================================================
// =====================================================
// =====================================================
// =====================================================
// =====================================================
}