<template>
  <div id="">
    <div class="" id="centerContainer">
        <div id="block">
          <app-registration-form></app-registration-form>
        </div>
      </div>
  </div>

</template>

<script>

  import RegisterUserForm from "./RegisterUserForm";

  export default {
    data() {
      return {
        // image:'https://media.istockphoto.com/photos/hands-forming-a-heart-shape-with-sunset-silhouette-picture-id636379014'
        image: backgroundUrl
      }
    },
    components:{
      appRegistrationForm:RegisterUserForm
    }
  }
</script>

<style scoped>
  #background {
    background-color: #555555;
  }

  #block{
    width: 500px;
    height: fit-content;
    background-color: white;
    border-radius: 10px;
  }

  #centerContainer{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    position: fixed;
    background-color: #555555;
  }

/*
  !* Add styles to the form container *!
  #container {
    width: 50%;
    height: 50%;
    background-color: white;
    margin: auto auto;
  }

*/


</style>
