<template>
  <div class="container">
    <h2>Register User</h2>
    <form>

      <md-field>
        <label>Enter Business name</label>
        <md-input v-model="businessUser.businessName" placeholder="Enter business name"></md-input>
      </md-field>


      <md-field>
        <label>Enter address</label>
        <md-input v-model="businessUser.address" placeholder="Enter address"></md-input>
      </md-field>


      <md-field>
        <label>Enter phone number</label>
        <md-input type="phone" v-model="businessUser.phoneNumber" placeholder="Enter phone number"></md-input>
      </md-field>


      <md-field>
        <label>Enter username</label>
        <md-input v-model="businessUser.username" placeholder="Enter username"></md-input>
      </md-field>

      <md-field>
        <label>Enter password</label>
        <md-input type="password" v-model="businessUser.password" placeholder="Enter password"></md-input>
      </md-field>

      <md-field >
        <label>Enter Latitude, Longitude</label>
        <md-input type="location" v-model="latLong" placeholder="Enter Latitude Longitude" @focus="setLatLong"></md-input>
      </md-field>
      <small>Hint: Use google map to fetch the exact latitude, longitude<a href="http://maps.google.com"> map</a> </small>


      <md-field>
        <label for="businessType">Business type</label>
        <md-select v-model="businessUser.businessType" name="Business Type" id="businessType">
          <md-option value="1">Shop</md-option>
          <md-option value="2">Hotel</md-option>
        </md-select>
      </md-field>

      <button type="button" @click="registerUser" class="btn btn-primary">Register</button>
    </form>

    <p>Alread a member yet? <a href="\login">Sign In</a></p>

  </div>
</template>

<script>

  import axios from "axios";

  export default {

    data: () => ({
      initial: 'Initial Value',
      type: null,
      withLabel: null,
      inline: null,
      number: null,
      textarea: null,
      autogrow: null,
      disabled: null,
      latLong:'',
      businessUser: {

      },
    }),

    methods: {
      async setLatLong(){
        let result = await this.getLocation();
        if (result) {
          this.latLong = result.coords.latitude + " , " + result.coords.longitude
          console.log(this.businessUser)
        }
      },

      async registerUser() {
        this.businessUser.latLong = this.latLong;
        console.log(this.businessUser)
        const response = await axios.post('http://city-ecomm-customer.herokuapp.com/businessUser/registerUser', this.businessUser);
        if (response.data.resultCode === 100) {
          console.log(response.data.data)
          if(confirm("Business registered successfully. Please login"))
            location.href = '/login'
        } else {
          alert(response.data.error);
          console.log(response.data.error)
        }
      },

      async getLocation() {
        return new Promise((resolve, reject) => {
          if (!("geolocation" in navigator)) {
            console.log("location not available")
            reject("");
          }

          navigator.geolocation.getCurrentPosition(pos => {
            console.log("location available")
            resolve(pos);
          }, err => {
            reject("");
          });

        });
      }


    }
  }
</script>

<style scoped>

  .container {
    padding: 50px;
  }

  md-input {
    margin: 100px;
  }

  h2 {
    color: #53657D;
    margin-bottom: 30px;
    font-family: Ubuntu;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  button {
    margin-top: 20px;
    width: 100%;
    border-color: white;
    background-color: #53657D;
  }

  p {
    color: #53657D;
    margin-top: 30px;
    font-family: Ubuntu;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  a {
    padding-left: 10px;
    padding-right: 10px;
  }

</style>
