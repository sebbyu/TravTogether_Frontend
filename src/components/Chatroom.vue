<template lang='pug'>
.container
  .logged-in(v-if='user')
    .header
      h3.text-center Chatroom
      img(src="@/assets/chat-logo.png")
    .messaging
      .inbox_msg
        .inbox_people
          .headind_srch
            .recent_heading
              h4 Recent
            .srch_bar
              .stylish-input-group
                input.search-bar(type='text' placeholder='Search')
          .inbox_chat
            .chatroom(v-for="(chat, index) in chats" :key="index"
            @click="setChat(chat)" 
            :class="{'selected': selected === chat.id, 'notSelected': selected !== chat.id}")
              | {{ chat.title }}
              br
              | {{ chat.created.split('T')[0] }}
              br
        .msgs
          .users#users(v-if="chat")
            .totalNum
              | Users - ({{ chat.users.length }})
            .user(v-for="(user, idx) in chat.users")
              | {{ user }}, 
          .msg_history#msg_history
            .msg#msg(v-for="(msg, msgIndex) in messages" :key="msgIndex"
            :class="{'me': msg.user == user.nickname}")
              .element
                .text {{ msg.text }}
                .created {{ msg.created.split('T')[0] }}
          .type_msg
            form.input_msg_write(@submit.prevent="sendChat")
              input.write_msg(type='text' placeholder='Type a message' 
              v-model="messageForm.newText"
              :class="{'disabled': selected === 0, 'active': selected !== 0}")
              button.msg_send_btn(type="submit"
              :class="{'disabled': selected === 0, 'active': selected !== 0}") Enter
    .buttons
      button.button(@click="creatingChat = !creatingChat") Create Chat +
      .createChat(v-if="creatingChat")
        form.form(@submit.prevent="createChat")
          input.input(type="text" placeholder="title..." v-model="newChatForm.title")
          button.button(type="submit") create
          button.button(@click="creatingChat = false") cancel
      button.button(v-if="creatingChat == false && chat" @click="invite") Invite +
      button.button(v-if="creatingChat == false" @click="goBack") Exit
  .logged-out(v-else)
    LoginComponent
</template>



<script lang='ts'>
import {defineComponent, reactive, computed, ref} from 'vue'
import router from '@/router'
import {useStore} from 'vuex'
import LoginComponent from '@/components/LoginComponent.vue'
import {Chat} from '@/store/modules/chat/types'
export default defineComponent({
  name: "Chatroom",
  components: {
    LoginComponent,
  },
  setup() {
    const store = useStore()
    const user = store.getters['user/getUser']
    store.dispatch("chat/GetChats")
    const allChats = computed(() => store.getters['chat/getChats'])
    const chats = ref(allChats.value.filter((chat: Chat) => chat.users.includes(user.nickname)))
    const chat = ref()
    const selected = ref(0)
    const messages = ref()
    const chatSocket = store.getters['chat/getChannelSocket']
    const creatingChat = ref(false)
// ============================================================================
    const messageForm = reactive({
      chatId: 0,
      newText: "",
      userNickname: "", 
    })
    const newChatForm = {
      title: "",
      user: "",
     }
// ============================================================================
    function goBack() {
      router.go(-1)
    }
// ============================================================================
    function scrollDown() {
      const element = document.getElementById("msg_history")
      if (element) {
        setTimeout(function() {
          element.scrollTop = element.scrollHeight},
          100)
      }
    }
// ============================================================================
    async function setChat(c: Chat) {
      chat.value = c
      messageForm.chatId = c.id
      selected.value = c.id
      messages.value = c.messages
      store.dispatch("chat/GetWebSocket", c.id)
      store.commit('chat/setChat', c)
      router.push("/chat/"+c.id)
      
      scrollDown()
    }
// ============================================================================
    function sendChat() {
      if (messageForm.newText != "") {
        messageForm.userNickname = user.nickname
        try {
          store.dispatch("chat/SendChat", messageForm)
          messageForm.newText = ""
        } catch(error) {
          console.log(error.message)
        }
      }
    }
// ============================================================================
    async function createChat() {
      if (newChatForm.title != "") {
        newChatForm.user = user.nickname
        try {
          await store.dispatch("chat/CreateChat", newChatForm)
          creatingChat.value = false
          chats.value = allChats.value.filter((chat: Chat) => chat.users.includes(user.nickname))
        } catch(error) {
          console.log(error.message)
        }
      }
    }
// ============================================================================
    async function invite() {
      router.push('/users/')
    }
// ============================================================================
// ============================================================================
    return {user,allChats,chats,chat,selected,messages,messageForm,
    goBack,setChat,sendChat,chatSocket,scrollDown,createChat,creatingChat,
    newChatForm,invite}
  }
})
</script>



<style lang="stylus" scoped>
.container
  max-width 1170px
  margin auto
  .header
    display flex
    justify-content center
    img
      height 40px
      width 40px
      margin-left 20px
  .messaging
    box-shadow 2px 2px 15px 5px #f0f8ff
    .inbox_msg
      border 3px solid #f8f8ff
      clear both
      overflow hidden
      .inbox_people
        background #f8f8f8 none repeat scroll 0 0
        overflow hidden
        float left
        width 36%
        border-right 1px solid #c4c4c4
        .headind_srch
          padding 10px 29px 10px 20px
          overflow hidden
          border-bottom 1px solid #c4c4c4
          .recent_heading
            float left 
            width 20%
            h4
              color #05728f
              font-size 21px
              margin auto
          .srch_bar
            display inline-block
            text-align right
            width 80%
            .stylish-input-group
              .search-bar
                border 1px solid #cdcdcd
                border-width 0 0 1px 0
                width 80%
                padding 2px 0 4px 6px
                background none
                outline none
        .inbox_chat
          height 550px
          overflow-y scroll
          background-color #f5f5f5
          .chatroom
            background-color white
            box-shadow 1px 1px 8px 1px #999
            margin 1px 0
            height 70px
            display flex
            justify-content center
            align-items center
            font-weight bold
            cursor pointer
            transition: 0.3s ease
            &:hover
              transform: scale(0.9)
          .selected
            background-color yellow
          .notSelected
            background-color white
      .msgs
        float right
        padding 30px 15px 0 25px
        width 60%
        .users
          font-weight bold
          font-size 15px
          .totalNum
            display flex
          .user
            display inline
            padding-right 2em
            word-break break-all
        .msg_history
          background-color #f5f5f5
          height 516px
          overflow-y auto
          .msg
            display flex
            word-break break-all
            border 1px solid black
            margin 10px
            width 50%
            border-radius 20px
            padding 12px
            justify-content center
            .element
              justify-content center
              .text
                font-weight bold
          .me
            float right
        .type_msg
          border-top 1px solid #c4c4c4
          position relative
          .input_msg_write
            background-color white
            display flex
            .write_msg
              background rgba(0,0,0,0) none repeat scroll 0 0
              border medium none
              color #4c4c4c
              font-size 15px
              min-height 48px
              width 100%
              &:focus
                outline none
            .msg_send_btn
              background #05728f none repeat scroll 0 0
              border none 
              color #fff
              cursor pointer
              font-size 17px
              font-weight bold
            .disabled
              pointer-events none
              background-color #D3D3D3
  .buttons
    .createChat
      .form
        .input
          background-color white
    .button
      cursor pointer
      font-size 17px
      margin 20px
      border-radius 10px
      border none
      box-shadow -3px 3px 10px 5px #f8f8ff
      padding 5px 10px
      font-weight bold
      color #708090
      transition 0.3s ease
      &:hover
        box-shadow -3px 3px 10px 15px #dcdcdc
</style>