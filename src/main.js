import Vue from 'vue'
import App from './App.vue'
import VueRouter from "vue-router";
import {routes} from "./routes"
import VueTableDynamic from 'vue-table-dynamic'
import VModal from 'vue-js-modal'
// import DataTable from 'laravel-vue-datatable';
// import { DataTable } from 'v-datatable-light'


Vue.use(VueRouter);
Vue.use(VueTableDynamic)
Vue.use(VModal,{ dialog: true })
// Vue.use(DataTable);



const router = new VueRouter({
  mode:'history',
  routes
});

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
