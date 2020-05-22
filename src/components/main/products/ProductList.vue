<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col"><h1>Products</h1></div>
      <div class="col">
        <div class="row d-flex flex-row-reverse" id="productActions">
          <div class="col-4">
            <div class="custom-file">
              <input ref="files" id="files" type="file" v-on:change="bulkUploadProducts" hidden>
              <button class="btn btn-primary btn-sm" @click="chooseFiles()">Upload products CSV</button>

            </div>
          </div>

          <div class="col-4 text-center">
            <button type="button" id="buttonDownloadFile" class="btn btn-primary btn-sm">

              <a id="anchor" href="https://dinotest2k18.s3.ap-south-1.amazonaws.com/products.csv"
                 download="proposed_file_name">Download Sample CSV file</a>

            </button>
          </div>
        </div>
      </div>
    </div>
    <app-products-list-table></app-products-list-table>


  </div>
</template>

<script>
  import Papa from 'papaparse';
  import axios from 'axios';
  import ProductsListTable from "./ProductsListTable";


  export default {

    components: {
      AppProductsListTable: ProductsListTable
    },


    data() {
      return {}
    },

    methods: {

      chooseFiles() {
        document.getElementById("files").click()
      },


      async bulkUploadProducts() {
        this.productList = await this.readProducts();
        await this.uploadAllProductsToServer()
      },

      getBulkAddProductRequest() {
        let productList = [];
        for (let index = 0; index < this.productList.length - 1; ++index) {
          productList.push(this.getSingleAddProductRequestObject(this.productList[index]));
        }
        return productList;
      },

      getSingleAddProductRequestObject(product) {
        return {
          "categoryId": 50,
          "name": product.Name,
          "discount": parseFloat(product.Discount),
          "description": product.Description,
          "imageUrl": product.ImageUrl,
          "supplierProductId": product.Id,
          "sku": product.SKU,
          "businessType": 1,
          "isTrending": false,
          "isBestDeal": false,
          "isActive": product.isActive === 1,
          "sizes": null,
          "colors": null,
          "originalPrice": parseFloat(product.Price),
          "quantity": parseInt(product.Quantity),
          "supplierId": this.$session.get('user').businessUserId
        }
      },

      async uploadAllProductsToServer() {
        console.log(this.getBulkAddProductRequest());
        const response = await axios.post('http://city-ecomm-customer.herokuapp.com/product/bulkAddProduct', {
          products: this.getBulkAddProductRequest()
        });
        if (response.data.resultCode === 100) {
          location.href = "/products"
          alert("Data uploaded successfully")
        } else {
          alert(response.data.error);
        }
        console.log(response);
      },

      readProducts() {
        return new Promise(resolve => {
          Papa.parse(this.$refs.files.files[0], {
            header: true,
            complete: results => {
              // console.log('Complete', results.data.length, 'records.');
              resolve(results.data);
              // this.test(results.data)
            }
          });
        });
      },
    }
  }
</script>

<style scoped>

  button {
    margin-top: 25px;
    padding: 10px;
    border: #272C33;
    width: 100%;
    color: white;
    font-family: Ubuntu;
    background-color: #272C33;
  }

  button:hover {
    background-color: grey;
  }

  a {
    color: #dddddd;
  }

  /* CSS link color (red) */
  a:hover {
    color: #dddddd;
    text-decoration: none;
  }

  /* CSS link hover (green) */

  #uploadFile {
    box-shadow: none;
    font-size: 18px;
    border-color: #1D1919;
  }

  #productActions {
    margin-left: 0px;
    margin-right: 20px;
  }

  #anchor {
    color: white;
  }

  h1 {
    margin-top: 25px;
    font-family: Ubuntu;
    margin-bottom: 25px;
    padding-left: 10px;
  }

</style>
