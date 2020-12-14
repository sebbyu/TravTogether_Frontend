<template lang='pug'>
.helpcomponent
	.top-sec
		h1 Need Help?
	.mid-sec
		h2 FAQs
		.questions
			.question(v-for='(qanda, index) in qandas' :key='index')
				QandA
	.btm-sec
		hr
		h2 Need More Help?
		router-link(to='/contact')
			button Contact Us
</template>

<script lang='ts'>
import {defineComponent} from 'vue'
import QandA from '@/components/QandA.vue'
export default defineComponent({
	name: "HelpPage",
	components: {
		QandA,
	}
})
</script>

<style lang='stylus' scoped>
.helpcomponent
	.top-sec
		margin-bottom 3%
	.mid-sec
		h2
			margin 20px
	.btm-sec
		button
			margin 30px
			font-weight bold
			font-size 15px
			color rgb(255,255,255)
			padding 9px 30px 
			background-color rgb(123,165,221)
			border none
			border-radius 50px
			cursor pointer
			transition all 0.2s ease 0s
			&:hover
				background-color rgb(73,136,218)
</style>