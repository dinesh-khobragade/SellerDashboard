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
        <td><input ref="files" id="fileUpload" type="file" v-on:change="uploadImage(index , category)" hidden>
          <button @click="chooseFiles()">Choose</button>
        </td>
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

      async uploadImage(index , category) {
        console.log(index)
        console.log(this.$refs.files[index].files[0])
        let file = this.$refs.files[index].files[0];
        await this.uploadFileToS3(file, category.categoryName , category.categoryId)
      },

      async uploadFileToS3(file, categoryName , categoryId) {
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
            Key: `categoryImages/${categoryName}`,
            Body: file,
            ACL: "public-read"
          }
        });

        let promise = upload.promise();
        promise.then(
          async function (data) {
            console.log(data)

            const response = await Vue.axios.post('/category/updateCategoryImage' , {
              categoryId:categoryId,
              imageUrl: data.Location
            });
            if (response.data.resultCode === 100) {
              console.log(response.data.data)
              alert("Successfully uploaded image.");
              return data.location;
            } else {
              alert("error updating category " + response.data.err);
              console.log(response.data.error)
            }
          },
          function (err) {
            console.log(err)
            return alert("There was an error uploading your photo: ", err.message);
          }
        );
      },

      async updateCategoryUrl(){

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

  tr {
    color: #555555;
  }

  td {
    color: #777777;
    font-family: Ubuntu;
  }

  tr:hover {
    background-color: #cccccc;
  }

</style>
