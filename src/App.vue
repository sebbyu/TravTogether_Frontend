<template lang='pug'>
#nav
  NavBar
  <router-view/>
</template>

<script lang='ts'>
import {defineComponent} from 'vue'
import NavBar from '@/components/NavBar.vue'
export default defineComponent({
  components: {
    NavBar,
  }

})
</script>

<style lang="stylus">
*
  background-color #eee;
  hr
    color rgb(235,246,226)
    margin 2% 5%
#app
  font-family Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
  color #2c3e50
  margin 0
</style>
