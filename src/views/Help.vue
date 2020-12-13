<template lang='pug'>
.help
	HelpComponent
</template>

<script lang='ts'>
import {defineComponent} from 'vue'
import HelpComponent from '@/components/HelpComponent.vue'
export default defineComponent({
	name: "Help",
	components: {
		HelpComponent,
	}
})
</script>

<style lang='stylus' scoped>

</style>