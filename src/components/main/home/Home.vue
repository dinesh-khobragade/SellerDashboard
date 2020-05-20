<template>
  <div class="container-fluid">
    <app-counts-component :productsCount="this.productsCount"
                          :activeOrders="this.activeOrders"
                          :totalEarned="this.totalEarned"
                          :pendingOrders="this.pendingApproval"></app-counts-component>
    <app-top-selling-component :products="this.topSellingProducts"
                               v-if="this.topSellingProducts.length >0"></app-top-selling-component>
    <app-trending-component :trendingProduct="this.trendingProductsList"></app-trending-component>
  </div>

</template>

<script>
  import HomeCountsComponent from "./HomeCountsComponent";
  import HomeTopSellingComponent from "./HomeTopSellingComponent";
  import HomeTrendingComponent from "./HomeTrendingComponent";
  import axios from "axios";
  import Vue from "vue";

  export default {


    created() {
      console.log("home token")
      console.log("Token = " + Vue.prototype.$session.get('token'))

      this.getProductsCount();
      this.getActiveOrdersCount();
      this.getPendingApprovalCount();
      this.getAllTrendingProducts();
      this.getAllTrendingProductsForSeller();
      this.getOverallEarned();

    },

    data() {
      return {
        productsCount: 0,
        activeOrders: 0,
        pendingApproval: 0,
        totalEarned: 0,
        trendingProductsList: [],
        topSellingProducts: []
      }
    },

    components: {
      appCountsComponent: HomeCountsComponent,
      appTopSellingComponent: HomeTopSellingComponent,
      appTrendingComponent: HomeTrendingComponent,
    },
    methods: {
      async getProductsCount() {
        const response = await Vue.axios.get('/dashboard/getProductsCount?sellerId=2');
        this.productsCount = response.data.data
      },

      async getActiveOrdersCount() {
        const response = await Vue.axios.get('/dashboard/getActiveOrdersCount?sellerId=2');
        this.activeOrders = response.data.data
      },

      async getPendingApprovalCount() {
        const response = await Vue.axios.get('/dashboard/getPendingOrdersCount?sellerId=5');
        this.pendingApproval = response.data.data
      },

      async getAllTrendingProducts() {
        const response = await Vue.axios.get(`/dashboard/getAllTrendingProducts?businessType=${this.$session.get('user').businessType}`);
        this.trendingProductsList = response.data.data
      },

      async getAllTrendingProductsForSeller() {
        const response = await Vue.axios.get('/dashboard/getAllTrendingProductsForSeller?sellerId=5');
        this.topSellingProducts = response.data.data
      },

      async getOverallEarned() {
        const response = await axios.get('/payment/getEntireEarning?');
        this.totalEarned = response.data.data
      },

      sleep(milliseconds) {
        return new Promise(resolve => setTimeout(resolve, milliseconds))
      }
    }

  }
</script>

<style scoped>

</style>
