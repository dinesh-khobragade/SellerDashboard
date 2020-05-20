<template>
  <div id="container" style="justify-content: center ; display: flex" class="container-fluid">
    <div class="row">
      <div class="col" id="blueBlock" onclick="location.href='/products';" style="cursor: pointer; width: 300px">
        <div><h2>{{productsCount}}</h2></div>
        <div><h5>Products Count</h5></div>
      </div>

      <div class="col" id="redBlock" onclick="location.href='/orders';" style="cursor: pointer;">
        <div><h2>{{activeOrders}}</h2></div>
        <div><h5>Active Orders</h5></div>
      </div>

      <div class="col" id="orangeBlock" onclick="location.href='/orders';" style="cursor: pointer;">
        <div><h2>{{pendingOrders}}</h2></div>
        <div><h5>Pending Orders</h5></div>
      </div>

      <div class="col" id="greenBlock" onclick="location.href='/finance';" style="cursor: pointer;">
        <div><h2>₹{{totalEarned}}</h2></div>
        <div><h5>Total Earned</h5></div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['productsCount', 'activeOrders', 'pendingOrders' , 'totalEarned']
  }
</script>

<style scoped>


  #container {
    align-content: center;
  }

  h2 {
    color: #FFFFFF;
    font-family: source-code-pro, Menlo, Monaco, Consolas, Courier New, monospace;

  }

  h5 {
    color: #FFFFFF;
    font-size: 18px;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif
  }

  #greenBlock {
    margin: 30px;
    padding: 20px;
    text-align: center;
    background-color: #689f38
  }

  #redBlock {
    margin: 30px;
    padding: 20px;
    text-align: center;
    background-color: #ff5252
  }

  #orangeBlock {
    margin: 30px;
    padding: 20px;
    text-align: center;
    background-color: #ff8f00
  }

  #blueBlock {
    margin: 30px;
    padding: 20px;
    text-align: center;
    background-color: #448aff
  }

</style>
