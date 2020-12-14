<template lang='pug'>
.login
	LoginComponent
</template>

<script lang='ts'>
import {defineComponent} from 'vue'
import LoginComponent from '@/components/LoginComponent.vue'
export default defineComponent({
	name: 'Login',
	components: {
		LoginComponent,
	}
})
</script>

<style lang='stylus' scoped>

</style>