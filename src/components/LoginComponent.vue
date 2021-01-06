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
					form(@submit.prevent="submit")
						input(type='email' placeholder='Email'
									v-model="loginForm.email")
						br
						input(type='password' placeholder='Password'
									v-model="loginForm.password")
						.forgot-password
							span forgot password?
						.error(v-if="loginError")
							p You email of your password is invalid.
							| Please Try Again.
						.login-button
							button(type='submit') Login
						.social-media-signin
							p Sign in with
							img(src="@/assets/google-logo.png" @click="googleSignin")
			.btm-sec
				hr
				p OR
				router-link(to='/registration') Register
		.right
</template>



<script lang='ts'>
import {defineComponent, computed, ref} from 'vue'
import {useStore} from 'vuex'
import router from '@/router'
import firebase from 'firebase/app'
import 'firebase/auth'
export default defineComponent({
	name: "LoginComponent",
	setup() {
		const store = useStore()
		const loginError = ref(false)
		const isAuthenticated = computed(() => store.getters['user/isAuthenticated'])
// ============================================================================
		const loginForm = {
			email: "",
			password: "",
		}
// ============================================================================
		async function submit() {
			try {
				await store.dispatch('user/Login', loginForm)
				if (isAuthenticated.value) {
					router.push('/')
					loginError.value = false
				} else {
					loginError.value = true
				}
			} catch (error) {
				loginError.value = true
				console.log("ERROR LOGGING IN")
			}
		}
// ============================================================================
		async function googleSignin() {
			const provider = new firebase.auth.GoogleAuthProvider()
			try {
				await firebase.auth().signInWithPopup(provider)
				console.log("Logged in with google account")
				const googleUser = firebase.auth().currentUser
				if (googleUser) {
					let password = ""
					if (googleUser.email) {
						password = googleUser.email.split('@')[0]
					}

					const newUserForm = {
						email: googleUser.email,
						nickname: googleUser.displayName,
						age: "",
						ethnicity: "",
						gender: "",
						location: "",
						fromFirebase: true,
						password: password,
					}
					try {
						await store.dispatch('user/RegisterNewUser', newUserForm)
						const tempForm = new FormData()
						if (newUserForm.email) {
							tempForm.append('email', newUserForm.email)
						}
						await store.dispatch('user/GetUser', tempForm)
						await router.replace('/')
					} catch(error) {
							const tempForm = new FormData()
							if (newUserForm.email) {
								tempForm.append('email', newUserForm.email)
							}
							await store.dispatch('user/GetUser', tempForm)
							await router.replace('/')
						}
				} 
			} catch (error) {
				console.log(error.message)
			}
		}
		return {loginForm,submit,loginError,googleSignin,}
	},
})
</script>



<style lang='stylus' scoped>
.logincomponent
	box-shadow 1px 1px 10px 2px #DCD9D8
	padding 30px
	max-width 500px
	margin auto
	button, a
		text-decoration none
		border none
		font-weight bold
		border-radius 10px
		cursor pointer
		padding 5px 10px
		color rgb(255,255,255)
		background-color rgb(123,165,221)
		transition: 0.2s ease
		&:hover
			background-color rgb(79,137,212)
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
				.error
					color red
				.login-button
					margin 15px
				.social-media-signin
					display flex 
					justify-content center
					align-items center
					p
						font-weight bold
						font-size 20px
						padding-right 10px
					img
						width 40px
						height 40px
						margin 5px
						cursor pointer
						transition 0.3s ease
						&:hover
							transform scale(1.2)
		.btm-sec
			p
				margin 20px 0
				color rgb(146, 146, 146)
				font-size 15px
</style>