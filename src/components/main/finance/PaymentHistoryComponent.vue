<template>
  <div class="container" v-if="this.payments && this.payments.length > 0 ">
    <h5 style="margin-top: 30px ; font-family: Ubuntu">Payment History</h5>
    <table class="table table-sm">
      <tr>
        <th scope="col">Date</th>
        <th scope="col">Transaction ID</th>
        <th scope="col">Amount</th>
        <th scope="col">Status</th>
      </tr>
      <tbody v-for="(payment, index) in payments">
      <tr id="row-element">
        <td>{{payment.dateTime}}</td>
        <td>#{{payment.transactionId}}</td>
        <td>₹{{payment.amount}}</td>
        <td>Setteled</td>
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
    font-family: "Ubuntu Light";
    text-align: left;
  }

  tr:hover{
    background-color: #cfcfcf;
  }

  th{
    text-align: left;
    color: #777777;
  }
</style>
