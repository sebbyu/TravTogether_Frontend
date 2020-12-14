<template lang='pug'>
.contactcomponent
	.top-sec
		h1 Contact Us
	.mid-sec
		.input
			form
				.name
					input(type='text' placeholder='Name')
				.email
					input(type='email' placeholder='Email')
					p#email-msg
					| Please use a REAL email address so we can get back to you.
				.subject
					input(type='text' placeholder='Subject')
				.message
					textarea#message-msg(name='message-msg'
								cols='70'
								rows='15'
								placeholder='Message')
				.send-a-copy
					input#send--copy(type='checkbox'
								name='send-a-copy'
								value='Send me a copy')
					label(for='send-a-copy') Send me a copy
		.button
			button Send Message
	.btm-sec
		hr
		h3 Feel Like Talking?
		p
		|Contact :
		strong 123-456-7890
</template>

<script lang='ts'>
import {defineComponent} from 'vue'
export default defineComponent({

})
</script>

<style lang='stylus' scoped>
.contactcomponent
	.top-sec
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
