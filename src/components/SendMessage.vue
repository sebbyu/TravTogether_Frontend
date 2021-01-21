<template lang='pug'>
.sendmessage
  .login-page(v-if="!user")
    LoginComponent
  .logged-in(v-else)
    div(v-if="sent === true")
      p.alert.success 
        | Message is successfully sent.
    div(v-else-if="sent === false")
      p.alert.fail
        | There was some problem. Please try again.
    .blureffect
    .header
      h3.title Send Message
      img.logo(src="@/assets/send-message-logo.png")
    .mid-sec
      .to-box
        label(for="to") To:
        input.email-input(type="text" name="to" 
        :value="retrievedUser.nickname" disabled)
      .from-box
        label(for="from") From:
        input.email-input(type="text" name="from" 
        :value="user.nickname" disabled)
      .title-box
        label(for="from") Title:
        input.title-input(type="text" name="from" 
        v-model="messageForm.subject")
      .message-box
        textarea.message(cols="100" rows="25" placeholder="messsage..."
        v-model="messageForm.message")
      .buttons
        button.button(@click="sendMessage") Send
        button.button(@click="goBack") Cancel
</template>

<script lang='ts'>
import {defineComponent, computed, ref} from 'vue'
import router from '@/router'
import {useStore} from 'vuex'
import LoginComponent from '@/components/LoginComponent.vue'
export default defineComponent({
  name: "SendMessage",
  components: {
    LoginComponent,
  },
  setup() {
    const store = useStore()
    const user = store.getters['user/getUser']
    const retrievedUser = computed(() => store.getters['user/getRetrievedUser'])
    const sent = ref()
// ============================================================================
    const messageForm = {
      sender: user.nickname,
      receiver: retrievedUser.value.nickname,
      subject: "",
      message: "",
    }
// ============================================================================
    function goBack() {
      router.go(-1)
    }
// ============================================================================
    async function sendMessage() {
      try {
        await store.dispatch('user/SendMessage', messageForm)
        sent.value = true
        console.log("message sent")
        messageForm.subject = ""
        messageForm.message = ""

      } catch(error) {
        sent.value = false
        console.log("message failed")
      }
    }
// ============================================================================
// ============================================================================
// ============================================================================
    return {goBack,user,sent,retrievedUser,sendMessage,messageForm}
  }
})
</script>

<style lang='stylus' scoped>
.sendmessage
  max-width 800px
  margin auto
  .logged-in
    .alert
      font-weight bold
      padding 20px
    .success
      background-color #ADFF2F
    .fail
      background-color #FF0000
    p
      margin 40px
    // -webkit-filter blur(8px)
    .header
      display flex
      justify-content center
      padding 0
      .logo
        height 40px
        width 40px
        margin-left 20px
    .mid-sec
      box-shadow 3px 3px 5px 2px #5f5f5f
      padding 20px
      .to-box, .from-box
        padding 5px
        margin-right 200px
        font-weight bold
        margin-bottom 10px
        font-size 20px
        .email-input
          font-weight bolder
          font-style italic
          color darkgrey
          border none
          width 80%
          font-size 20px
          margin-left 10px
          &:focus
            outline none
      .title-box
        font-weight bold
        font-size 20px
        .title-input
          background-color #f5f5f5
          width 600px
          height 30px
          font-size 20px
          border none
          border-bottom 1px solid grey
          margin 50px 10px
          &:focus
            outline none
      .message-box
        .message
          background-color white
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