<template>
  <div class="container">

    <div class="row">
      <div class="col-5"><h3 style="font-family: Ubuntu ; color: #777777">Requested payments amount: </h3></div>
      <div class="col-2"><h3 >₹{{requestedPaymentsAmount}} </h3></div>
    </div>

    <div class="row">
      <div class="col-5"><h3 style="font-family: Ubuntu ; color: #777777">Pending payments amount: </h3></div>
      <div class="col-2">
        <div><h3>₹{{pendingPaymentsAmount}} </h3></div>
      </div>
      <div class="col-2">
        <button type="button" class="btn btn-primary btn-sm" @click="requestPayout()" v-if="this.pendingPaymentsAmount>0">Request Payment</button>
      </div>
    </div>

  </div>
</template>

<script>
  import axios from "axios";

  export default {

    created() {
      this.setPendingPaymentsAmount();
      this.setRequestedPaymentsAmount();
    },

    data() {
      return {
        requestedPaymentsAmount: '',
        pendingPaymentsAmount: ''
      }
    },


    methods: {
      async setPendingPaymentsAmount() {
        const response = await axios.get('http://city-ecomm-customer.herokuapp.com/payment/getPendingPaymentsAmount?sellerId=5');
        if (response.data.resultCode === 100) {
          console.log(response.data.data)
          this.pendingPaymentsAmount = response.data.data;
        } else {
          console.log(response.data.error)
        }
      },

      async setRequestedPaymentsAmount() {
        const response = await axios.get('http://city-ecomm-customer.herokuapp.com/payment/getRequestedPaymentsAmount?sellerId=5');
        if (response.data.resultCode === 100) {
          this.requestedPaymentsAmount = response.data.data;
          console.log(response.data.data)
        } else {
          console.log(response.data.error)
        }
      },

      async requestPayout(){
        if(confirm("Are you sure you want to request the payout for : " + this.pendingPaymentsAmount + '?')) {
          const response = await axios.post('http://city-ecomm-customer.herokuapp.com/payment/changePaymentStatus' , {
            businessId:5,
            status:2
          });
          if (response.data.resultCode === 100) {
            console.log(response.data)
            await this.setRequestedPaymentsAmount();
            await this.setPendingPaymentsAmount();
          } else {
            console.log(response.data.error)
          }
        }
      }

    }
  }
</script>

<style scoped>

  .container{
    margin-top: 50px;
    border: dashed #555555;
  }

  .row{
    margin-left: 20px;
    margin-bottom: 20px;
    margin-top: 20px;
  }

  button{
    border-color: #689f38;
    background-color: #689f38;
    color: white;
    width: 100%;
  }

</style>
