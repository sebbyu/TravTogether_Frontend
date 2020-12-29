<template lang='pug'>
.navbar
	header
		.logo_bar
			router-link(to='/')
				img.logo(src='@/assets/TravTogether-logo.png' alt='Home-logo')
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
		.logged_in(v-if="isAuthenticated")
			h3 Welcome, 
			| {{ user.nickname }}
			br
			.buttons
				button(@click="account") Account
				button(@click="logout") Logout
		.login_bar(v-else)
			router-link(to='/login')
				button Login
</template>

<script lang='ts'>
import {defineComponent, computed} from 'vue'
import {useStore} from 'vuex'
import router from '@/router'
import firebase from 'firebase/app'
export default defineComponent({
	name: "NavBar",
	setup() {
		const store = useStore()
		const isAuthenticated = computed(() => store.getters['user/isAuthenticated'])
		const user = computed(() => store.getters['user/getUser'])
		const googleUser = computed(() => firebase.auth().currentUser)
// ============================================================================
		async function logout() {
			await store.dispatch('user/Logout')
			if (googleUser.value) {
				await firebase.auth().signOut()
				console.log("Logged out Google Account")
			}
			router.push('/login')
		}
// ============================================================================
		async function account() {
			await store.dispatch('user/RetrieveUser', user.value.slug)
			await router.push('/user/'+user.value.slug)
		}
// ============================================================================
		return {isAuthenticated,user,logout,account}
	}
})
</script>


<style lang='stylus' scoped>
.navbar
	header 
		display flex
		justify-content space-between
		align-items center
		padding 30px 5%
		.logo_bar
			.logo
				height 60px
				width 150px
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
				transition all 0.5s ease 0s
				&:hover
					background-color rgb(73,136,218)
		.logged_in
			font-weight bold
			h3
				margin 0
			.buttons
				button
					margin 2px
					font-weight bold
					font-size 12px
					color rgb(255,255,255)
					padding 5px
					background-color rgb(123,165,221)
					border none
					border-radius 50px
					cursor pointer
					transition all 0.5s ease 0s
					&:hover
						background-color rgb(73,136,218)

</style>