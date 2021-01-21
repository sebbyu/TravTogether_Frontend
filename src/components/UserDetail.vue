<template lang='pug'>
.userdetail
  h1 Account
  .profile-image
    input(type="checkbox" id="btnControl")
    label(for="btnControl")
      .has-profile-image(v-if="retrievedUser.profilePicture !== null")
        img(:src="retrievedUser.profilePicture" alt="user-profile-picture"
        @click="blurBackground")
      .no-profile-image(v-else)
        img(src="@/assets/empty-profile.png" alt="user-profile-picture")
    h5 {{ retrievedUser.nickname }}
  .user-info(v-if="!updating")
    .title
      img(src="@/assets/account-logo.png")
      h3 Account
    .info
      h2 email: 
      h3 --- {{ retrievedUser.email }} ---
      h2 location: 
      h3 --- {{ retrievedUser.location }} ---
      h2 gender: 
      h3 --- {{ retrievedUser.gender }} ---
      h2 age: 
      h3 --- {{ retrievedUser.age }} ---
      h2 ethnicity: 
      h3 --- {{ retrievedUser.ethnicity }} ---
    .user-bio
      h2 bio:
      p.text {{ retrievedUser.bio }}
    .buttons
      div(v-if="user && retrievedUser.nickname === user.nickname")
        button Chats
        button Messages
        button(@click="updating = !updating") Change Info
        button(@click="goBack") Go Back
      div(v-else)
        button(@click="gotoChat") Chat
        router-link(to="/message") Send Message
        button(@click="goBack") Go Back
  .update-info(v-else)
    .buttons
      button(@click="clickImage") Change Image
      input(
          type='file'
          style="display:none"
          ref="fileInput"
          accept="image/*"
          @change="changeImage"
        )
    form(@submit.prevent="updateProfile")
      .email
        label(for="email") email
        div(v-if="retrievedUser.fromFirebase")
          input(v-model="userForm.email" type='text' disabled
          style="background-color:lightgrey")
        div(v-else)
          input(v-model="userForm.email" type='text')
      .nickname
        label(for="nickname") nickname
        input(v-model="userForm.nickname")
      .location
        label(for='location') Location
        select(v-model="userForm.location")
          option(label='' selected disabled) --- 
          option(:value="location.city+', '+location.state+', '+location.country" v-for="(location, index) in locations" :key="index")
            .with-state(v-if="location.iso3 === 'USA' || location.iso3 === 'CHN' || location.iso3 === 'RUS'")
              | {{ location.city }}, {{ location.state }}, {{ location.country }}
            .without-state(v-else)
              | {{ location.city }}, {{ location.country }}
      .gender
        label(for='gender') Gender 
        select(v-model="userForm.gender")
          option(label='' selected disabled) --- 
          option(value="Male") Male
          option(value="Female") Female
      .age
        label(for='age') Age 
        select(v-model="userForm.age")
          option(label='' selected disabled) --- 
          option(value='10-') 10-
          option(value="10-20") 10 - 20
          option(value="20-30") 20 - 30
          option(value="30-40") 30 - 40
          option(value="40-50") 40 - 50
          option(value="50-60") 50 - 60
          option(value="60+") 60+
      .ethnicity
        label(for='ethnicity') Ethnicity 
        select(v-model="userForm.ethnicity")
          option(label='' selected disabled) --- 
          option(value="American Indian / Alaska Native") American Indian / Alaska Native
          option(value="Asian") Asian
          option(value="Black / African American") Black / African American
          option(value="Hispanic / Latino") Hispanic / Latino
          option(value="Native Hawaiian / Other Pacific Islander") Native Hawaiian / Other Pacific Islander
          option(value="White") White
      .bio
        label(for="bio") Bio
        textarea(v-model="userForm.bio" cols="70" rows="5")
      .password(v-if="!retrievedUser.fromFirebase")
        label(for="password") password
        input(type='password' v-model="userForm.password")
      .buttons
        button(type='submit') Update
        button(@click="updating = !updating") Cancel
        button(style='background-color:red;') Delete Account
</template>



<script lang='ts'>
import {defineComponent, computed, ref} from 'vue'
import {useStore} from 'vuex'
import { parse } from "papaparse"
import router from '@/router'
import {HTMLInputEvent, ImageForm} from '@/store/modules/user/types'
import firebase from 'firebase/app'
import {WORLDCITIES} from '@/store/types'
export default defineComponent({
  name: "UserDetail",
  setup() {
    const store = useStore()
    const isAuthenticated = computed(() => store.getters['user/isAuthenticated'])
    const user = store.getters['user/getUser']
    const retrievedUser = computed(() => store.getters['user/getRetrievedUser'])
    const errorMessage = computed(() => store.getters['user/getErrorMessage'])
    const updating = ref(false)
    const locations = ref()
    const fileInput = ref()
    const googleUser = firebase.auth().currentUser
// ============================================================================
    const userForm = {
      email: retrievedUser.value.email,
      nickname: retrievedUser.value.nickname,
      slug: retrievedUser.value.slug,
      gender:retrievedUser.value.gender,
      age: retrievedUser.value.age,
      ethnicity: retrievedUser.value.ethnicity,
      location: retrievedUser.value.location,
      bio: retrievedUser.value.bio,
      password: null,
    }
// ============================================================================
    const imageForm = {
      profilePicture: null,
    } as ImageForm
// ============================================================================
    function clickImage() {
      fileInput.value.click()
    }
// ============================================================================
    async function changeImage(e: HTMLInputEvent) {
      if (e.target.files) {
        imageForm.profilePicture = e.target.files[0]
      }
      try {
        await store.dispatch('user/ChangeUserImage', imageForm)
        await store.dispatch('user/RetrieveUser', user.slug)
      } catch (error) {
        console.log(error + " ERROR CHANGING PROFILEPICTURE")
      }
    }
// ============================================================================
    async function updateProfile() {
      try {
        await store.dispatch("user/UpdateUser", userForm)
        if (errorMessage.value !== "") {
          alert("There was some error while updating")
        } else {
          await store.dispatch('user/RetrieveUser', user.slug)
          updating.value = !updating.value
        }
      } catch (error) {
        console.log(error + " Updating User Error")
      }
    }
// ============================================================================
    parse(WORLDCITIES, {
      header: true,
      download: true,
      skipEmptyLines: true,
      dynamicTyping: true,
      complete: (results) => {
        locations.value = results.data
      }
    })
// ============================================================================
    function goBack() {
      router.replace("/chat")
    }
// ============================================================================
    function gotoChat() {
      router.push({name: "Chat"}).then(() => {
        window.location.reload()
      })
    }
// ============================================================================
    return {user,isAuthenticated,updating,updateProfile,userForm,
    locations,retrievedUser,fileInput,changeImage,clickImage,goBack,
    googleUser,gotoChat}
  }
})
</script>



<style lang='stylus' scoped>
.userdetail
  button, a
    margin 15px
    border none
    text-decoration none
    font-weight bold
    border-radius 10px
    cursor pointer
    padding 5px 10px
    color rgb(255,255,255)
    background-color rgb(123,165,221)
    transition: 0.2s ease
    &:hover
      background-color rgb(79,137,212)
  .profile-image
    #btnControl
      display none
      &:checked+label
        img
          width 600px
          height 600px
          border-radius 0
          position absolute
          margin auto
          left 0
          right 0
    img
      width 100px
      height 100px
      border-radius 50px
      cursor pointer
      transition 0.3s ease
      &:hover
        transform scale(1.1)
  .user-info
    .title
      display flex
      justify-content center
      margin-right 20px
      margin-top 40px
      align-items center
      font-weight bold
      img
        height 25px
        width 25px
        margin 0 10px
    .info
      h2
        display flex
        justify-content center
        text-decoration underline
      h3
        display flex
        justify-content center
        margin-bottom 50px
    .user-bio
      .text
        padding 20px
        border none
        box-shadow 1px 1px 10px 10px #DCD9D8
        max-width 800px
        margin-left auto
        margin-right auto
        height 250px
  .update-info
    button
      margin 15px
      text-decoration none
      font-weight bold
      border-radius 10px
      cursor pointer
      padding 5px 10px
      color rgb(255,255,255)
      background-color rgb(123,165,221)
      transition: 0.2s ease
      &:hover
        background-color rgb(79,137,212)
    label 
      margin 5px
      font-weight bold
    input
      margin 5px
      font-size 15px
      text-align left
      background-color white
      width 400px
      height 30px
      border none 
      border-radius 10px
    .location, .gender, .age, .ethnicity
      margin 5px
      font-size 15px
      height 40px
      select
        background-color white
        border none 
        border-radius 10px
        height 30px
    .bio
      display flex
      justify-content center
      textarea
        background-color white
</style>