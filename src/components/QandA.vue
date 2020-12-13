<template lang='pug'>
.qanda
	.question
		.q-logo
			img(src="@/assets/question-logo.png" alt="question-logo")
		.q-text
			p {{ question }}
		.dropdown-button(@click='clickAnswerDropdown')
			img(src="@/assets/dropdown-button.png" alt="dropdown-button")
	.answer
		.a-logo
			img(src="@/assets/light-bulb-logo.png" alt="light-bulb-logo")
		.a-text
			h3 {{ answer }}
</template>

<script lang='ts'>
import {defineComponent} from 'vue'
export default defineComponent({
	name: "QandA",
	props: {
		question: String,
		answer: String,
	},
	setup() {
		let answered = false
		const clickAnswerDropdown = () => {
			answered = !answered
		}
		return {answered, clickAnswerDropdown}
	}

})
</script>

<style lang='stylus' scoped>

</style>