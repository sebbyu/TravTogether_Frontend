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
              | {{ chat.created }}
        .msgs
          .msg_history#msg_history
            .msg#msg(v-for="(msg, msgIndex) in messages" :key="msgIndex")
              | {{ msg }}
          .type_msg
            form.input_msg_write(@submit.prevent="sendChat")
              input.write_msg(type='text' placeholder='Type a message' 
              v-model="messageForm.newText"
              :class="{'disabled': selected === 0, 'active': selected !== 0}")
              button.msg_send_btn(type="submit"
              :class="{'disabled': selected === 0, 'active': selected !== 0}") Enter
    .buttons
      button.button(@click="invite") Invite +
      button.button(@click="goBack") Exit
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
    const chats = computed(() => store.getters['chat/getChats'])
    const chat = computed(() => store.getters['chat/getChat'])
    const selected = ref(0)
    const messages = ref()
    const chatSocket = store.getters['chat/getChannelSocket']
// ============================================================================
    const messageForm = reactive({
      chatId: 0,
      newText: "",
      userNickname: user.nickname, 
    })
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
      messageForm.chatId = c.id
      selected.value = c.id
      messages.value = c.messages
      store.commit("chat/setChat", c)
      await store.dispatch("chat/GetWebSocket", c.id)
      await router.push("/chat/"+c.id)
      scrollDown()
    }
// ============================================================================
    function sendChat() {
      if (messageForm.newText != "") {
        try {
          store.dispatch("chat/SendChat", messageForm)
          // await store.dispatch("chat/sSendChat", messageForm)
          // await store.dispatch("chat/sSendChat", messageForm)
          // chat.value = chats.value.find(
          //   (chat: Chat) => chat.id===messageForm.chatId)
          // messages.value = chat.value.messages
          messageForm.newText = ""
          // await setInterval(() => {
          //   scrollDown(),
          //   5000
          // })
          scrollDown()
        } catch(error) {
          console.log(error.message)
        }
      }
    }
// ============================================================================
// ============================================================================
// ============================================================================
// ============================================================================
    return {user,chats,chat,selected,messages,messageForm,
    goBack,setChat,sendChat,chatSocket,scrollDown}
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
        .msg_history
          background-color #f5f5f5
          height 516px
          overflow-y auto
          .msg
            border 1px solid black
            float left
            margin 10px
            width 50%
            border-radius 20px
            padding 12px
            position relative
            text-align center
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