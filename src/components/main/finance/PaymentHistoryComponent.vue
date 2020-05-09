<template>
  <div class="container">
    <h4>Payment History</h4>
    <table class="table">
      <tr>
        <th scope="col">Date</th>
        <th scope="col">Transaction ID</th>
        <th scope="col">Amount</th>
        <th scope="col">Status</th>
      </tr>
      <tbody v-for="(payment, index) in payments">
      <tr id="row-element">
        <td><b>{{payment.dateTime}}</b></td>
        <td><b>{{payment.transactionId}}</b></td>
        <td><b>{{payment.amount}}</b></td>
        <td><b>Setteled</b></td>
      </tr>
      </tbody>
    </table>


  </div>

</template>

<script>
  import axios from "axios";

  export default {

    created() {
      this.setPaymentHistory();
    },

    data(){
      return{
        payments:[]
      }
    },

    methods: {
      async setPaymentHistory() {
        const response = await axios.get('http://city-ecomm-customer.herokuapp.com/payment/getPaymentHistory?sellerId=5');
        if (response.data.resultCode === 100) {
          console.log(response.data.data)
          this.payments = response.data.data;
        } else {
          console.log(response.data.error)
        }
      }
    }
  }
</script>

<style scoped>


  h4 {
    margin-top: 50px;
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
