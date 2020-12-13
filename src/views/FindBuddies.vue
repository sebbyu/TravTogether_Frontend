<template lang='pug'>
.findbuddies
	FindBuddiesComponent
</template>

<script lang='ts'>
import {defineComponent} from 'vue'
import FindBuddiesComponent from '@/components/FindBuddiesComponent.vue'
export default defineComponent({
	name: "FindBuddies",
	components: {
		FindBuddiesComponent,
	}
})
</script>

<style lang='stylus' scoped>

</style>