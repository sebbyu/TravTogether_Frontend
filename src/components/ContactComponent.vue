<template lang='pug'>
.contactcomponent
	.container
		.top-sec
			div(v-if="sent === true")
				p.alert.success 
					| Message is successfully sent.
			div(v-else-if="sent === false")
				p.alert.fail
					| There was some problem. Please try again.
			h1 Contact Us
		.mid-sec
			.input
				form(@submit.prevent="sendMessage")
					.name
						input(type='text' placeholder='Name' v-model="contactForm.name")
					.email
						div(v-if="isAuthenticated")
							input(type='email' placeholder='Email' v-model="user.email"
							disabled style="background-color:#d3d3d3")
						div(v-else)
							input(type='email' placeholder='Email' v-model="contactForm.fromEmail")
						p#email-msg
						| Please use a REAL email address so we can get back to you.
					.subject
						input(type='text' placeholder='Subject' v-model="contactForm.subject")
					.message
						textarea#message-msg(name='message-msg'
									cols='70'
									rows='15'
									placeholder='Message' v-model="contactForm.message")
					//- .send-a-copy
					//- 	input#send--copy(type='checkbox'
					//- 				name='send-a-copy'
					//- 				value='Send me a copy' v-model="contactForm.sendCopy")
					//- 	label(for='send-a-copy') Send me a copy
					.button
						button(type='submit') Send Message
	.btm-sec
		hr
		h3 Feel Like Talking?
		p
		|Contact :
		strong 123-456-7890
</template>



<script lang='ts'>
import {defineComponent, ref} from 'vue'
import {useStore} from 'vuex'
export default defineComponent({
	name: "ContactComponent",
	setup() {
		const store = useStore()
		const sent = ref()
		const isAuthenticated = store.getters['user/isAuthenticated']
		const user = store.getters['user/getUser']
// ============================================================================
		const contactForm = {
			name: "",
			fromEmail: "",
			subject: "",
			message: "",
			sendCopy: false,
		}
// ============================================================================
		async function sendMessage() {
			if (isAuthenticated){
					contactForm.fromEmail = user.email
				}
			if (contactForm.name && contactForm.subject && contactForm.message 
			&& contactForm.fromEmail) {
				try {
					await store.dispatch("user/sendMessage", contactForm)
					console.log("Message Sent")
					sent.value = true
					contactForm.name = ""
					contactForm.fromEmail = ""
					contactForm.subject = ""
					contactForm.message = ""
					contactForm.sendCopy = false
				} catch (error) {
					console.log(error.message)
					sent.value = false
				}
			} else {
				alert("Please fillout all the fields.")
			}
		}
// ============================================================================
		return {contactForm,sendMessage,sent,isAuthenticated,user}
	}
})
</script>



<style lang='stylus' scoped>
.contactcomponent
	.container
		box-shadow 1px 1px 10px 2px #DCD9D8
		padding 10px
		max-width 1000px
		margin auto
		.top-sec
			.alert
				font-weight bold
				padding 20px
			.success
				background-color #ADFF2F
			.fail
				background-color #FF0000
			p
				margin 40px
		.mid-sec
			margin-top 30px
			.input
				.name, .email, .subject, .message
					margin 15px 0
					#email-msg
						font-size 13px
					textarea
						background-color white
						text-align left
						border none
						border-radius 10px
						font-size 15px
					input
						width 450px
						height 30px	
						text-align left 
						font-size 15px
						background-color white
						border none
						border-radius 10px
				.button
					margin 35px
					button
						font-weight bold
						font-size 15px
						color white
						padding 9px 25px 
						border none
						border-radius 10px
						background-color rgb(123,165,221)
						cursor pointer
						transition 0.2 ease
						&:hover
							background-color rgb(73,136,218)
	.btm-sec
		margin 50px
		h3 
			padding 20px
		p
			margin 10px
</style>
