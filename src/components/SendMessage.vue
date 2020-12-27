<template lang='pug'>
.sendmessage
  .header
    h3.title Send Message
  .mid-sec
    .to-box
      label(for="to") To:
      input.email-input(type="text" name="to")
    .from-box
      label(for="from") From:
      input.email-input(type="text" name="from")
    .title-box
      label(for="from") Title:
      input.title-input(type="text" name="from")
    .message-box
      textarea(cols="100" rows="25" placeholder="messsage...")
    button.buttons Send
    button.buttons(@click="goBack") Cancel
</template>

<script lang='ts'>
import {defineComponent} from 'vue'
import router from '@/router'
import {useStore} from 'vuex'
export default defineComponent({
  name: "SendMessage",
  setup() {
    const store = useStore()
    function goBack() {
      router.go(-1)
    }
    return {goBack,}
  }
})
</script>

<style lang='stylus' scoped>
.sendmessage
  max-width 800px
  margin auto
  .header
    padding 0
  .mid-sec
    box-shadow 3px 3px 5px 2px #5f5f5f
    padding 20px
    .to-box, .from-box
      padding 5px
      margin-right 200px
      font-weight bold
      margin-bottom 10px
      .email-input
        border none
        width 80%
        &:focus
          outline none
    .title-box
      font-weight bold
      .title-input
        width 600px
        border none
        border-bottom 1px solid grey
        margin 50px 10px
        &:focus
          outline none
    .message-box
    .buttons
      cursor pointer
      font-size 17px
      margin 10px
</style>