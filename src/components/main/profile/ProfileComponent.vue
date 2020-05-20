<template>
<div class="container">
  <div class="row">

    <div class="col-12">
      <h1 style="margin-top: 25px">Profile</h1>
    </div>

    <div class="col-12">
      <label for="businessName">Business Name:</label>
      <span id="businessName">{{getUser.businessName}}</span>
    </div>

    <div class="col-12">
      <label for="businessId">Business ID:</label>
      <span id="businessId">{{getUser.businessUserId}}</span>
    </div>

    <div class="col-12">
      <label for="address">Registered Address:</label>
      <span id="address">{{getUser.address}}</span>
    </div>


    <div class="col-12">
      <label for="phonenumber">Phone:</label>
      <span id="phonenumber">{{getUser.phoneNumber}}</span>
    </div>

    <div class="col-12">
      <label for="businessType">Business Type:</label>
      <span id="businessType">{{getUser.businessType === 1? "Hotel" : "Shop"}}</span>
    </div>

    <div class="col-12">
      <label for="latlong">Geo co-ordinates:</label>
      <span id="latlong">{{getUser.latlong}}</span>
    </div>



  </div>
</div>
</template>

<script>
    export default {
        computed:{
          getUser(){
            return this.$session.get('user')
          }
        }
    }
</script>

<style scoped>

  .col{
    width: auto;
  }

  label{
    color: #777777;
    font-family: "Ubuntu";
    padding: 10px;
  }

</style>
