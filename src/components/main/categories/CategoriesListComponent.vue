<template>
  <div>
    <h1>Categories list</h1>
    <table class="table">
    <tr>
      <th scope="col"><b>Category ID</b></th>
      <th scope="col"><b>Category Name</b></th>
      <th scope="col"><b>Description</b></th>
      <th scope="col"><b>type</b></th>
      <th scope="col"><b>Image</b></th>
      <th scope="col"><b>Add image</b></th>
    </tr>
    <tbody v-for="(category , index) in categories">
    <tr id="row-element" visible="false">
      <td>{{category.categoryId}}</td>
      <td>{{category.categoryName}}</td>
      <td>{{category.categoryDescription}}</td>
      <td>{{category.businessType}}</td>
      <td>{{category.imageUrl}}</td>
<!--      <td><button type="button" class="btn btn-primary">Add Image</button></td>-->
      <td><input ref="files"  id="fileUpload" type="file" v-on:change="uploadImage(index)" hidden>
        <button @click="chooseFiles()">Choose</button></td>
    </tr>
    </tbody>
    </table>
  </div>
</template>

<script>
  export default {

    created() {
      this.getCategories();
    },

    data() {
      return {
        categories: []
      }
    },

    methods: {

      chooseFiles() {
        document.getElementById("fileUpload").click()
      },

      async uploadImage(index){
        console.log(index)
        console.log(this.$refs.files[index].files[0])
        let file = this.$refs.files[index].files[0];
        const response = await Vue.axios.get('/test');
        console.log(response)
      },

      async getCategories() {
        console.log("Categories")
        const response = await Vue.axios.get('/category/getCategoriesForBusiness?businessType=1');
        if (response.data.resultCode === 100) {
          console.log(response.data.data)
          this.categories = response.data.data
        } else {
          console.log(response.data.error)
        }
      },
    }

  }
</script>

<style scoped>

  tr{
    color: #555555;
  }

  td{
    color: #777777;
    font-family: Ubuntu;
  }

  tr:hover{
    background-color: #cccccc;
  }

</style>
