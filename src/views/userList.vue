<template lang='pug'>
.userList
  userProfileBox
</template>

<script lang='ts'>
import {defineComponent} from 'vue'
import userProfileBox from '@/components/userProfileBox.vue'
export default defineComponent({
  name: "userList",
  components: {
    userProfileBox,
  }
})
</script>

<style lang='stylus' scoped>

</style>