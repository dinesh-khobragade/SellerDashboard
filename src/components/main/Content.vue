  <template>
    <div>
<!--      <app-header></app-header>-->
      <router-view></router-view>
     </div>
  </template>

  <script>
    import Header from "./Header";
    export default {
      components:{
        appHeader : Header
      }
    }
  </script>

  <style scoped>

  </style>
