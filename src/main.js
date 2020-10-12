import Vue from 'vue'
import App from './App.vue'
import VueRouter from "vue-router";
import {routes} from "./routes"
import VModal from 'vue-js-modal'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
import VueSession from 'vue-session'
import axios from 'axios'
import VueAxios from 'vue-axios'

global.Vue = Vue;

Vue.use(VueSession,{
  persist: true
})

Vue.use(VueAxios, axios)
Vue.use(VueMaterial)
Vue.use(VueRouter);
Vue.use(VModal,{ dialog: true })

Vue.axios.defaults.baseURL = "http://city-ecomm-customer.herokuapp.com";
// Vue.axios.defaults.baseURL = "http://localhost:3000";

Vue.axios.defaults.headers.common={
  "Authorization" : "Bearer "+  Vue.prototype.$session.get('token')
  // "Authorization" : this.$session? ("Bearer "+  this.$session.get('token')):""
}




const router = new VueRouter({
  mode:'history',
  routes
});

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
