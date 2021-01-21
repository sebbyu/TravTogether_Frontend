<template lang='pug'>
.UserList
  userProfileBox
</template>

<script lang='ts'>
import {defineComponent} from 'vue'
import UserProfileBox from '@/components/UserProfileBox.vue'
export default defineComponent({
  name: "UserList",
  components: {
    UserProfileBox,
  }
})
</script>

<style lang='stylus' scoped>

</style>