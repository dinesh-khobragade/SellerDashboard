<template>
  <div class="container">
    <h1>Product Details</h1>


    <div >Product ID: <strong id="productId">{{this.product.id}}</strong></div>

    <form>
      <div class="form-group">
        <label for="productName">Product Name</label>
        <input v-model="product.productName" type="text" class="form-control" id="productName" placeholder="Enter product name" @>
      </div>

      <div class="form-group">
        <label for="supplierProductId">Supplier Product ID</label>
        <input v-model="product.supplierProductId" type="text" class="form-control" id="supplierProductId" placeholder="Enter supplier product ID" @>
      </div>

      <div class="form-group">
        <label for="productDescription">Product Description</label>
        <input v-model="product.description" type="text" class="form-control" id="productDescription"  placeholder="Enter product description" @>
      </div>

      <div class="row">
        <div class="col">
          <div class="form-group">
            <label for="productSku">Product SKU</label>
            <input v-model="product.sku" type="text" class="form-control" id="productSku" placeholder="Enter product sku" @>
          </div>
        </div>

        <div class="col">
          <div class="form-group">
            <label for="category">Category</label>
            <select  class="form-control" id="category" >
              <option selected>Choose...</option>
              <option>...</option>
            </select>
          </div>
        </div>


        <div class="col-3">
          <div class="form-group">
            <label v-model="product.quantity" for="productQuantity">Quantity</label>
            <input type="number" class="form-control" id="productQuantity" placeholder="Enter quantity available" @>
          </div>
        </div>

      </div>

      <div class="row">
        <div class="col">
          <div class="form-group">
            <label for="productPrice">Original Price</label>
            <input v-model="product.originalPrice" type="number" class="form-control" id="productPrice" placeholder="Enter original product price" @>
          </div>
        </div>

        <div class="col">
          <div class="form-group">
            <label for="productDiscount">Discount</label>
            <input v-model="product.discount" :max="100" type="number" class="form-control" id="productDiscount" placeholder="Enter discount in percentage" @>
          </div>
        </div>

        <div class="col-3">
          <div class="form-group">
            <div id="finalPriceLabel">Final Price : </div>
            <div id="finalPrice"><strong>{{getFinalPrice()}}</strong></div>
          </div>
        </div>

      </div>

      <button @click="updateProduct" type="button" class="btn btn-primary">Update Product</button>
    </form>



  </div>
</template>

<script>
  import axios from "axios";

  export default {
    props: ['productDetail'],
    data(){
      return {
        product : this.productDetail
      }
    },
    methods:{
      getFinalPrice(){
        return this.product.originalPrice - (this.product.originalPrice * (this.product.discount/100));
      },

      async updateProduct(){
        this.product.categoryId = 11;
        this.product.supplierId = 5;
        const response = await axios.post('http://city-ecomm-customer.herokuapp.com/product/updateProduct' , this.product);
        if (response.data.resultCode === 100) {
          console.log(response.data);
         if(confirm("Product updated successfully")){
           location.href = '/products'
         }
        } else {
          alert(response.data.error)
          console.log(response.data.error);
        }
      }

    }
  }
</script>

<style scoped>

  h1{
    margin-top: 25px;
    color: #272C33;
    margin-bottom: 25px;
    font-family: Ubuntu;
  }

  #productIdLabel{
    color: #777777;
  }


  #productId{
    font-size: 25px;
    padding: 10px;
    color: #555555;
  }

  .form-group{
    margin-top: 20px;
  }

  input:hover{
    border-color: #272C33;
  }

  label{
    color: #555555;
    font-family: Ubuntu;
  }

  #finalPriceLabel{
    color: #555555;
  }

  #finalPrice{
    font-size: 25px;
    padding: 10px;
    color: #555555;
  }

  button{
    margin-top: 50px;
    background-color: #272C33;
    border-color: #272C33;
    padding: 10px;
    width: 30%;
  }

  button:hover{
    background-color: #555555;
    border-color: #272C33;
  }
</style>
