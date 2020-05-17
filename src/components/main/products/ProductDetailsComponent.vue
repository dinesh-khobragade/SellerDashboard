<template>
  <div class="container">
    <h1>Product Details</h1>


    <div>Product ID: <strong id="productId">{{this.product.id}}</strong></div>

    <form>
      <div class="form-group">
        <label for="productName">Product Name</label>
        <input v-model="product.productName" type="text" class="form-control" id="productName"
               placeholder="Enter product name" @>
      </div>

      <div class="form-group">
        <label for="supplierProductId">Supplier Product ID</label>
        <input v-model="product.supplierProductId" type="text" class="form-control" id="supplierProductId"
               placeholder="Enter supplier product ID" @>
      </div>

      <div class="form-group">
        <label for="productDescription">Product Description</label>
        <input v-model="product.description" type="text" class="form-control" id="productDescription"
               placeholder="Enter product description" @>
      </div>

      <div class="row">
        <div class="col">
          <div class="form-group">
            <label for="productSku">Product SKU</label>
            <input v-model="product.sku" type="text" class="form-control" id="productSku"
                   placeholder="Enter product sku" @>
          </div>
        </div>

        <div class="col">
          <div class="form-group">
            <label for="category">Category</label>
            <select class="form-control" id="category" @change="setCategory($event)">
              <option selected>{{productDetail.categoryName}}</option>
              <option v-for="category in categories" :value="category.categoryId">{{category.categoryName}}</option>
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
            <input v-model="product.originalPrice" type="number" class="form-control" id="productPrice"
                   placeholder="Enter original product price" @>
          </div>
        </div>

        <div class="col">
          <div class="form-group">
            <label for="productDiscount">Discount</label>
            <input v-model="product.discount" :max="100" type="number" class="form-control" id="productDiscount"
                   placeholder="Enter discount in percentage" @>
          </div>
        </div>

        <div class="col-3">
          <div class="form-group">
            <div id="finalPriceLabel">Final Price :</div>
            <div id="finalPrice"><strong>{{getFinalPrice()}}</strong></div>
          </div>
        </div>
      </div>

      <input ref="file" id="fileUpload" type="file" v-on:change="uploadImage()" hidden>
      <button type="button" @click="chooseFiles()">Upload product image</button>

      <img v-bind:src="product.imageUrl" class="rounded float-right" width="200" height="200">


    </form>

    <button @click="updateProduct" type="button" class="btn btn-primary">Update Product</button>


  </div>
</template>

<script>
  import axios from "axios";

  export default {

    created() {
      this.getCategoriesList();
    },

    props: ['productDetail'],
    data() {
      return {
        product: this.productDetail,
        categories:[]
      }
    },

    methods: {

      setCategory(event){
        console.log(event.target.value)
        this.product.categoryId = event.target.value
      },

      getFinalPrice() {
        return this.product.originalPrice - (this.product.originalPrice * (this.product.discount / 100));
      },

      async updateProduct() {
        this.product.supplierId = this.$session.get('user').businessUserId;
        const response = await axios.post('http://city-ecomm-customer.herokuapp.com/product/updateProduct', this.product);
        if (response.data.resultCode === 100) {
          console.log(response.data);
          if (confirm("Product updated successfully")) {
            location.href = '/products'
          }
        } else {
          alert(response.data.error)
          console.log(response.data.error);
        }
      },

  async getCategoriesList() {
        const response = await axios.get(`http://city-ecomm-customer.herokuapp.com/category/getCategoriesForBusiness?businessType=${this.$session.get('user').businessType}`);
        if (response.data.resultCode === 100) {
          console.log(response.data);
          this.categories = response.data.data
        } else {
          alert(response.data.error)
          console.log(response.data.error);
        }
      },

      chooseFiles() {
        document.getElementById("fileUpload").click()
      },

      async uploadImage() {
        console.log("test")
        console.log(this.$refs.file.files[0])
        let file = this.$refs.file.files[0]
        await this.uploadFileToS3(file , this.product)
      },

      async uploadFileToS3(file , product) {
        let bucketRegion = "ap-south-1";
        let IdentityPoolId = "ap-south-1:cccdac2e-bfb0-44eb-810c-fa791e5cd3f0";

        AWS.config.update({
          region: bucketRegion,
          credentials: new AWS.CognitoIdentityCredentials({
            IdentityPoolId: IdentityPoolId
          })
        });

        // Use S3 ManagedUpload class as it supports multipart uploads
        let upload = new AWS.S3.ManagedUpload({
          params: {
            Bucket: "nearbyrush",
            Key: `productImages/${this.productDetail.id}/main`,
            Body: file,
            ACL: "public-read"
          }
        });

        let promise = upload.promise();
        promise.then(
          async function (data) {
            console.log(data)
            alert("Image uploaded successfully")
            product.imageUrl = data.Location;
          },
          function (err) {
            console.log(err)
            return alert("There was an error uploading your photo: ", err.message);
          }
        );
      },

    }
  }
</script>

<style scoped>

  h1 {
    margin-top: 25px;
    color: #272C33;
    margin-bottom: 25px;
    font-family: Ubuntu;
  }

  #productIdLabel {
    color: #777777;
  }


  #productId {
    font-size: 25px;
    padding: 10px;
    color: #555555;
  }

  .form-group {
    margin-top: 20px;
  }

  input:hover {
    border-color: #272C33;
  }

  label {
    color: #555555;
    font-family: Ubuntu;
  }

  #finalPriceLabel {
    color: #555555;
  }

  #finalPrice {
    font-size: 25px;
    padding: 10px;
    color: #555555;
  }

  button, #fileUpload {
    color: white;
    margin-top: 50px;
    background-color: #272C33;
    border-color: #272C33;
    padding: 10px;
    width: 30%;
  }

  button:hover {
    background-color: #555555;
    border-color: #272C33;
  }
</style>
