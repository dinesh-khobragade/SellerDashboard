<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-6">
        <!--        <button type="button" class="btn btn-primary btn-lg" @click="bulkUploadProducts">Bulk Upload</button>-->
        <div class="custom-file">
          <input type="file" id="files" ref="files" class="custom-file-input  btn-primary btn-lg"
                 aria-describedby="inputGroupFileAddon01" v-on:change="bulkUploadProducts()">
          <label class="custom-file-label  btn-primary btn-lg" for="files">Choose file</label>
        </div>
      </div>

      <div class="col-3">
        <button type="button" class="btn btn-primary btn-lg">Add Product</button>
      </div>
      <div class="col-3">
        <button type="button" class="btn btn-primary btn-lg" @click="downloadCsv()">Download Sample CSV</button>
      </div>
    </div>

    <vue-table-dynamic :params="products"></vue-table-dynamic>

    <v-dialog/>

  <!--  <data-table
      url="localhost"
      :per-page="perPage"
      :data="rows"
      :columns="columns">
    </data-table>-->
<!--

    <DataTable
      :header-fields="columns"
      :data="rows"
      :css="datatableCss"
    />
-->


    <table class="table">
      <thead class="thead-dark">
      <tr>
        <th scope="col">#</th>
        <th scope="col">First</th>
        <th scope="col">Last</th>
        <th scope="col">Handle</th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <th scope="row">1</th>
        <td>Mark</td>
        <td>Otto</td>
        <td>@mdo</td>
      </tr>
      <tr>
        <th scope="row">2</th>
        <td>Jacob</td>
        <td>Thornton</td>
        <td>@fat</td>
      </tr>
      <tr>
        <th scope="row">3</th>
        <td>Larry</td>
        <td>the Bird</td>
        <td>@twitter</td>
      </tr>
      </tbody>
    </table>

    <table class="table">
      <thead class="thead-light">
      <tr>
        <th scope="col">#</th>
        <th scope="col">First</th>
        <th scope="col">Last</th>
        <th scope="col">Handle</th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <th scope="row">1</th>
        <td>Mark</td>
        <td>Otto</td>
        <td>@mdo</td>
      </tr>
      <tr>
        <th scope="row">2</th>
        <td>Jacob</td>
        <td>Thornton</td>
        <td>@fat</td>
      </tr>
      <tr>
        <th scope="row">3</th>
        <td>Larry</td>
        <td>the Bird</td>
        <td>@twitter</td>
      </tr>
      </tbody>
    </table>

  </div>
</template>

<script>
  import Papa from 'papaparse';
  import ProductListItem from "./ProductListItem";
  import VueTableDynamic from 'vue-table-dynamic';
  import axios from 'axios';
  import { DataTable } from 'v-datatable-light'


  export default {

    components: {
      appProductList: ProductListItem,
      VueTableDynamic,
      DataTable
    },


    data() {
      return {
        datatableCss: {
          table: 'table table-bordered table-hover table-striped table-center',
          theadTr: 'header-item',
          thWrapper: 'th-wrapper',
          thWrapperCheckboxes: 'th-wrapper checkboxes',
          arrowsWrapper: 'arrows-wrapper',
          arrowUp: 'arrow up',
          arrowDown: 'arrow down',
          footer: 'footer'
        },
        productList: [],
        perPage: ['10', '25', '50'],
        columns: [
          {
            label: 'ID',
            name: 'id',
            filterable: true,
          },
          {
            label: 'Name',
            name: 'name',
            filterable: true,
          },
          {
            label: 'Description',
            name: 'description',
            filterable: true,
          },
          {
            label: 'Image',
            name: 'imageUrl',
            filterable: false,
          },
        ],
        rows:[
          {
            id: 20,
            name: "Blenders Pride",
            description: "brownie",
            imageUrl: "www.google.com",

          }
        ],
        products: {
          data: [
            // ['Id', 'Category', 'Name', 'Price', 'Discount', 'Description', 'ImageUrl', 'SKU', 'isActive', 'Quantity'],
            // ['Id', 'Category', 'Name', 'Price'],
            // ["1"	,"Electronics",'Laptop'	,'50000']
          ],
          header: 'row',
          border: true,
          highlight: {row: [0]},
          highlightedColor: 'rgb(243, 235, 200)',
          enableSearch: true
          // columnWidth: [{column: 0, width: '5%'}]
        },
      }
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
        this.populateListToDisplay(this.productList);
        await this.uploadAllProductsToServer()
      },

      populateListToDisplay(products) {
        this.products.data.push(['Id', 'Category', 'Name', 'Price', 'Discount', 'Description', 'ImageUrl', 'SKU', 'Quantity'])
        for (let index = 0; index < products.length; ++index) {
          this.products.data.push([products[index].Id, products[index].Category, products[index].Name,
            products[index].Price, products[index].Discount, products[index].Description, products[index].ImageUrl,
            products[index].SKU, products[index].Quantity]);
        }
        console.log('dinesh');

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

      handleFileUploads() {
        console.log("Dinesh")
        console.log(this.$refs.files.files)
        let file = this.$refs.files.files[0];
        let products = [];
        Papa.parse(file, {
            header: true,
            // step: function (result) {
            //   console.log('step')
            //   // console.log(result)
            //
            // },
            complete: function (results, file) {
              console.log('Complete');
              console.log(results)
              products = results;
            }
          }
        )
      }
    }

  }
</script>

<style scoped>
    /* Datatable CSS */

  .v-datatable-light .row-2 {
    color: red;
  }

  #app .v-datatable-light .header-column-3 {
    color: green;
  }

  #app .v-datatable-light .header-column-4 {
    color: yellow;
  }

  #app .v-datatable-light .header-column-5 {
    color: pink;
  }

  #app .v-datatable-light .header-column-6 {
    color: blueviolet;
  }

  #app .v-datatable-light .row-2 {
    color: goldenrod;
  }

  #app .v-datatable-light .row-2 .column-2{
    color: purple;
  }

  #app .v-datatable-light .row-3 {
    color: silver;
  }

  #app .v-datatable-light .row-5 .column-1, #app .v-datatable-light .row-5 .column-6 {
    color: rosybrown;
  }

  #app .v-datatable-light .row-7 .column-4 {
    color: steelblue;
  }

  #app .v-datatable-light .row-9 .column-5 {
    color: springgreen;
  }

  #app .v-datatable-light .row-4 {
    color: mediumturquoise;
  }

  .v-datatable-light .header-item {
    cursor: pointer;
    color: #337ab7;
    transition: color 0.15s ease-in-out;
  }

  .v-datatable-light .header-item:hover {
    color: #ed9b19;
  }

  .v-datatable-light .header-item.no-sortable{
    cursor: default;
  }
  .v-datatable-light .header-item.no-sortable:hover {
    color: #337ab7;
  }

  .v-datatable-light .header-item .th-wrapper {
    display: flex;
    width: 100%;
    height: 100%;
    font-weight: bold;
  }

  .v-datatable-light .header-item .th-wrapper.checkboxes {
    justify-content: center;
  }

  .v-datatable-light .header-item .th-wrapper .arrows-wrapper {
    display: flex;
    flex-direction: column;
    margin-left: 10px;
    justify-content: space-between;
  }

  .v-datatable-light .header-item .th-wrapper .arrows-wrapper.centralized {
    justify-content: center;
  }

  .v-datatable-light .arrow {
    transition: color 0.15s ease-in-out;
    width: 0;
    height: 0;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
  }

  .v-datatable-light .arrow.up {
    border-bottom: 8px solid #337ab7;
  }

  .v-datatable-light .arrow.up:hover {
    border-bottom: 8px solid #ed9b19;
  }

  .v-datatable-light .arrow.down {
    border-top: 8px solid #337ab7;
  }

  .v-datatable-light .arrow.down:hover {
    border-top: 8px solid #ed9b19;
  }

  .v-datatable-light .footer {
    display: flex;
    justify-content: space-between;
    width: 500px;
  }
  /* End Datatable CSS */

  /* Pagination CSS */
  .v-datatable-light-pagination {
    list-style: none;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin: 0;
    padding: 0;
    width: 300px;
    height: 30px;
  }

  .v-datatable-light-pagination .pagination-item {
    width: 30px;
    margin-right: 5px;
    font-size: 16px;
    transition: color 0.15s ease-in-out;
  }

  .v-datatable-light-pagination .pagination-item.selected {
    color: #ed9b19;
  }

  .v-datatable-light-pagination .pagination-item .page-btn {
    background-color: transparent;
    outline: none;
    border: none;
    color: #337ab7;
    transition: color 0.15s ease-in-out;
  }

  .v-datatable-light-pagination .pagination-item .page-btn:hover {
    color: #ed9b19;
  }

  .v-datatable-light-pagination .pagination-item .page-btn:disabled{
    cursor: not-allowed;
    box-shadow: none;
    opacity: .65;
  }
  /* END PAGINATION CSS */

  /* ITEMS PER PAGE DROPDOWN CSS */
  .item-per-page-dropdown {
    background-color: transparent;
    min-height: 30px;
    border: 1px solid #337ab7;
    border-radius: 5px;
    color: #337ab7;
  }
  .item-per-page-dropdown:hover {
    cursor: pointer;
  }

</style>
