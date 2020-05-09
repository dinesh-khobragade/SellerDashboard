<template>
  <div class="container-fluid" id="app">

    <input v-if="productList.length>0" type="text" class="form-control" id="inlineFormInputName"
           placeholder="Search products by name , ID , Category, SKU" v-model="searchTerm">

    <table class="table" v-if="productList.length>0">
      <thead class="thead-dark">
      <tr>
        <th scope="col">#</th>
        <th scope="col">Product ID</th>
        <th scope="col">Category</th>
        <th scope="col">Name</th>
        <th scope="col">Description</th>
        <th scope="col">Image</th>
        <th scope="col">Price</th>
        <th scope="col">Discount</th>
        <th scope="col">SKU</th>
        <th scope="col">Action</th>
      </tr>
      </thead>
      <tbody v-for="(product, index) in filteredProducts">
      <tr id="row-element" visible="false">
        <th scope="row">{{index+1}}</th>
        <th scope="row">{{product.id}}</th>
        <td>{{product.categoryName}}</td>
        <td>{{product.productName}}</td>
        <td>{{product.description}}</td>
        <td>{{product.imageUrl}}</td>
        <td>{{product.originalPrice}}</td>
        <td>{{product.discount}}</td>
        <td>{{product.sku}}</td>
        <th scope="col">
          <button type="button" class="btn btn-outline-primary" @click="showDetails(product)">Edit</button>
        </th>

      </tr>
      </tbody>
    </table>

    <div class="jumbotron jumbotron-fluid" v-if="productList.length == 0">
      <div class="container">
        <h1 class="display-4">No Products Present</h1>
        <p class="lead">Currently there are no products, Add new products using Bulk upload or  Single upload</p>
      </div>
    </div>

  </div>
</template>

<script>
  import axios from 'axios';

  export default {
    methods: {
      showDetails(product) {
        console.log(product)
        this.$router.push({
          name:'productDetails',
          params:{
            productDetail:product
          }
        })
      },


      async getProductsFromApi() {
        const response = await axios.get('http://city-ecomm-customer.herokuapp.com/product/getProductsForSeller?sellerId=5');
        console.log(response);
        if (response.data.resultCode === 100) {
          this.productList = response.data.data;
        } else {
          alert(response.error)
        }
      }
    },

    async created() {
      // alert("created")
      console.log('Component has been created!');
      await this.getProductsFromApi();

    },


    computed: {
      filteredProducts() {
        console.log(this.productList)
        let filteredProducts = this.productList.filter((product) => {
          return product.productName.toLowerCase().includes(this.searchTerm.toLowerCase())
            || product.description.toLowerCase().includes(this.searchTerm.toLowerCase())
            || product.sku.toLowerCase().includes(this.searchTerm.toLowerCase())
            || product.categoryName.toLowerCase().includes(this.searchTerm.toLowerCase())
            || String(product.id).toLowerCase().includes(this.searchTerm.toLowerCase())
            ;
        })
        return filteredProducts;
      }
    },

    data() {
      return {
        searchTerm: '',
        productList: [],
      }
    }
  }
</script>

<style>
  #row-element:hover {
    background-color: aqua;
  }

  #inlineFormInputName {
    margin-top: 30px;
  }

  .table {
    margin-top: 10px;
  }
</style>
