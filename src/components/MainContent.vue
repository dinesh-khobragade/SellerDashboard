<template>
  <div id="app" class="container-fluid">
    <div class="row">
      <div class="col-2">
        <app-sidebar></app-sidebar>
      </div>
      <div class="col-10">
        <app-content></app-content>
      </div>
    </div>
  </div>


</template>

<script>


  import Sidebar from "./Sidebar";
  import LoginComponent from "./main/login/LoginComponent";
  import Content from "./main/Content";

  export default {
    components: {
      appSidebar : Sidebar,
      appContent : Content,
      appLogin:LoginComponent
    }
  }
</script>

<style>
  #app {

  }
  body, html {
    height: 100%;
  }

</style>
