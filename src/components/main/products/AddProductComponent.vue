<template>
  <div class="container">

    <div class="row">
      <div class="col">
        <h1>Product Details</h1>
      </div>
      <div class="col" style="display: flex ; justify-content: right">
        <div style="margin-top: 25px ; align-self: end">Product ID: <strong id="productId">{{this.product.id}}</strong></div>
      </div>
    </div>

    <form>
      <div class="row">

        <div class="col-4">
          <div class="form-group">
            <label for="productName">Product Name</label>
            <input v-model="product.productName" type="text" class="form-control" id="productName"
                   placeholder="Enter product name" @>
          </div>
        </div>

        <div class="col-4">
          <div class="form-group">
            <label for="supplierProductId">Supplier Product ID</label>
            <input v-model="product.supplierProductId" type="text" class="form-control" id="supplierProductId"
                   placeholder="Enter supplier product ID" @>
          </div>
        </div>


        <div class="col-4">
          <div class="form-group">
            <label for="productSku">Product SKU</label>
            <input v-model="product.sku" type="text" class="form-control" id="productSku"
                   placeholder="Enter product sku" @>
          </div>
        </div>

        <div class="col-8">
          <div class="form-group">
            <label for="productDescription">Product Description</label>
            <textarea v-model="product.description" class="form-control" id="productDescription" rows="6"></textarea>
          </div>
        </div>


        <div class="col-4">
          <div class="form-group">
            <label for="sizes">Select size (press cntrl to select multiple)</label>
            <select multiple size="6" class="form-control" id="sizes" v-model="selectedSizes" @change="setSize($event)">
              <option>XS</option>
              <option>S</option>
              <option>M</option>
              <option>L</option>
              <option>XL</option>
              <option>XXL</option>
            </select>
          </div>
        </div>


        <div class="col-4 form-group">
          <label for="category">Category</label>
          <select class="form-control" id="category" @change="setCategory($event)">
            <option selected>{{productDetail.categoryName}}</option>
            <option v-for="category in categories" :value="category.categoryId">{{category.categoryName}}</option>
          </select>
        </div>


        <div class="col-4  form-group">
          <label v-model="product.quantity" for="productQuantity">Quantity</label>
          <input type="number" class="form-control" id="productQuantity" placeholder="Enter quantity available" @>
        </div>


        <div class="col-3"><br><br><br>
          <div class="form-check ">
            <input type="checkbox" class="form-check-input" id="isProductActive" v-model="product.isActive">
            <label class="form-check-label" for="isProductActive">Is product active?</label>
          </div>
        </div>

        <div class="col-4">
          <div class="form-group">
            <label for="productPrice">Original Price(₹)</label>
            <input v-model="product.originalPrice" type="number" class="form-control" id="productPrice"
                   placeholder="Enter original product price" @>
          </div>
        </div>

        <div class="col-4">
          <div class="form-group">
            <label for="productDiscount">Discount(%)</label>
            <input v-model="product.discount" :max="100" type="number" class="form-control" id="productDiscount"
                   placeholder="Enter discount in percentage" @>
          </div>
        </div>

        <div class="col-2">
          <div class="form-group">
            <label for="finalPrice">Final Price</label>
            <div id="finalPrice"><strong>₹{{getFinalPrice()}}</strong></div>
          </div>
        </div>


        <div class="col-12">

          <div class="row">
            <div class="col-4">
              <div class="form-group">
                <label for="colorVariations">Select number of color variations</label>
                <select class="form-control" id="colorVariations" v-model="this.selectedColors.length" @change="setColorVariations($event)">
                  <option value="0" selected>Select number of color variations</option>
                  <option v-for="index in 10">{{index}}</option>
                </select>
              </div>
            </div>

            <div class="col-8">
              <div class="row">
                <div class="col-3" v-for="index in 10">
                  <div class="form-group" v-if="selectedColors && (index <= selectedColors.length)">
                    <label for="colors">Select color {{index}}</label>
                    <input type="color" id="colors" v-model="selectedColors[index-1]" @change="setColors($event , index)"><br><br>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>


        <label style="margin-top: 30px" class="col-12" for="productImage">Product Image</label>
        <div id="productImage" class="col-12"
             style="border-color: #272C33; border: #272C33; border-style: dashed ; align-items: center ;">

          <div class="flex" style="display: flex ;  justify-content: center">
            <img v-bind:src="product.imageUrl" class="rounded float-right"
                 style="margin-top: 20px ; margin-bottom: 20px ;  width: 25% ; height: 25%">
          </div>
          <div class="flex" style="display: flex ;  justify-content: center">
            <input ref="file" id="fileUpload" type="file" v-on:change="uploadImage()" hidden>
            <div class="btn btn-outline-primary" style="margin-bottom: 20px" type="button" @click="chooseFiles()">Upload
              product image
            </div>
          </div>
        </div>


        <div class="col-12" style="justify-content: center ; display: flex">
          <div id="uploadProduct" @click="updateProduct"  type="button" class="btn btn-primary btn-lg"
               style="margin-top: 20px ; margin-bottom: 50px ; ">Update Product
          </div>
          <!--         <button id="uploadProduct" @click="updateProduct" type="button" class="btn btn-primary">Update Product</button>-->
        </div>


      </div>
    </form>



  </div>
</template>

<script>
  import axios from "axios";

  export default {

    created() {
      console.log(this.product)
      this.getCategoriesList();
      this.selectedSizes = this.product.sizes?this.product.sizes:[]
      this.selectedColors = this.product.colors?this.product.colors:[];
    },

    props: ['productDetail'],
    data() {
      return {
        product: this.productDetail,
        categories: [],
        // numberOfColorVariations: 0,
        selectedSizes: [],
        selectedColors: []
      }
    },

    methods: {


      setCategory(event) {
        console.log(event.target.value)
        this.product.categoryId = event.target.value
      },

      setSize(event) {
        console.log(event.target.value)
        console.log(this.selectedSizes)
        // this.product.categoryId = event.target.value
      },

      setColorVariations(event) {
        console.log("set color variations")
        console.log(event.target.value)
        this.selectedColors.size = event.target.value
      },

      setColors(event, index) {
        console.log("set colors")
        console.log(event.target.value)
        this.selectedColors[index - 1] = event.target.value

        console.log(this.selectedColors.filter(value => {
          return value
        }))
      },

      getFinalPrice() {
        return this.product.originalPrice - (this.product.originalPrice * (this.product.discount / 100));
      },

      async updateProduct() {
        if (confirm("Are you sure you want to update product?")) {
          this.product.supplierId = this.$session.get('user').businessUserId;
          this.product.sizes = this.selectedSizes;
          this.product.colors = this.selectedColors.filter(value => {
            return value
          })
          console.log(JSON.stringify(this.product))
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
        await this.uploadFileToS3(file, this.product)
      },

      async uploadFileToS3(file, product) {
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
    color: #448aff;
    font-family: Ubuntu;
  }


  #finalPrice {
    font-size: 25px;
    padding: 5px;
    color: #555555;
  }

  #uploadProduct, #fileUpload {
    color: white;
    margin-top: 50px;
    background-color: #272C33;
    border-color: #272C33;
    padding: 10px;
    width: 30%;
  }

  #uploadProduct:hover {
    background-color: #555555;
    border-color: #272C33;
  }
</style>
