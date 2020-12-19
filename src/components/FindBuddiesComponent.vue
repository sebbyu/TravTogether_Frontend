<template lang='pug'>
.findbuddiescomponent
	.top-sec
		h1 Search Buddies
		.categories
			.filters(v-for="(filter, index) in filters" :key="index")
				.filter
					p(:class="{selected: filter.filterBool}"
					@click="filter.filterBool = !filter.filterBool") {{ filter.filter }}
			
		.search
			input#search-box(type='search' 
						name='search-box'
						placeholder='Search'
						v-model="search")
			img(src='@/assets/search-logo.png' alt='search-logo')
	.mid-sec
		.results(v-for="(user, index) in userList" :key="index")
			.user
				.profile-picturev(style="border:1px solid grey;")
					img(src="@/assets/explore.png" alt='user_image' 
								style="width:180px;height:auto")
				.name(style="border:1px solid grey;border-top:none;border-bottom:none")
					p {{ user.nickname }}
					.male(v-if="user.gender == 'Male'")
						img(src="@/assets/male-logo.png" alt="gender logo")
					.female(v-else-if="user.gender == 'Female'")
						img(src="@/assets/female-logo.png" alt="gender logo")
				.location(style="border:1px solid grey;border-top:none;")
					img(src="@/assets/location-logo.png" alt="location logo")
					p(v-if="user.location == null") X
					p {{ user.location }}
	.btm-sec
</template>










<script lang='ts'>
import {defineComponent, ref, computed, reactive} from 'vue'
import {useStore} from 'vuex'
export default defineComponent({
	name: "FindBuddiesComponent",
	setup() {
		const store = useStore()
		const search = ""
		interface Filter {
			filter: string;
			filterBool: boolean;
		}
		
		const filters = [
			reactive({
				filter: "Country",
				filterBool: ref(false),
			}) as Filter,
			reactive({
				filter: "City",
				filterBool: ref(false),
			}) as Filter,
			reactive({
				filter: "Name",
				filterBool: ref(false),
			}) as Filter,
			reactive({
				filter: "Gender",
				filterBool: ref(false),
			}) as Filter,
		]

		store.dispatch('user/GetAllUsers')
		const userList = computed(() => store.getters['user/getAllUsers'])


		return {search,userList,filters,}

	}

})
</script>











<style lang='stylus' scoped>
.findbuddiescomponent
	.top-sec
		.categories
			display flex
			justify-content center
			.filters
				.filter
					.selected
						color white 
						background-color rgb(123,165,221)
						border-radius 10px
						transition 0.2s
					cursor pointer
					font-weight bold
					padding 7px
					margin 43px
					color rgb(123,165,221)
					border none
					border-radius 30px
					transition 0.2s ease
					&:hover
						color white
						background-clip rgb(123,165,221)
	
		
		.search
			display flex
			justify-content center
			input
				text-align left
				border none
				border-bottom 1px solid rgb(92,94,95)
				width 800px
				font-size 17px
			img
				height 30px
				padding-left 10px
				cursor pointer
	.mid-sec
		display flex
		margin 3% 15%
		.results
			display flex
			line-height 0
			.user
				margin: 5px
				.profile-picture
				.name
					display flex
					justify-content center
					align-items center
					img
						width 15px
						height 19px
						margin 0 10px
				.location
					display flex
					justify-content center
					align-items center
					img
						width 20px
						height 20px
						
</style>