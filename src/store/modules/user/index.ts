import {State, Module} from '@/store/modules/user/types'
import {getters, mutations, actions} from '@/store/modules/user/methods'


export const state: State = {
	user: null,
	retrievedUser: null,
	userList: [],
	errorMessage: "",
}


export const user: Module = {
	namespaced: true,
	state,
	getters,
	mutations,
	actions,
}