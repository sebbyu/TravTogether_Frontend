import {GetterTree, MutationTree, ActionTree, Module as BaseModule} from 'vuex'
import {RootState} from '@/store/types'

export interface State {
	user: User | null;
	userList: User[];
}

export interface User {
	email: string;
	nickname: string;
	profileImage: string,
	gender: string;
	age: string;
	ethnicity: string;
	location: string;
	password: string;
	
}


export type Getter = GetterTree<State, RootState>
export type Mutation = MutationTree<State>
export type Action = ActionTree<State, RootState>
export type Module = BaseModule<State, RootState>