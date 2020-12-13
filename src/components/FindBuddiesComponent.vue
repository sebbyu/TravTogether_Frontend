<template lang='pug'>
.findbuddiescomponent
	.top-sec
		h1 Search Buddies
		.categories
			p Country
			p State
			p City
			p Name
		.search
			input#search-box(type='search' 
						name='search-box'
						placeholder='Search')
			img(src='@/assets/search-logo.png' alt='search-logo')
	.mid-sec
		.results
			.user
	.btm-sec
</template>

<script lang='ts'>
import {defineComponent} from 'vue'
export default defineComponent({
	name: "FindBuddiesComponent",

})
</script>

<style lang='stylus' scoped>
.findbuddiescomponent
	.top-sec
		.categories
			display flex
			justify-content center
			.selected
				color white
				background-clip rgb(123,165,221)
			p
				cursor pointer
				font-weight bold
				padding 7px
				margin 43px
				color rgb(123,165,221)
				border none
				border-radius 30px
				transition 0.2s ease
				&:hover
					color white
					background-clip rgb(123,165,221)
		.search
			display flex
			justify-content center
			input
				text-align left
				border none
				border-bottom 1px solid rgb(92,94,95)
				width 800px
				font-size 17px
			img
				height 40px
				padding-left 10px
				cursor pointer
</style>