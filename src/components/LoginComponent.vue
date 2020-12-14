<template lang='pug'>
.logincomponent
	.row
		.left
		.mid
			.top-sec
				.logo
					img(src="@/assets/travel.png" alt="travel-logo")
				.label
					h1 Login
			.mid-sec
				.form
					form(@submit="submit")
						input(type='email' placeholder='Email')
						br
						input(type='password' placeholder='Password')
				.forgot-password
					span forgot password?
				.login-button
					button(@click='submit') Login
			.btm-sec
				hr
				p OR
				router-link(to='/registration') Register
		.right
</template>

<script lang='ts'>
import {defineComponent} from 'vue'
export default defineComponent({

})
</script>

<style lang='stylus' scoped>
.logincomponent
	button, a
		text-decoration none
		font-weight bold
		border-radius 10px
		cursor pointer
		padding 5px 10px
		color rgb(255,255,255)
		background-color rgb(123,165,221)
		transition: 0.2s ease
		&:hover
			background-color rgb(79,137,212)
	margin 50px 0
	.row
		.top-sec
			.logo
				img
					height 100px
					width auto
		.mid-sec
			.form
				input
					margin 5px
					font-size 15px
					text-align left
					background-color white
					width 300px
					height 30px
					border none 
					border-radius 10px
			.forgot-password
				font-size 13 px
				margin-left 200px
				span
					cursor pointer
			.login-button
				margin 15px
		.btm-sec
			p
				margin 10px 0
				color rgb(146, 146, 146)
				font-size 15px
</style>