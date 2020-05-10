<template>
<!--  <div id="background" :style="{'background-image':'url(https://vuejs.org/images/logo.png)'}">-->
<!--  <div id="background" :style="{'background-image':'url(https://images.pexels.com/photos/633198/pexels-photo-633198.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940)'}">-->
  <div id="background" :style="{'background-image':'url(https://images.pexels.com/photos/897717/pexels-photo-897717.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940)'}">
    <div class="container" id="container">
      <div class="row justify-content-center h-100">
        <div class="col-3">Dinesh</div>
        <div class="col-9">Khobragade</div>
      </div>
    </div>
  </div>
</template>

<script>

  export default {
    data() {
      return {
        // image:'https://media.istockphoto.com/photos/hands-forming-a-heart-shape-with-sunset-silhouette-picture-id636379014'
        image: backgroundUrl
      }
    }
  }
</script>

<style scoped>
  #background {
    position: fixed;
    height: 100%;
    width: 100%;
    background-color: #555555;
  }



  /* Add styles to the form container */
  #container {
    width: 50%;
    height: 50%;
    background-color: white;
    margin: 100px auto;
  }

  .col-3{
    margin: 0 0;
    height: 100%;
    background-color: #ff5252 ;
  }
  .col-9{
    margin: 0 0;
    height: 100%;
    background-color: #689f38;
  }




</style>
