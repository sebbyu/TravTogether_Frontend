import {Getter, Mutation, Action} from '@/store/modules/user/types'
import axios from 'axios'


const USERURL="http://127.0.0.1:8000/users/"

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
}






export const actions: Action = {
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
      await axios.post(USERURL, userform)
      .then(() => {
        console.log('Register User')
      })
      .catch(error => {
        console.log(error + "REGISTER ERROR")
      })
    } catch (error) {
      console.log(error + "post error")
    }
  },
// =====================================================
  async GetUser({commit}, User) {
    axios.get(USERURL, User)
    .then(response => {
      commit('setUser', response.data)
    })
    .catch(error => {
      console.log(error + "GET USER ERROR")
    })
  },
// =====================================================
  async GetAllUsers({commit}) {
    await axios.get(USERURL)
    .then(response => {
      commit('setAllUsers', response.data)
    })
    .catch(error => {
      console.log(error + "ERROR GETTING ALL USERS")
    })
  },
// =====================================================
}
