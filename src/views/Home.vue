<template>
  <div class="home">
    <button v-show="isLoggedIn" @click="checkLogin">check</button>
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
  import { mapGetters } from 'vuex'
import HelloWorld from '@/components/HelloWorld.vue'
import { setHeaderToken } from '@/utils/auth'

export default {
  name: 'Home',
  components: {
    HelloWorld
  },
  computed:{
    ...mapGetters({
      isLoggedIn:'isLoggedIn'
    })
  },
  mounted(){
    
    const token = localStorage.getItem('token')

    if(token){
      setHeaderToken(token)
    }else{
      this.$router.push('/login') 
    }

    this.$store.dispatch('getUser')
    // checkLogin()
    // this.$store.dispatch("login",{
    //   email:"muchlishchoeruddin96@gmail.com",
    //   password:"admin123"
    // })
    //   .then(data=>{
    //     console.log({id:this.$store.getters.getUserId,stat:data})
    //   })
    //   .catch(err=>{
    //     console.log(err)
    //   })
  },
  methods:{
    checkLogin(){
      console.log(this.$store.getters.getUser)
    }
  } 
}
</script>
