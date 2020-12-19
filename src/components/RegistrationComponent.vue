<template lang='pug'>
.registrationcomponent
  .top-sec
    .logo
      img(src='@/assets/registration.png' alt='registration')
    h1 Registration
  .mid-sec
    .form
      form(@submit="submit")
        .email
          input(type='text' name='email' placeholder='Email Address')
        .nickname
          input(type='text' name='nickname' placeholder='Nickname')
          strong (will be set to your email name if left blank)
        .profile_picture
          label(for='profile_picture') Profile Picture 
          input(type='file' name='profile_picture' accept="image/*")
        .gender
          label(for='gender') Gender 
          select(name='gender')
            option(label='' selected disabled) --- 
            option(value="Male") Male
            option(value="Femail") Female
            option(value="Other") Other
        .age
          label(for='age') Age  
          select(name='age')
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
          select(name='ethnicity')
            option(label='' selected disabled) --- 
            option(value="Native1") American Indian / Alaska Native
            option(value="Asian") Asian
            option(value="Black") Black / African American
            option(value="Latino") Hispanic / Latino
            option(value="Native2") Native Hawaiian / Other Pacific Islander
            option(value="White") White
        .location
          label(for='location') Location
          select(name='location')
            option(label='' selected disabled) --- 
            option(value="Native1") American Indian / Alaska Native
            option(value="Asian") Asian
            option(value="Black") Black / African American
            option(value="Latino") Hispanic / Latino
            option(value="Native2") Native Hawaiian / Other Pacific Islander
            option(value="White") White
        .password
          input(type='password' name='password' placeholder='Password')
        .create-button
          button(@click='submit') Register
  .btm-sec
    hr
</template>

<script lang='ts'>
import {defineComponent} from 'vue'
export default defineComponent({
  name: "RegistrationComponent",
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
        .nickname
          margin-left 330px
        .email, .nickname, .password
          input
            margin 5px
            font-size 15px
            text-align left
            background-color white
            width 300px
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