<template>
  <div class="container-fluid" id="app">

    <input v-if="productList.length>0" type="text" class="form-control" id="inlineFormInputName"
           placeholder="Search products by name , ID , Category, SKU" v-model="searchTerm">

    <table class="table" v-if="productList.length>0">
      <thead class="thead-light">
      <tr align="left">
        <th scope="col">Product ID</th>
        <th scope="col">SKU</th>
        <th scope="col">Name</th>
        <th scope="col">Category</th>
        <th scope="col">Description</th>
        <th scope="col">Price</th>
        <th scope="col">Final Price</th>
        <th scope="col">Action</th>
      </tr>
      </thead>
      <tbody v-for="(product, index) in filteredProducts">
      <tr align="left" id="row-element">
        <th scope="row">
       <!--   <img v-if="product.imageUrl && product.imageUrl != 'www.google.com'" v-bind:src="product.imageUrl" >
          <img v-if="!product.imageUrl || product.imageUrl === 'www.google.com'" src="https://img.icons8.com/windows/32/000000/shopping-bag-full.png"/>-->
          <div>#{{product.id}}</div>
        </th>
        <td>{{product.sku}}</td>
        <td>{{product.productName}}</td>
        <td>{{product.categoryName}}</td>
        <td>{{product.description}}</td>
        <td>₹{{product.originalPrice}}</td>
        <td>₹{{product.originalPrice - (product.originalPrice*(product.discount/100))}}</td>
        <td scope="row" id="edit" @click="showDetails(product)">
          <!--          <button type="button" class="btn btn-outline-primary" @click="showDetails(product)">Edit</button>-->
          <i class="fa fa-edit"></i>


        </td>

      </tr>
      </tbody>
    </table>

    <div class="jumbotron jumbotron-fluid" v-if="productList.length == 0">
      <div class="container">
        <h1 class="display-4">No Products Present</h1>
        <p class="lead">Currently there are no products, Add new products using Bulk upload or Single upload</p>
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
          name: 'productDetails',
          params: {
            productDetail: product
          }
        })
      },


      async getProductsFromApi() {
        const response = await Vue.axios.get('/product/getProductsForSeller?sellerId=5');
        console.log(response);
        if (response.data.resultCode === 100) {
          this.productList = response.data.data;
        } /*else {
          alert(response.data.error)
        }*/
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
    background-color: #cccccc;
  }

  #inlineFormInputName {
    margin-top: 10px;
    margin-bottom: 20px;
  }

  #inlineFormInputName:active {
    border-color: #272C33;
  }

  .table {
    font-size: 14px;
    font-family: "Open Sans Semibold";
    margin-top: 10px;
  }

  td {
    font-size: 12px;
    color: #555555;
  }

  th {
    color: black;
    font-size: 14px;
    font-family: "Roboto";
  }


  #edit {
    font-size: 15px;
    color: #777777;
  }

  #edit:hover {
    color: #272C33;
    cursor: pointer;
  }

  img {
    width:50px;
    height:50px;

  }

</style>
