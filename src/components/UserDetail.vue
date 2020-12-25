<template lang='pug'>
.userdetail(v-if="isAuthenticated")
  h1 {{ retrievedUser.nickname }}
  .profile-image
    .has-profile-image(v-if="retrievedUser.profilePicture !== null")
      img(:src="retrievedUser.profilePicture" alt="user-profile-picture")
    .no-profile-image(v-else)
      img(src="@/assets/empty-profile.png" alt="user-profile-picture")
  .update-info(v-if="updating")
    form
      label(for="email") email
      input(v-model="userForm.email" type='text')
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
      button(@click="update") Update
      button(@click="updating = !updating") Cancel
    div(v-else)
      div(v-if="retrievedUser.nickname == user.nickname")
        button(@click="updating = !updating") Change Info
      div(v-else)
        button Chat
        button Send Email
        
</template>

<script lang='ts'>
import {defineComponent, computed, ref} from 'vue'
import {useStore} from 'vuex'
import { parse } from "papaparse"
export default defineComponent({
  name: "UserDetail",
  setup() {
    const store = useStore()
    const isAuthenticated = computed(() => store.getters['user/isAuthenticated'])
    const user = computed(() => store.getters['user/getUser'])
    const retrievedUser = computed(() => store.getters['user/getRetrievedUser'])
    const errorMessage = computed(() => store.getters['user/getErrorMessage'])
    
    const userForm = {
      email: user.value.email,
      nickname: user.value.nickname,
      slug: user.value.slug,
      gender:user.value.gender,
      age: user.value.age,
      ethnicity: user.value.ethnicity,
      location: user.value.location,
      bio: user.value.bio,
      password: user.value.password,
    }
    const updating = ref(false)
    async function update() {
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

    const locations = ref()

    parse("http://127.0.0.1:8000/media/locations/world-cities.csv", {
      header: true,
      download: true,
      skipEmptyLines: true,
      dynamicTyping: true,
      complete: (results) => {
        locations.value = results.data
      }
    })

    return {user,isAuthenticated,updating,update,userForm,locations,retrievedUser,}

  }


})
</script>

<style lang='stylus' scoped>

.userdetail
  .profile-image
    img
      width 300px
      height 300px
  .update-info
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
</style>