<template>
  <div>
    <h4><b>Accepted, Allocated, Picked Orders</b></h4>
    <table class="table">
      <tr >
        <th scope="col">#</th>
        <th scope="col"><b>Order ID</b></th>
        <th scope="col"><b>Product name</b></th>
        <th scope="col"><b>Quantity</b></th>
        <th scope="col"><b>Price</b></th>
        <th scope="col"><b>Category</b></th>
        <th scope="col"><b>SKU</b></th>
        <th scope="col"><b>Order State</b></th>
      </tr>
      <tbody v-for="(order, index) in orders">
      <tr id="row-element" visible="false">
        <td scope="row">{{index+1}}</td>
        <td scope="row">{{order.orderId}}</td>
        <td>{{order.productName}}</td>
        <td>{{order.quantity}}</td>
        <td>{{100}}</td>
        <td>{{order.categoryName}}</td>
        <td>{{order.sku}}</td>
        <td v-bind:class="{  green : order.orderStateId == 4,
                             orange : order.orderStateId == 2 ,
                             blue : order.orderStateId==3 }">{{order.orderStateName}}</td>


      </tr>
      </tbody>
    </table>

  </div>
</template>

<script>
  export default {
    props:['orders']
  }

</script>

<style scoped>
  h4{
    color: #666666;
    margin-top: 50px;
    margin-bottom: 30px;
  }

  tr{
    color: #555555;
  }

  td{
    color: #777777;
    font-family: Ubuntu;
  }

  tr:hover{
    background-color: #cccccc;
  }

  .green{
   color: #689f38;
  }

  .orange{
    color: #ff8f00;
  }

  .blue{
    color: #448aff;
  }
</style>
