import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './stores'
import axios from 'axios'


axios.defaults.baseURL = 'http://192.168.43.126:4000/'
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
