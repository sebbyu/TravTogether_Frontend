<template lang='pug'>
.findbuddiescomponent
	div(:class="{ loggedout: !isAuthenticated }")
		.top-sec
			h1 Search Buddies
			.categories
				.filters(v-for="(filter, index) in filters" :key="index")
					.filter
						button(:class="{selected: filter.filterBool}"
						@click="filter.filterBool = !filter.filterBool"
						:disabled="!isAuthenticated") {{ filter.filter }}
			.search
				input#search-box(type='search' 
							name='search-box'
							placeholder='Search (Country, City, Name, Gender)'
							v-model="search"
							:disabled="!isAuthenticated")
				img(src='@/assets/search-logo.png' alt='search-logo')
		.mid-sec
			.logged-in(v-if="isAuthenticated")
				.results(
					v-for="(user, index) in userList.filter(user => user.nickname !== currentUser.nickname)" :key="index")
					.user
						.profile-picture(style="border:1px solid grey;"
						@click="userDetail(user)")
							.has_image(v-if="user.profilePicture")
								img(:src="user.profilePicture"
									style="width:180px;height:180px")
							.no_image(v-else)
								img(src="@/assets/empty-profile.png"
									style="width:180px;height:180px")
						.name(style="border:1px solid grey;border-top:none;border-bottom:none")
							p(v-if="user.nickname == null") X
							p(v-else-if="user.nickname.length > 15") 
								| {{ user.nickname.slice(0,15) }} ...
							p(v-else) {{ user.nickname }}
							.male(v-if="user.gender == 'Male'")
								img(src="@/assets/male-logo.png" alt="gender logo")
							.female(v-else-if="user.gender == 'Female'")
								img(src="@/assets/female-logo.png" alt="gender logo")
							.other(v-else)
								img(src="@/assets/registration.png" alt="gender logo")
						.location(style="border:1px solid grey;border-top:none;")
							img(src="@/assets/location-logo.png" alt="location logo")
							p(v-if="user.location == ''") X
							p(v-else-if="user.location.split(',')[0].length + user.location.split(',')[2].length > 20") 
								| {{ user.location.split(',')[0].slice(0,20) }} ...
							p(v-else) {{ user.location.split(',')[0] }},
								| {{ user.location.split(',')[2] }}
.logged-out(v-if="!isAuthenticated")
	LoginComponent
</template>



<script lang='ts'>
import {defineComponent, ref, computed, reactive} from 'vue'
import {useStore} from 'vuex'
import LoginComponent from '@/components/LoginComponent.vue'
import router from '@/router'
import {User} from '@/store/modules/user/types'
export default defineComponent({
	name: "FindBuddiesComponent",
	components: {
		LoginComponent,
	},
	setup() {
		const store = useStore()
		store.dispatch("user/GetAllUsers")
		const search = ""
		const isAuthenticated = computed(() => store.getters['user/isAuthenticated'])
		const currentUser = computed(() => store.getters['user/getUser'])
		const userList = computed(() => store.getters['user/getAllUsers'])
// ============================================================================
		interface Filter {
			filter: string;
			filterBool: boolean;
		}
// ============================================================================
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
// ============================================================================
		async function userDetail(user: User) {
			await store.dispatch('user/RetrieveUser', user.slug)
			await router.push('/user/'+user.slug)
		}
// ============================================================================
		return {search,filters,userList,currentUser,isAuthenticated,userDetail}
	}
})
</script>



<style lang='stylus' scoped>
.findbuddiescomponent
	.loggedout
		-webkit-filter blur(8px)
	.top-sec
		.categories
			display flex
			justify-content center
			.filters
				.filter
					border none
					.selected
						color white
						transition 0.2s
						background-color rgb(123,165,221)
						padding 3px
						outline none
					button
						outline none
						cursor pointer
						font-weight bold
						margin 43px
						border-radius 30px
						background-color none
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
		.logged-in
			display flex
			flex-wrap wrap
			margin 3% 10%
			.results
				display flex
				line-height 0
				transition 0.2s ease
				&:hover
					transform scale(1.15)
				.user
					margin: 5px
					.profile-picture
						margin 0
						cursor pointer
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