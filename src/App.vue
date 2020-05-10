<template>
  <!--<div id="app" class="container-fluid">
      <div class="row">
        <div class="col-2">
          <app-sidebar></app-sidebar>
        </div>
        <div class="col-10">
          <app-content></app-content>
        </div>
      </div>
  </div>-->

  <app-login></app-login>

</template>

<script>
  import Sidebar from "./components/Sidebar";
  import Content from "./components/main/Content";
  import LoginComponent from "./components/main/login/LoginComponent";

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
