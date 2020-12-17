<template lang='pug'>
.qanda
	.question
		.q-logo
			img(src="@/assets/question-logo.png" alt="question-logo")
		.q-text
			h3 {{ question }}
		.dropdown-button(@click='answerQuestion')
			img(src="@/assets/dropdown-button.png" alt="dropdown-button")
	.answer(v-if='answered')
		.a-logo
			img(src="@/assets/light-bulb-logo.png" alt="light-bulb-logo")
		.a-text
			h4 {{ answer }}
</template>







<script lang='ts'>
import {defineComponent, ref} from 'vue'
export default defineComponent({
	name: "QandA",
	props: {
		question: String,
		answer: String,
	},
	setup() {

		const answered = ref(false)
		function answerQuestion(): void {
			answered.value = !answered.value;
		} 
		return {answered,answerQuestion}
	}

})
</script>









<style lang='stylus' scoped>

.qanda
	.question
		display flex
		align-items center
		justify-content center
		.q-logo
			img
				height 30px
				width auto
		.q-text
			margin 0 15px
		.dropdown-button
			img
				height 15px
				width auto
				cursor pointer
	.answer
		display flex
		align-items center
		justify-content center
		.a-logo
			img
				height 30px
				width auto
		.a-text
			margin 0px 15px
</style>




