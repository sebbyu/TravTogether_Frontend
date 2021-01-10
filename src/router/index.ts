import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import FindBuddies from '@/views/FindBuddies.vue'
import Help from '@/views/Help.vue'
import Contact from '@/views/Contact.vue'
import Login from '@/views/Login.vue'
import Registration from '@/views/Registration.vue'
import User from '@/views/User.vue'
import Chat from '@/views/Chat.vue'
import Message from '@/views/Message.vue'
import userList from '@/views/userList.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/findbuddies',
    name: 'FindBuddies',
    component: FindBuddies
  },
  {
    path: '/help',
    name: 'Help',
    component: Help
  },
  {
    path: '/contact',
    name: 'Contact',
    component: Contact
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/registration',
    name: 'Registration',
    component: Registration
  },
  {
    path: '/user/:slug',
    name: 'User',
    component: User
  },
  {
    path: '/chat/:id?',
    name: 'Chat',
    component: Chat
  },
  {
    path: '/message/',
    name: 'Message',
    component: Message
  },
  {
    path: '/users/',
    name: 'Users',
    component: userList
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
