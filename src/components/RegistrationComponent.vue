<template lang='pug'>
.registrationcomponent
  .top-sec
    .logo
      img(src='@/assets/registration.png' alt='registration')
    h1 Registration
  .mid-sec
    .form
      form(@submit.prevent="submit")
        .email
          input(v-model="registrationForm.email"
                type='text' name='email' placeholder='**Email Address**')
        .nickname
          input(v-model="registrationForm.nickname"
                type='text' name='nickname' 
          placeholder='Nickname (will be set to your email name if left blank)')
        .profile_picture
          label(for='profile_picture') Profile Picture 
          input(@change="registrationForm.profilePicture" 
                type='file' name='profilePicture' accept="image/*")

        //- .profile_picture
        //-   label(for='profilePicture') Profile Picture 
        //-   input(v-model="registrationForm.profilePicture" 
        //-         type='text' name='profilePicture')
        .gender
          label(for='gender') Gender 
          select(v-model="registrationForm.gender")
            option(label='' selected disabled) --- 
            option(value="Male") Male
            option(value="Female") Female
            option(value="Other") Other
        .age
          label(for='age') Age 
          select(v-model="registrationForm.age")
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
          select(v-model="registrationForm.ethnicity")
            option(label='' selected disabled) --- 
            option(value="American Indian / Alaska Native") American Indian / Alaska Native
            option(value="Asian") Asian
            option(value="Black / African American") Black / African American
            option(value="Hispanic / Latino") Hispanic / Latino
            option(value="Native Hawaiian / Other Pacific Islander") Native Hawaiian / Other Pacific Islander
            option(value="White") White
        .location
          label(for='location') **Location** 
          select(v-model="registrationForm.location") Location
            option(label='' selected disabled) --- 
            option(:value="location.city+', '+location.state+', '+location.country" v-for="(location, index) in locations" :key="index")
              .with-state(v-if="location.iso3 === 'USA' || location.iso3 === 'CHN' || location.iso3 === 'RUS'")
                | {{ location.city }}, {{ location.state }}, {{ location.country }}
              .without-state(v-else)
                | {{ location.city }}, {{ location.country }}
        .password
          input(v-model="registrationForm.password"
          type='password' name='password' placeholder='**Password**')
        .create-button
          button(type='submit') Register
  .btm-sec
    hr
</template>











<script lang='ts'>
import {defineComponent,ref,reactive,computed} from 'vue'
import { parse } from "papaparse"
import {useStore} from 'vuex'
import router from '@/router'
export default defineComponent({
  name: "RegistrationComponent",
  setup() {

    const store = useStore()

    const errorMessage = computed(() => store.getters['user/getErrorMessage'])

    const errorStatus = computed(() => store.getters['user/getErrorStatus'])

    const registrationForm = reactive({
      email: "",
      nickname: "",
      profilePicture: "",
      gender: "",
      age: "",
      ethnicity: "",
      location: "",
      password: "",
    })

    function clearForm() {
      registrationForm.email = ""
      registrationForm.nickname = ""
      registrationForm.profilePicture = ""
      registrationForm.gender = ""
      registrationForm.age = ""
      registrationForm.ethnicity = ""
      registrationForm.location = ""
      registrationForm.password = ""
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

    async function submit() {
      if (registrationForm.email === "" ||
      registrationForm.location === "" ||
      registrationForm.password === "") {
        alert("fill up")
      } else {
        try {
          await store.dispatch('user/RegisterNewUser', registrationForm)
          if (errorMessage.value !== "") {
            alert(errorMessage.value)
          } else {
            router.push('/login')
          }
        } catch (error) {
          console.log(error + " Registration Error")
        }
      }
    }



    return {locations,registrationForm,submit,clearForm,errorStatus}
  }
})
</script>











<style lang='stylus' scoped>
.registrationcomponent
  margin 50px 0
  .top-sec
    .logo
      img
        height 100px
        width auto
  .mid-sec
    .form
      form
        .email, .nickname, .password
          input
            margin 5px
            font-size 15px
            text-align left
            background-color white
            width 400px
            height 30px
            border none 
            border-radius 10px
        .profile_picture, .gender, .age, .ethnicity, .location
          margin 5px
          font-size 15px
          height 40px
          label
            color #a6a6a6
          select
            background-color white
            border none 
            border-radius 10px
            height 30px
        .create-button
          margin 15px
          button
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