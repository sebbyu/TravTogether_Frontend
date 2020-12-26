import {GetterTree, MutationTree, ActionTree, Module as BaseModule} from 'vuex'
import {RootState} from '@/store/types'

export interface State {
	user: User | null;
	retrievedUser: User | null;
	userList: User[];
	errorMessage: string;
}

export interface User {
	email: string;
	nickname: string;
	slug: string;
	profilePicture: File;
	gender: string;
	age: string;
	ethnicity: string;
	location: string;
	password: string;
}

export interface RegistrationForm {
	email: string;
	nickname: string;
	profilePicture: File | null;
	gender: string;
	age: string;
	ethnicity: string;
	location: string;
	password1: string;
	password2: string;
}

export interface ImageForm {
	email: string;
	slug: string;
	profilePicture: File | null;
	password: string;
}

export interface HTMLInputEvent extends Event {
	target: HTMLInputElement & EventTarget;
}

export type Getter = GetterTree<State, RootState>
export type Mutation = MutationTree<State>
export type Action = ActionTree<State, RootState>
export type Module = BaseModule<State, RootState>