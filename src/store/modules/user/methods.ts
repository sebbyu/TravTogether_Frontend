import {Getter, Mutation, Action} from '@/store/modules/user/types'
import axios from 'axios'
import slugify from 'slugify'

const USERSURL = "http://127.0.0.1:8000/users/"
const AUTHENTICATIONURL = "http://127.0.0.1:8000/authentication/"


export const getters: Getter = {
  isAuthenticated: state => !!state.user,
// =====================================================
  getUser: state => state.user,
// =====================================================
  getAllUsers: state => state.userList,
// =====================================================
}





export const mutations: Mutation = {
	setUser(state, user) {
    state.user = user
  },
// =====================================================
  setAllUsers(state, users) {
    state.userList = users
  },
// =====================================================
  logout(state) {
    state.user = null
  },
// =====================================================
}






export const actions: Action = {
  // eslint-disable-next-line
	async RegisterNewUser({commit}, User) {
    const userform = new FormData()
    userform.append('email', User.email)
    userform.append('nickname', User.nickname)
    userform.append('profileImage', User.profileImage)
    userform.append('gender', User.gender)
    userform.append('age', User.age)
    userform.append('ethnicity', User.ethnicity)
    userform.append('location', User.location)
    userform.append('password', User.password)
    try {
      await axios.post(USERSURL, userform)
      console.log('Register User')
    } catch (error) {
      console.log(error + "post error")
    }
  },
// =====================================================
  async GetUser({commit}, userForm) {
    const slug = slugify(userForm.get('email').split('@')[0])
    try {
      const response = await axios.get(USERSURL+slug)
      await commit('setUser', response.data)
    } catch (error) {
      console.log(error + " GET USER ERROR")
    }
  },
// =====================================================
  async GetAllUsers({commit}) {
    try {
      const response = await axios.get(USERSURL)
      commit('setAllUsers', response.data)
    } catch (error) {
      console.log(error + " ERROR GETTING ALL USERS")
    }
  },
// =====================================================
  async Login({dispatch}, User) {
    const userForm = new FormData()
    userForm.append('email', User.email)
    userForm.append('password', User.password)
    try {
      await axios.post(AUTHENTICATIONURL, userForm)
      await dispatch('GetUser', userForm)
    } catch(error) {
      console.log(error + " ERROR LOGGING IN")
    }
  },
// =====================================================
  Logout({commit}) {
    commit("logout")
  },
}
