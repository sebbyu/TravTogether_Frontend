<template lang='pug'>
.helpcomponent
	.top-sec
		h1 Need Help?
	.mid-sec
		h2 FAQs
		.qandas(v-for="(qanda, index) in qandas" :key="index+=1")
			QandA(
				:index="index"
				:question="qanda.question"
				:answers="qanda.answers"
			)
	.btm-sec
		hr
		h2 Need More Help?
		.form
			form(@submit.prevent="submit")
				.textarea
					textarea(name='question' rows='5' cols='70' 
								v-model="form.question"
								placeholder="Write your question here...")
				.submit-button
					button(type="submit") Submit
		p OR
		router-link(to='/contact')
			button Contact Us
</template>



<script lang='ts'>
import {defineComponent, computed} from 'vue'
import QandA from '@/components/QandA.vue'
import {useStore} from 'vuex'

export default defineComponent({
	name: "HelpPage",
	components: {
		QandA,
	},
	setup() {
		const store = useStore()
		store.dispatch('qanda/GetQAs')
		const qandas = computed(() => store.getters['qanda/getQAs'])
// ============================================================================
		const form = {
			question: "",
		}
// ============================================================================
		const submit = () => {
			const QuestionForm = new FormData()
			QuestionForm.append('question', form.question)
			try {
				store.dispatch('qanda/PostQuestion', QuestionForm)
				.then(() => {
					form.question = ""
				})
			} catch (error) {
				console.log(error + " This is error from dispatch")
			}
		}
// ============================================================================
		return { store,qandas,submit,form, }
	}
})
</script>



<style lang='stylus' scoped>
.helpcomponent
	.top-sec
		margin-bottom 3%
	.mid-sec
		h2
			margin 20px
	.btm-sec
		.form
			p 
				margin 20px 0
				color rgb(146, 146, 146)
				font-size 15px
			.textarea
				textarea
					background-color white
			.submit-button
				button
					margin-top 5px
					font-size 13px
					padding 5px
		button
			margin 0
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