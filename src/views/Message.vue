<template lang='pug'>
.message
  SendMessage
</template>

<script lang='ts'>
import {defineComponent} from 'vue'
import SendMessage from '@/components/SendMessage.vue'
export default defineComponent({
  name: "Message",
  components: {
    SendMessage,
  }
})
</script>

<style lang='stylus' scoped>

</style>