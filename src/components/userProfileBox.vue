<template lang='pug'>
.page
  .empty(v-if="availableUsers.length === 0")
    h1 All Users are in this chat
    button.button(@click="goBack") Done
  .chat(v-else)
    p {{chat.title}}
    p {{ chat.users }}
  .results(
    v-for="(user, index) in availableUsers" :key="index")
    .user
      .profile-picture(style="border:1px solid grey;"
      @click="addUser(user)")
        .has_image(v-if="user.profilePicture")
          img(:src="user.profilePicture"
            style="width:180px;height:180px")
        .no_image(v-else)
          img(src="@/assets/empty-profile.png"
            style="width:180px;height:180px")
      .name(style="border:1px solid grey;border-top:none;border-bottom:none")
        p(v-if="user.nickname == null") X
        p(v-else-if="user.nickname.length > 15") 
          | {{ user.nickname.slice(0,15) }} ...
        p(v-else) {{ user.nickname }}
        .male(v-if="user.gender == 'Male'")
          img(src="@/assets/male-logo.png" alt="gender logo")
        .female(v-else-if="user.gender == 'Female'")
          img(src="@/assets/female-logo.png" alt="gender logo")
        .other(v-else)
          img(src="@/assets/registration.png" alt="gender logo")
      .location(style="border:1px solid grey;border-top:none;")
        img(src="@/assets/location-logo.png" alt="location logo")
        p(v-if="user.location == ''") X
        p(v-else-if="user.location.split(',')[0].length + user.location.split(',')[2].length > 20") 
          | {{ user.location.split(',')[0].slice(0,20) }} ...
        p(v-else) {{ user.location.split(',')[0] }},
          | {{ user.location.split(',')[2] }}
</template>

<script lang='ts'>
import {defineComponent, ref, computed} from 'vue'
import {useStore} from 'vuex'
import {User} from '@/store/modules/user/types'
import router from '@/router'
export default defineComponent({
  name: "userProfileBox",
  setup() {
    const store = useStore()
    const chat = computed(() => store.getters['chat/getChat'])
    const userList = computed(() => store.getters['user/getAllUsers'])
    const availableUsers = ref(userList.value.filter(
      (user: User) => chat.value.users.includes(user.nickname) === false)
    )
    async function addUser(user: User) {
      const form = {
        chatId: chat.value.id,
        userNickname: user.nickname
      }
      try {
        await store.dispatch("chat/AddUserToChat", form)
        availableUsers.value = userList.value.filter(
          (user: User) => chat.value.users.includes(user.nickname) === false
        )
      } catch(error) {
        console.log(error.message)
      }
    }
    function goBack() {
      router.push("/chat")
    }
    return {chat,userList,availableUsers,addUser,goBack}
  }
})
</script>

<style lang='stylus' scoped>
.page
  display flex
  flex-wrap wrap
  margin 3% 10%
  .empty
    .button
      cursor pointer
      font-size 17px
      margin 20px
      border-radius 10px
      border none
      box-shadow -3px 3px 10px 5px #f8f8ff
      padding 5px 10px
      font-weight bold
      color #708090
      transition 0.3s ease
      &:hover
        box-shadow -3px 3px 10px 15px #dcdcdc
  .results
    display flex
    line-height 0
    transition 0.2s ease
    &:hover
      transform scale(1.15)
    .user
      margin: 5px
      .profile-picture
        margin 0
        cursor pointer
      .name
        display flex
        justify-content center
        align-items center
        img
          width 15px
          height 19px
          margin 0 10px
      .location
        display flex
        justify-content center
        align-items center
        img
          width 20px
          height 20px
</style>