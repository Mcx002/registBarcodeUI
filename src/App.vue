<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    <b-navbar toggleable="lg" type="dark" variant="info" v-show="isLanding">
      <b-navbar-brand @click="$router.push('/')" style="cursor:pointer">Registration Barcode App</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">

          <b-nav-item @click="$router.push('/about')">About</b-nav-item>
          <b-nav-item v-show="!user" @click="$router.push('/login')">Login</b-nav-item>
          <b-nav-item-dropdown v-show="user" right>
            <!-- Using 'button-content' slot -->
            <template #button-content>
              <em>{{ username }}</em>
            </template>
            <b-dropdown-item href="#" @click="$router.push('/dashboard')">Dashboard</b-dropdown-item>
            <b-dropdown-item href="#" @click="logout">Sign Out</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <router-view/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed:{
    ...mapGetters({
      user:'getUser'
    }),
    username(){
      return this.user?this.user.name.split(' ')[0]:null
    },
    currenturl(){
      return this.$route.path
    },
    isLanding(){
      if(this.currenturl=='/about'||this.currenturl=='/'){
        return true
      }else{
        return false
      }
    }
  },
  data(){
    return{

    }
  },
  methods:{
    logout(){
      this.$swal("kamu telah logout")
      this.$store.dispatch('logout')
    }
  }
}
</script>