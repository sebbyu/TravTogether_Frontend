<template lang='pug'>
.homecomponent
	.top-sec
		h1 {{ title }}
		br
		h3 {{ subtitle }}
		img(src="@/assets/explore.png" alt="Explore Image")
	.mid-sec
	.btm-sec
		hr
		.creators
			h3 Creator
			h3 Developer
			h3 Partner

</template>

<script lang='ts'>
import {defineComponent} from 'vue'
export default defineComponent({
	name: "HomeComponent",
	props: {
		title: String,
		subtitle: String,
	}

})
</script>

<style lang='stylus' scoped>

</style>