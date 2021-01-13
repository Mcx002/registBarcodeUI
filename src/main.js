import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './stores'
import axios from 'axios'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import Swal from 'vue-sweetalert2'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'sweetalert2/dist/sweetalert2.min.css'

axios.defaults.baseURL = 'http://localhost:4000/'
Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(Swal)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
