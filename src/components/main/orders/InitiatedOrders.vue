<template>
  <div>
    <h4>Initiated Orders</h4>
    <table class="table" v-if="orders.length > 0">
      <tr>
        <th scope="col">Order ID</th>
        <th scope="col">Product</th>
        <th scope="col">Final Price</th>
        <th scope="col">Customer</th>
        <th scope="col">Date & Time</th>
        <th scope="col">Accept/Reject Order</th>
      </tr>
      <tbody v-for="(order, index) in orders">
      <tr id="row-element" visible="false">
        <td scope="row"><b>#{{order.orderId}}</b></td>
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

        <td>
          <div>
            <div>{{order.orderDetails[0].customerName}}</div>
            <div>{{order.orderDetails[0].flatno + " " + order.orderDetails[0].address + " " + order.orderDetails[0].landmark}},</div>
            <div>{{order.orderDetails[0].phoneNumber}}</div>
          </div>
        </td>
        <td>{{order.orderDetails[0].datetime}}</td>
        <td>
          <div>
            <button type="button" class="btn btn-outline-success" @click="accceptOrder(order.orderDetails[0])">Accept</button>
            <button type="button" class="btn btn-outline-danger" @click="rejectOrder(order.orderDetails[0])">Reject</button>

          </div>
        </td>
      </tr>
      </tbody>
    </table>


  </div>
</template>

<script>

  import axios from "axios";

  export default {
    props: ['orders'],

    created() {
      console.log(JSON.stringify(this.orders))
    },

    methods: {
      accceptOrder(order) {
        console.log(JSON.stringify(order))
        if(confirm("Are you sure you want to accept the Order - Order ID: " + order.orderId + '?')) {
          this.changeOrderStatus(order, 2)
        }
      },
      rejectOrder(order) {
        if(confirm("Do you really want to reject order - Order ID:  " + order.orderId + '?')) {
          this.changeOrderStatus(order, 6)
        }
      },
      async changeOrderStatus(order , orderStatus) {
        const response = await axios.post('http://city-ecomm-customer.herokuapp.com/order/changeOrderStatus', {
          "productId": order.productId,
          "orderStatus": orderStatus,
          "orderId": order.orderId
        });
        if(response.data.resultCode === 100){
          await this.$parent.getOrdersFromAPI();
        }else{
          alert(response.data.error)
        }
        console.log(response)
      },

      getFinalPrice(order){
        let finalPrice = 0
        for(let index = 0 ; index < order.orderDetails.length ; ++ index){
          finalPrice += order.orderDetails[index].finalPrice;
          console.log(finalPrice)
        }
        console.log(`finalPrice = ${finalPrice}`)
        return finalPrice
      }

    }
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
