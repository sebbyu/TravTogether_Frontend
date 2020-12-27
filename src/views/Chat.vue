<template lang='pug'>
.chat
  Chatroom
</template>

<script lang='ts'>
import {defineComponent} from 'vue'
import Chatroom from '@/components/Chatroom.vue'
export default defineComponent({
  name: "Chat",
  components: {
    Chatroom,
  }
})
</script>

<style lang='stylus' scoped>

</style>