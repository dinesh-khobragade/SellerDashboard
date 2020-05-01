<template>
  <div id="app" class="container-fluid">
      <div class="row">
        <div class="col-1">
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


</style>
