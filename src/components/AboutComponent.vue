<template lang='pug'>
.aboutcomponent
	.top-sec
		h1 About Us
	.mid-sec
		h2 What is TravBud
		p {{ aboutus }}
	.btm-dec
</template>



<script lang='ts'>
import {defineComponent} from 'vue'
export default defineComponent({
	name: "AboutComponent",
	props: {
		aboutus: String,
	},
})
</script>



<style lang='stylus' scoped>
.aboutcomponent
	.top-sec
		margin-left 0
	.mid-sec
		margin-left 100px
		h2
			text-align left
			margin-bottom 20px
		p	
			text-align left
</style>