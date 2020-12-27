<template lang='pug'>
.userdetail(v-if="isAuthenticated")
  h1 {{ retrievedUser.nickname }}
  .profile-image
    .has-profile-image(v-if="retrievedUser.profilePicture !== null")
      img(:src="retrievedUser.profilePicture" alt="user-profile-picture"
      :class="{userAccount: retrievedUser.nickname == user.nickname}")
    .no-profile-image(v-else)
      img(src="@/assets/empty-profile.png" alt="user-profile-picture"
      :class="{userAccount: retrievedUser.nickname == user.nickname}")
  .update-info(v-if="updating")
    .buttons
      button(@click="clickImage") Change Image
    div(v-if="retrievedUser.nickname == user.nickname")
      input(
          type='file'
          style="display:none"
          ref="fileInput"
          accept="image/*"
          @change="changeImage"
        )
    form
      .email
        label(for="email") email
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
      .password
        label(for="password") password
        input(type='password' v-model="userForm.password")
  .user-info(v-else)
    h3 email: {{ retrievedUser.email }}
    h3 location: {{ retrievedUser.location }}
    h3 gender: {{ retrievedUser.gender }}
    h3 age: {{ retrievedUser.age }}
    h3 ethnicity: {{ retrievedUser.ethnicity }}
    .user-bio
      h3 bio:
      | {{ retrievedUser.bio }}
  .button
    div(v-if="updating")
      button(@click="updateProfile") Update
      button(@click="updating = !updating") Cancel
      button(style='background-color:red;') Delete Account
    div(v-else)
      div(v-if="retrievedUser.nickname == user.nickname")
        button(@click="updating = !updating") Change Info
      div(v-else)
        router-link(to="/chat") Chat
        router-link(to="/message") Send Message
        button(@click="goBack") Go Back
</template>



<script lang='ts'>
import {defineComponent, computed, ref} from 'vue'
import {useStore} from 'vuex'
import { parse } from "papaparse"
import router from '@/router'
import {HTMLInputEvent, ImageForm} from '@/store/modules/user/types'
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
// ============================================================================
    const userForm = {
      email: user.email,
      nickname: user.nickname,
      slug: user.slug,
      gender:user.gender,
      age: user.age,
      ethnicity: user.ethnicity,
      location: user.location,
      bio: user.bio,
      password: null,
    }
// ============================================================================
    const imageForm = {
      email: "",
      slug: "",
      profilePicture: null,
      password: "",
    } as ImageForm
// ============================================================================
    function clickImage() {
      if (retrievedUser.value.nickname === user.nickname) {
        fileInput.value.click()
      }
    }
// ============================================================================
    async function changeImage(e: HTMLInputEvent) {
      if (e.target.files) {
        imageForm.profilePicture = e.target.files[0]
        imageForm.slug = user.slug
        imageForm.email = user.email
        imageForm.password = user.password
      }
      try {
        await store.dispatch('user/ChangeUserImage', imageForm)
        await store.dispatch('user/RetrieveUser', imageForm.slug)
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
          await store.dispatch('user/RetrieveUser', userForm.slug)
          updating.value = !updating.value
        }
      } catch (error) {
        console.log(error + " Updating User Error")
      }
    }
// ============================================================================
    parse("http://127.0.0.1:8000/media/locations/world-cities.csv", {
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
      router.go(-1)
    }
// ============================================================================
    return {user,isAuthenticated,updating,updateProfile,userForm,
    locations,retrievedUser,fileInput,changeImage,clickImage,goBack,}
  }
})
</script>



<style lang='stylus' scoped>
.userdetail
  .profile-image
    img
      width 300px
      height 300px
    .userAccount
      cursor pointer
      transition 0.3s ease
      &:hover
        transform scale(1.1)
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
  // .user-info
  //   h3
    // .user-bio
  .button
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
</style>