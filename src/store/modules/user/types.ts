import {GetterTree, MutationTree, ActionTree, Module as BaseModule} from 'vuex'
import {RootState} from '@/store/types'

export interface State {
	user: User | null;
}

export interface User {
	username: string;
	nickname: string;
	email: string;
	profileImage: string,
}


export type Getter = GetterTree<State, RootState>
export type Mutation = MutationTree<State>
export type Action = ActionTree<State, RootState>
export type Module = BaseModule<State, RootState>