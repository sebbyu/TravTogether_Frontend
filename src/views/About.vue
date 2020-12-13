<template lang='pug'>
.about
  AboutComponent(
    :aboutus="aboutus"
  )
  MissionComponent(
    :mission1="mission1"
    :textbox1="textbox1"
    :mission2="mission2"
    :textbox2="textbox2"
    :mission3="mission3"
    :textbox3="textbox3"
  )
</template>

<script lang='ts'>
import {defineComponent} from 'vue'
import AboutComponent from '@/components/AboutComponent.vue'
import MissionComponent from '@/components/MissionComponent.vue'
export default defineComponent({
  name: "About",
  components: {
    AboutComponent,
    MissionComponent,
  },
  setup() {
    const aboutus = "- hello world"
    const mission1 = "Advanture"
    const mission2 = "Friendship"
    const mission3 = "Safe Trip"
    const textbox1 = "We connect adventurers together"
    const textbox2 = "We want all the adventurers stay away from loneliness"
    const textbox3 = "We make sure the new adventurers you meet is ..."
    return {aboutus,mission1,mission2,mission3,textbox1,textbox2,textbox3}
  }
})
</script>

<style lang='stylus' scoped>

</style>