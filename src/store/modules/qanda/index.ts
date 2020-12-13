import {State, Module} from '@/store/modules/qanda/types'
import {getters, mutations, actions} from '@/store/modules/qanda/methods'

export const state: State = {
	QAs: []
}

export const qanda: Module = {
	namespaced: true,
	state,
	getters,
	mutations,
	actions,
}