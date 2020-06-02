<template>
  <div>
    <h4>Delivered, Rejected orders</h4>
    <input type="text" class="form-control" id="inlineFormInputName" placeholder="Search order"  v-if="orders.length > 0" v-model="searchTerm">
    <table class="table" v-if="orders.length > 0">
      <tr>
        <th scope="col">Order ID</th>
        <th scope="col">Product</th>
        <th scope="col">Final Price</th>
        <th scope="col">Customer</th>
        <th scope="col">Date & Time</th>
        <th scope="col">Order Status</th>
      </tr>
      <tbody v-for="(order, index) in filteredOrders">
      <tr id="row-element" visible="false">
        <th scope="row">#{{order.orderId}}</th>
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
            <div><b>{{order.orderDetails[0].customerName}}</b>,</div>
            <div>{{order.orderDetails[0].address}},</div>
            <div>{{order.orderDetails[0].phoneNumber}}</div>
          </div>
        </td>
        <td>{{order.orderDetails[0].datetime}}</td>
        <td v-bind:class="{  green : order.orderDetails[0].orderStateId === 5,
                             red : order.orderDetails[0].orderStateId === 6 }">{{order.orderDetails[0].orderStateName}}</td>


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

    computed: {
      filteredOrders() {
        let filteredOrders = this.orders.filter((order) => {
          console.log(order)
          return order.orderDetails[0].productName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
            order.orderDetails[0].categoryName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
            order.orderDetails[0].sku.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
            String(order.orderDetails[0].productId).toLowerCase().includes(this.searchTerm.toLowerCase()) ||
            String(order.orderDetails[0].customerName).toLowerCase().includes(this.searchTerm.toLowerCase()) ||
            String(order.orderDetails[0].phoneNumber).toLowerCase().includes(this.searchTerm.toLowerCase()) ||
            String(order.orderDetails[0].orderId).toLowerCase().includes(this.searchTerm.toLowerCase());
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
