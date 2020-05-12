<template>
<!--  <div id="background" :style="{'background-image':'url(https://vuejs.org/images/logo.png)'}">-->
<!--  <div id="background" :style="{'background-image':'url(https://images.pexels.com/photos/633198/pexels-photo-633198.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940)'}">-->


  <!--<div id="background" :style="{'background-image':'url(https://images.pexels.com/photos/897717/pexels-photo-897717.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940)'}">
    <div class="container" id="container">
      <div class="row justify-content-center h-100">
        <div class="col-4">Dinesh</div>
        <div class="col-8"><app-login-form></app-login-form></div>
      </div>
    </div>
  </div>-->

  <div id="">
    <div class="" id="centerContainer">
        <div id="block">
          <router-view ></router-view>
        </div>
      </div>
  </div>

</template>

<script>

  import LoginForm from "./LoginForm";

  export default {
    data() {
      return {
        // image:'https://media.istockphoto.com/photos/hands-forming-a-heart-shape-with-sunset-silhouette-picture-id636379014'
        image: backgroundUrl
      }
    },
    components:{
      appLoginForm:LoginForm
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
