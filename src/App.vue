<template>
  <div id="app" class="container-fluid h-100">
      <div class="row  h-100">
        <div class="col-1.5">
          <app-sidebar></app-sidebar>
        </div>
        <div class="col">
          <app-content></app-content>
        </div>
      </div>
  </div>
</template>

<script>
  import Sidebar from "./components/Sidebar";
  import Content from "./components/main/Content";

  export default {
    components: {
      appSidebar : Sidebar,
      appContent : Content
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
