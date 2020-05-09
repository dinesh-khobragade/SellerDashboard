<template>
  <div class="container">
    <h4><b>Trending products in market</b></h4>
    <table class="table">
<!--      <thead class="thead-light">-->
      <tr id="head">
        <th scope="col">Product ID</th>
        <th scope="col">Product Name</th>
        <th scope="col">SKU</th>
        <th scope="col">Price</th>
      </tr>
<!--      </thead>-->
      <tbody v-for="(product, index) in trendingProduct">
      <tr id="row-element">
        <td><b>{{product.id}}</b></td>
        <td><b>{{product.productName}}</b></td>
        <td><b>{{product.sku}}</b></td>
        <td><b>{{product.originalPrice}}</b></td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  export default {
    props: ['trendingProduct']
  }

</script>

<style scoped>
  h4 {
    margin-top: 100px;
    margin-bottom: 20px;
  }

  td{
    text-align: left;
  }

  th{
    text-align: left;
    color: #777777;
  }
</style>
