<template>
  <div>
    <h4>Delivered, Rejected orders</h4>
    <input type="text" class="form-control" id="inlineFormInputName" placeholder="Search order"  v-if="orders.length > 0" v-model="searchTerm">
    <table class="table" v-if="orders.length > 0">
      <tr>
        <th scope="col">Order ID</th>
        <th scope="col">Product</th>
        <th scope="col">Quantity</th>
        <th scope="col">Price</th>
        <th scope="col">Customer</th>
        <th scope="col">Date & Time</th>
        <th scope="col">Order Status</th>
      </tr>
      <tbody v-for="(order, index) in filteredOrders">
      <tr id="row-element" visible="false">
        <th scope="row">#{{order.orderId}}</th>
        <td>
          <div>
            <div>Product ID: {{order.productId}}</div>
            <div>Name: {{order.productName}}</div>
          </div>
        </td>

        <td>{{order.quantity}}</td>
        <td>₹{{order.finalPrice}}</td>

        <td>
          <div>
            <div><b>{{order.customerName}}</b>,</div>
            <div>{{order.address}},</div>
            <div>{{order.phoneNumber}}</div>
          </div>
        </td>
        <td>{{order.datetime}}</td>
        <td v-bind:class="{  green : order.orderStateId == 5,
                             red : order.orderStateId == 6 }">{{order.orderStateName}}</td>


      </tr>
      </tbody>
    </table>

  </div>
</template>

<script>
  export default {
    props: ['orders'],

    data() {
      return {
        searchTerm: ''
      }
    },

    computed: {
      filteredOrders() {
        let filteredOrders = this.orders.filter((order) => {
          console.log(order)
          return order.productName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
            order.categoryName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
            order.sku.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
            String(order.productId).toLowerCase().includes(this.searchTerm.toLowerCase()) ||
            String(order.customerName).toLowerCase().includes(this.searchTerm.toLowerCase()) ||
            String(order.phoneNumber).toLowerCase().includes(this.searchTerm.toLowerCase()) ||
            String(order.orderId).toLowerCase().includes(this.searchTerm.toLowerCase());
        })
        return filteredOrders;
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

  .red{
    color: #ff5252;
  }

  #inlineFormInputName{
    width: 50%;
    margin-bottom: 20px;
  }
</style>
