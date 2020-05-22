<template>
  <div>
    <h4>Initiated Orders</h4>
    <table class="table" v-if="orders.length > 0">
      <tr>
        <th scope="col">Order ID</th>
        <th scope="col">Product</th>
        <th scope="col">Quantity</th>
        <th scope="col">Price</th>
        <th scope="col">Customer</th>
        <th scope="col">Date & Time</th>
        <th scope="col">Accept/Reject Order</th>
      </tr>
      <tbody v-for="(order, index) in orders">
      <tr id="row-element" visible="false">
        <td scope="row"><b>#{{order.orderId}}</b></td>
        <td>
          <div>
            <div> <span class="label">ID:</span> <b>{{order.productId}}</b></div>
            <div><span class="label">Name: </span><b>{{order.productName}}</b></div>
            <div><span class="label">SKU: </span><b>{{order.sku}}</b></div>
          </div>
        </td>

        <td>{{order.quantity}}</td>
        <td>₹{{order.finalPrice}}</td>

        <td>
          <div>
            <div>{{order.customerName}}</div>
            <div>{{order.address}},</div>
            <div>{{order.phoneNumber}}</div>
          </div>
        </td>
        <td>{{order.datetime}}</td>
        <td>
          <div>
            <button type="button" class="btn btn-outline-success" @click="accceptOrder(order)">Accept</button>
            <button type="button" class="btn btn-outline-danger" @click="rejectOrder(order)">Reject</button>

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
    methods: {
      accceptOrder(order) {
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
