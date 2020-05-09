import Vue from 'vue'
import App from './App.vue'
import VueRouter from "vue-router";
import {routes} from "./routes"
import VModal from 'vue-js-modal'


Vue.use(VueRouter);
Vue.use(VModal,{ dialog: true })



const router = new VueRouter({
  mode:'history',
  routes
});

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
