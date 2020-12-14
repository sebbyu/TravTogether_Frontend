<template lang='pug'>
.navbar
	header
		.logo_bar
			router-link(to='/')
				img(src='@/assets/home-logo.png' alt='Home-logo')
		.nav_bar
			nav
				ul.nav_ul
					router-link(to='/') Home
					|  | 
					router-link(to='/about') About
					|  | 
					router-link(to='/findbuddies') Find Buddies
					|  | 
					router-link(to='/help') Help
					|  | 
					router-link(to='/contact') Contact Us
		.login_bar
			router-link(to='/login')
				button Login
</template>

<script lang='ts'>
import {defineComponent} from 'vue'
export default defineComponent({
	name: "NavBar",

})
</script>

<style lang='stylus' scoped>
.navbar
	header 
		display flex
		justify-content space-between
		align-items center
		padding 30px 10%

		.logo_bar
			img
				height 130px
				width auto
				curosr pointer
		.nav_bar
			nav
				min-width  700px
				.nav_ul
					a
						color: #2c3e50
						font-weight bold
						padding 0 30px
						font-size 16px
						text-decoration none
						transition: 0.2s ease
						&:hover
							color rgb(123,165,221)
						&.router-link-exact-active
							color rgb(123, 165,221)
		.login_bar
			button 
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