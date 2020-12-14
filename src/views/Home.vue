<template lang='pug'>
.home
  HomeComponent(
		:title="title"
		:subtitle="subtitle"
	)
</template>

<script lang="ts">
import { defineComponent } from "vue";
import HomeComponent from "@/components/HomeComponent.vue"
export default defineComponent({
	name: "Home",
	components: {
		HomeComponent,
	},
	setup() {
		const title = "Need Company?"
		const subtitle = "They Are Near You!"
		return {title,subtitle,}
	}
});
</script>
