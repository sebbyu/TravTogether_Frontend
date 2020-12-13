<template lang='pug'>
.missioncomponent
	.top-sec
		h1 Our Mission
	.mid-sec
		.missions
			div
				img(src='@/assets/about-page-cover2.png' alt='travel image')
				h2 {{ mission1 }}
				p {{ textbox1 }}
			div
				img(src="@/assets/about-page-cover3.png" alt="travel image")
				h2 {{ mission3 }}
				p {{ textbox3 }}
			div
				img(src='@/assets/about-page-cover4.png' alt='travel image')
				h2 {{ mission2 }}
				p {{ textbox2 }}
	.btm-sec
		button Join Our Adventure
		p OR
		button Find Buddies
		hr
</template>

<script lang='ts'>
import {defineComponent} from 'vue'
export default defineComponent({
	name: "MissionComponent",
	props: {
		mission1: String,
		mission2: String,
		mission3: String,
		textbox1: String,
		textbox2: String,
		textbox3: String,
	}
})
</script>

<style lang='stylus' scoped>
.missioncomponent
	.top-sec
	.mid-sec
		.missions
			display flex
			justify-content space-between
			margin: 0 8%;
			img
				width 200px
				height 150px
				margin 30px 0
	.btm-sec
		margin: 5% 0
		p 
			margin 20px 0
			color rgb(146, 146, 146)
			font-size 15px
		button
			cursor pointer
			padding 9px 25px
			font-weight bold
			color white
			background-color rgb(123, 165,221)
			border none
			border-radius 10px
			transition 0.2s ease
			&:hover
				background-color rgb(73,136,218)
</style>