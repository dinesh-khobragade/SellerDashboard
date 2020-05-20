<template>
  <div id="container" class="container-fluid">
    <div class="row">
      <div class="col-2" id="blueBlock">
        <div><h2>₹{{entireEarnings}}</h2></div>
        <div><h5>Overall Earned</h5></div>
      </div>

      <div class="col-2" id="redBlock">
        <div><h2>₹{{todaysEarnings}}</h2></div>
        <div><h5>Today's </h5></div>
      </div>

      <div class="col-2" id="orangeBlock">
        <div><h2>₹{{yesterdaysEarnings}}</h2></div>
        <div><h5>Yesterday's</h5></div>
      </div>

      <div class="col-2" id="greenBlock">
        <div><h2>₹{{thisMonthEarnings}}</h2></div>
        <div><h5>This Month</h5></div>
      </div>

      <div class="col-2" id="yellowBlock">
        <div><h2>₹{{lastMonthEarnings}}</h2></div>
        <div><h5>Last Month</h5></div>
      </div>


    </div>
  </div>
</template>

<script>
  import axios from "axios";

  export default {

    created() {
      this.setOverallEarned();
      this.setTodayEarned()
      this.setYesterdayEarned()
      this.setThisMonthEarned()
      this.setLastMonthEarned()
    },

    data(){
      return {
        entireEarnings:'',
        todaysEarnings:'',
        yesterdaysEarnings:'',
        thisMonthEarnings:'',
        lastMonthEarnings:'',

      }
    },

    methods: {

      async setOverallEarned() {
        const response = await axios.get('http://city-ecomm-customer.herokuapp.com/payment/getEntireEarning?sellerId=5');
        if (response.data.resultCode === 100) {
          console.log(response.data.data)
          this.entireEarnings = response.data.data;
        } else {
          console.log(response.data.error)
        }
      },
      async setTodayEarned() {
        const response = await axios.get('http://city-ecomm-customer.herokuapp.com/payment/getEarningToday?sellerId=5');
        if (response.data.resultCode === 100) {
          console.log(response.data.data)
          this.todaysEarnings = response.data.data;
        } else {
          console.log(response.data.error)
        }
      },
      async setYesterdayEarned() {
        const response = await axios.get('http://city-ecomm-customer.herokuapp.com/payment/getEarningYesterday?sellerId=5');
        if (response.data.resultCode === 100) {
          console.log(response.data.data)
          this.yesterdaysEarnings = response.data.data;
        } else {
          console.log(response.data.error)
        }
      },
      async setThisMonthEarned() {
        const response = await axios.get('http://city-ecomm-customer.herokuapp.com/payment/getEarningThisMonth?sellerId=5');
        if (response.data.resultCode === 100) {
          console.log(response.data.data)
          this.thisMonthEarnings = response.data.data;
        } else {
          console.log(response.data.error)
        }
      },
      async setLastMonthEarned() {
        const response = await axios.get('http://city-ecomm-customer.herokuapp.com/payment/getEarningLastMonth?sellerId=5');
        if (response.data.resultCode === 100) {
          console.log(response.data.data)
          this.lastMonthEarnings = response.data.data;
        } else {
          console.log(response.data.error)
        }
      },
    }
  }
</script>

<style scoped>

  .col {
    margin: 20px;
    padding: 20px;
    text-align: center;
    /*background-color: #689f38;*/
  }

  #container {
    align-content: center;
  }

  h2 {
    color: #FFFFFF;
    /*font-size: 50px;*/
    font-family: Roboto, 'Noto Sans', -apple-system, BlinkMacSystemFont, sans-serif;

  }

  h5 {
    color: #FFFFFF;
    font-size: 18px;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif
  }

  #greenBlock {
    margin: auto;
    padding: 20px;
    text-align: center;

    background-color: #689f38
  }

  #redBlock {
    margin: auto;
    padding: 20px;
    text-align: center;

    background-color: #ff5252
  }

  #orangeBlock {
    margin: auto;
    padding: 20px;
    text-align: center;
    background-color: #ff8f00
  }

  #blueBlock {
    margin: auto;
    padding: 20px;
    text-align: center;
    background-color: #448aff
  }

  #yellowBlock {
    margin: auto;
    padding: 20px;
    text-align: center;
    background-color: #272C33;
  }

</style>
