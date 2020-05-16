<template>

  <div class="container">
    <h1>Add Categories</h1>
    <div class="row" id="categories">
      <div class="col-6">
        <div class="custom-file">
          <input type="file" id="files" ref="files" class="custom-file-input  btn-primary btn-sm"
                 aria-describedby="inputGroupFileAddon01" v-on:change="uploadCategories">
          <label class="custom-file-label  btn-primary btn-lg" id="uploadFile" for="files">Choose file to upload
            categories</label>
        </div>
      </div>
    </div>

    <categories-list></categories-list>


  </div>

</template>

<script>
  import Papa from "papaparse";
  import CategoriesListComponent from "./CategoriesListComponent";

  export default {

    components: {
      categoriesList: CategoriesListComponent
    },

    methods: {

      async uploadCategories() {
        let categories = await this.getCategorisFromFile();
        const response = await Vue.axios.post('/category/bulkAddCategory', {
          categories: categories
        });
        if (response.data.resultCode === 100) {
          console.log(response.data.data)
          alert("Categories uploaded")
        } else {
          alert(response.data.error)
          console.log(response.data.error)
        }
      },

      getCategorisFromFile() {
        return new Promise(resolve => {
          Papa.parse(this.$refs.files.files[0], {
            header: true,
            complete: results => {
              console.log(results)
              resolve(results.data);
            }
          });
        });
      }
    }
  }
</script>

<style scoped>

  h1 {
    margin-top: 25px;
    margin-bottom: 25px;
  }

  #categories {
    margin-bottom: 25px;
  }

</style>
