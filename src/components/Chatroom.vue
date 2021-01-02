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
            @click="setMessages(chat.messages)")
              | {{ chat.title }}
              br
              | {{ chat.created }}
        .msgs
          .msg_history
            .msg(v-for="(msg, msgIndex) in messages" :key="msgIndex")
              | {{ msg }}
          .type_msg
            .input_msg_write
              input.write_msg(type='text' placeholder='Type a message')
              button.msg_send_btn Enter
    .buttons
      button.button Invite +
      button.button(@click="goBack") Exit
  .logged-out(v-else)
    LoginComponent
</template>



<script lang='ts'>
import {defineComponent, computed, ref} from 'vue'
import router from '@/router'
import {useStore} from 'vuex'
import LoginComponent from '@/components/LoginComponent.vue'
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
    const messages = ref()
// ============================================================================
    function goBack() {
      router.go(-1)
    }
// ============================================================================
    function setMessages(msgs: Array<string>) {
      messages.value = msgs
    }
// ============================================================================
// ============================================================================
// ============================================================================
// ============================================================================
// ============================================================================
    return {goBack,user,chats,messages,setMessages}
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
            background-color #FFD700
            border 1px solid black
            margin 2px
            height 70px
            display flex
            justify-content center
            align-items center
            font-weight bold
            cursor pointer
            transition: 0.3s ease
            &:hover
              transform: scale(0.9)
      .msgs
        float right
        padding 30px 15px 0 25px
        width 60%
        .msg_history
          background-color #f5f5f5
          height 516px
          overflow-y auto
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