import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import firebase from 'firebase/app'

const firebaseConfig = {
  apiKey: "AIzaSyD3gKQdunYCJlBzlo14CR09jYd5jKwsJ68",
  authDomain: "project-0-299920.firebaseapp.com",
  projectId: "project-0-299920",
  storageBucket: "project-0-299920.appspot.com",
  messagingSenderId: "1015795175738",
  appId: "1:1015795175738:web:db15eb5d79592a4874c003",
  measurementId: "G-5DZSY5MEPV",
};
firebase.initializeApp(firebaseConfig);

createApp(App).use(store).use(router).mount('#app')
