<template>
  <div class="container-fluid" >
    <div class="row" id="productActions">
      <div class="col-6">
        <div class="custom-file" >
          <input type="file" id="files" ref="files" class="custom-file-input  btn-primary btn-sm"
                 aria-describedby="inputGroupFileAddon01" v-on:change="bulkUploadProducts()">
          <label class="custom-file-label  btn-primary btn-lg" id="uploadFile" for="files">Choose file to upload products</label>
        </div>
      </div>

      <div class="col-3 text-center">
        <button type="button" id="buttonDownloadFile" class="btn btn-primary btn-sm" @click="downloadCsv()">

          <a href="https://dinotest2k18.s3.ap-south-1.amazonaws.com/products.csv" download="proposed_file_name">Download Sample CSV file</a>

        </button>
      </div>

      <div class="col-3 text-center" id="buttonAddProducts">
        <button type="button" class="btn btn-primary btn-sm">Add Product</button>
      </div>

    </div>

    <app-products-list-table></app-products-list-table>


    <v-dialog/>


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

      downloadCsv() {

      },

      showErrorDialog(message) {
        this.$modal.show('dialog', {
          title: 'Error',
          text: message,
          buttons: [
            {
              title: 'Close'
            }
          ]
        })
      },

      showSuccessDialog(message) {
        this.$modal.show('dialog', {
          title: 'Success',
          text: message,
          buttons: [
            {
              title: 'Close'
            }
          ]
        })
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
          "categoryId": 2,
          "name": product.Name,
          "discount": parseFloat(product.Discount),
          "description": product.Description,
          "imageUrl": product.ImageUrl,
          "supplierProductId": "123123",
          "sku": product.SKU,
          "businessType": 1,
          "isTrending": false,
          "isBestDeal": false,
          "isActive": true,
          "sizes": null,
          "colors": null,
          "originalPrice": parseFloat(product.Price),
          "quantity": parseInt(product.Price),
          "supplierId": null
        }
      },

      async uploadAllProductsToServer() {
        console.log(this.getBulkAddProductRequest());
        const response = await axios.post('http://city-ecomm-customer.herokuapp.com/product/bulkAddProduct', {
          products: this.getBulkAddProductRequest()
        });
        if (response.data.resultCode === 100) {
          this.showSuccessDialog("Data uploaded successfully")
        } else {
          this.showErrorDialog(response.data.error);
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
    padding-top: 10px;
    padding-bottom: 10px;
    padding-left: 15px;
    padding-right: 15px;
    border: #1D1919;
    width: 100%;
    color: #dddddd;
    background-color: #1D1919;
  }

  button:hover {
    background-color: grey;
  }

  a { color: #dddddd; } /* CSS link color (red) */
  a:hover { color: #dddddd;
    text-decoration: none;
  } /* CSS link hover (green) */

  #uploadFile {
    box-shadow: none;
    font-size: 18px;
    border-color: #1D1919;
  }

  #productActions{
    margin-left: 0px;
    margin-right: 20px;
   }


</style>
