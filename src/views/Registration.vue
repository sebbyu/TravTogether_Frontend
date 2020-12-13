<template lang='pug'>
.registration
  RegistrationComponent
</template>

<script lang='ts'>
import {defineComponent} from 'vue'
import RegistrationComponent from "@/components/RegistrationComponent.vue"
export default defineComponent({
  name: "Registration",
  components: {
    RegistrationComponent,
  }
})
</script>

<style lang='stylus' scoped>

</style>