<template lang='pug'>
.user
  UserDetail

</template>

<script lang='ts'>
import {defineComponent} from 'vue'
import UserDetail from '@/components/UserDetail.vue'
export default defineComponent({
  name: "User",
  components: {
    UserDetail,
  }

})
</script>

<style lang='stylus' scoped>

</style>