<template>
  <div class="container-fluid">
    <app-initiated-orders :orders=this.initiatedOrders v-if="initiatedOrders.length > 0"></app-initiated-orders>
    <app-accepted-allocated-picked-orders :orders=this.acceptedAllocatedPickedOrders
                                          v-if="acceptedAllocatedPickedOrders.length > 0"></app-accepted-allocated-picked-orders>
    <app-accepted-delivered-rejected-orders :orders=this.rejectedDeliveredOrders
                                            v-if="rejectedDeliveredOrders.length > 0"></app-accepted-delivered-rejected-orders>
    <div class="jumbotron jumbotron-fluid" v-if="ordersGlobalList.length === 0">
      <div class="container">
        <h1 class="display-4">No Orders present</h1>
        <p class="lead">Currently there are no orders present</p>
      </div>
    </div>
  </div>
</template>

<script>
  import InitiatedOrders from "./InitiatedOrders";
  import AcceptedAllocatedPickedOrders from "./AcceptedAllocatedPickedOrders";
  import DeliveredRejectedOrders from "./DeliveredRejectedOrders";
  import axios from 'axios';

  export default {
    data() {
      return {
        ordersGlobalList: []
      }
    },

    computed: {
      initiatedOrders() {
        let initiatedOrders = this.ordersGlobalList.filter((order) => {
          return order.orderStateId === 1;
        })
        // console.log(`initieated orders = ${JSON.stringify(initiatedOrders)} ` )
        return initiatedOrders;
      },

      acceptedAllocatedPickedOrders() {
        let orders = this.ordersGlobalList.filter((order) => {
          return order.orderStateId === 2 ||
            order.orderStateId === 3 ||
            order.orderStateId === 4
            ;
        })
        return orders;
      },

      rejectedDeliveredOrders() {
        let orders = this.ordersGlobalList.filter((order) => {
          return order.orderStateId === 5 ||
            order.orderStateId === 6;
        })
        return orders;
      }
    },


    components: {
      appInitiatedOrders: InitiatedOrders,
      appAcceptedAllocatedPickedOrders: AcceptedAllocatedPickedOrders,
      appAcceptedDeliveredRejectedOrders: DeliveredRejectedOrders
    },

    methods: {
      async getOrdersFromAPI() {
        const response = await axios.get('http://city-ecomm-customer.herokuapp.com/order/getOrdersForSeller?sellerId=5');
        console.log("Dinesh")
        console.log(response.data)
        if (response.data.resultCode === 100) {
          this.ordersGlobalList = this.filterOrderWise(response.data.data);
          console.log(this.ordersGlobalList)
        } else {
          console.log(response.data.error)
        }
      },

      filterOrderWise(data) {
        // console.log(data)
        let orderIds = new Set();
        let finalResult = []
        let finalPrice = 0;

        for (let index = 0; index < data.length; ++index) {
          orderIds.add(data[index].orderId)
          // console.log(`index = ${data[index].orderId}`)
          // console.log(`orderIds = ${orderIds.size}`)
        }

        console.log(`orderIds = ${JSON.stringify(orderIds)}`)

        orderIds.forEach(orderId => {
          let orderDetails = data.filter((order) => {
            // console.log(JSON.stringify(order.orderId))
            // console.log(JSON.stringify(orderId))
            return order.orderId === orderId;
          })


          // console.log(`OrderDetails = ${JSON.stringify(orderDetails)}`)

          finalResult.push({
            orderId: orderId,
            orderStateId: orderDetails[0].orderStateId,
            orderDetails: orderDetails
          })
        })

        finalPrice = 0

        // console.log(`finalResult = ${JSON.stringify(finalResult)}`)

        return finalResult;
      }
    },

    async created() {
      await this.getOrdersFromAPI();
    }
  }
</script>

<style scoped>

  .table {
    margin-top: 50px;
  }

</style>
