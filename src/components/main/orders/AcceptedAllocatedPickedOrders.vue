<template>
  <div>
    <h4><b>Accepted, Allocated, Picked Orders</b></h4>
    <table class="table">
      <tr >
        <th scope="col"><b>Order ID</b></th>
        <th scope="col"><b>Product name</b></th>
        <th scope="col"><b>Price</b></th>
        <th scope="col"><b>Order State</b></th>
      </tr>
      <tbody v-for="(order, index) in orders">
      <tr id="row-element" visible="false">
        <td scope="row">#{{order.orderId}}</td>
        <td>
          <div class="container" v-for="orderDetails in order.orderDetails">
            <div class="row" style="margin-bottom: 40px">
              <div class="col"> <span class="label">ID:</span> <b>{{orderDetails.productId}}</b></div>
              <div class="col-10"><span class="label">Name: </span><b>{{orderDetails.productName}}</b></div>
              <div class="col-2"><span class="label">SKU: </span><b>{{orderDetails.sku}}</b></div>
              <div class="col-2"><span class="label">Price: </span><b>₹{{orderDetails.finalPrice}}</b></div>
              <div class="col-2"><span class="label">Quantity: </span><b>{{orderDetails.quantity}}</b></div>
            </div>
          </div>
        </td>
        <td>₹{{getFinalPrice(order)}}</td>
        <td v-bind:class="{  green : order.orderDetails[0].orderStateId === 4,
                             orange : order.orderDetails[0].orderStateId === 2 ,
                             blue : order.orderDetails[0].orderStateId===3 }">{{order.orderDetails[0].orderStateName}}</td>


      </tr>
      </tbody>
    </table>

  </div>
</template>

<script>
  export default {

    created() {
      console.log(`orders = ${JSON.stringify(this.orders)}`);
    },

    methods:{
      getFinalPrice(order){
        let finalPrice = 0
        for(let index = 0 ; index < order.orderDetails.length ; ++ index){
          finalPrice += order.orderDetails[index].finalPrice;
          console.log(finalPrice)
        }
        console.log(`finalPrice = ${finalPrice}`)
        return finalPrice
      }
    },

    props:['orders']
  }



</script>

<style scoped>
  h4{
    color: #666666;
    margin-top: 50px;
    margin-bottom: 30px;
  }

  td {
    font-size: 12px;
    color: #555555;
  }

  th {
    color: black;
    font-size: 14px;
    font-family: "Roboto";
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
