<template>
  <div class="container-fluid">
    <app-counts-component :productsCount="this.productsCount"
                          :activeOrders="this.activeOrders"
                          :pendingOrders="this.pendingApproval"></app-counts-component>
    <app-top-selling-component :products="this.topSellingProducts" v-if="this.topSellingProducts.length >0"></app-top-selling-component>
    <app-trending-component :trendingProduct = "this.trendingProductsList"></app-trending-component>
  </div>

</template>

<script>
  import HomeCountsComponent from "./HomeCountsComponent";
  import HomeTopSellingComponent from "./HomeTopSellingComponent";
  import HomeTrendingComponent from "./HomeTrendingComponent";
  import axios from "axios";

  export default {

    created() {
      this.getProductsCount();
      this.getActiveOrdersCount();
      this.getPendingApprovalCount();
      this.getAllTrendingProducts();
      this.getAllTrendingProductsForSeller();
    },

    data(){
      return {
        productsCount : 0,
        activeOrders:0,
        pendingApproval:0,
        totalEarned:0,
        trendingProductsList:[],
        topSellingProducts:[]
      }
    },

    components: {
      appCountsComponent: HomeCountsComponent,
      appTopSellingComponent: HomeTopSellingComponent,
      appTrendingComponent: HomeTrendingComponent
    },
    methods:{
      async getProductsCount() {
        const response = await axios.get('http://city-ecomm-customer.herokuapp.com/dashboard/getProductsCount?sellerId=2');
        this.productsCount = response.data.data
        console.log(response)
      },

      async getActiveOrdersCount() {
        const response = await axios.get('http://city-ecomm-customer.herokuapp.com/dashboard/getActiveOrdersCount?sellerId=2');
        this.activeOrders = response.data.data
        console.log(response)
      },

      async getPendingApprovalCount() {
        const response = await axios.get('http://city-ecomm-customer.herokuapp.com/dashboard/getPendingOrdersCount?sellerId=5');
        this.pendingApproval = response.data.data
        console.log(response)
      },

      async getAllTrendingProducts() {
        const response = await axios.get('http://city-ecomm-customer.herokuapp.com/dashboard/getAllTrendingProducts');
        this.trendingProductsList = response.data.data
        console.log(response)
      },

     async getAllTrendingProductsForSeller() {
        const response = await axios.get('http://city-ecomm-customer.herokuapp.com/dashboard/getAllTrendingProductsForSeller?sellerId=5');
        this.topSellingProducts = response.data.data
        console.log(response)
      }
    }
  }
</script>

<style scoped>

</style>
