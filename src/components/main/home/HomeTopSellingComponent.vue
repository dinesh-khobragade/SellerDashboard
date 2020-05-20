<template style="justify-content: center ; display: flex">
  <div class="container">
    <h4><b>Top selling products</b></h4>
    <table class="table">
      <tr>
        <th scope="col">Product ID</th>
        <th scope="col">Product Name</th>
        <th scope="col">SKU</th>
        <th scope="col">Price</th>
      </tr>
      <tbody v-for="(product, index) in products">
      <tr id="row-element">
        <td><b>#{{product.id}}</b></td>
        <td><b>{{product.productName}}</b></td>
        <td><b>{{product.sku}}</b></td>
        <td><b>₹{{product.originalPrice}}</b></td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  export default {
    props: ['products']
  }

</script>

<style scoped>
  h4 {
    margin-top: 20px;
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
