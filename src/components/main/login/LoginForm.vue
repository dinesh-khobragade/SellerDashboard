<template>
  <div class="container">
    <h2>Login</h2>
    <form>

      <md-field>
        <label>Enter username</label>
        <md-input v-model="username" placeholder="Enter username"></md-input>
      </md-field>

      <md-field>
        <label>Enter password</label>
        <md-input v-model="password" placeholder="Enter password"></md-input>
      </md-field>

      <button type="button" @click="loginUser" class="btn btn-primary">Login</button>
    </form>

    <p>Not a member yet? <a href="\signup">Sign Up</a></p>

  </div>
</template>

<script>


  import Vue from "vue";

  export default {
    name: 'TextFields',
    data: () => ({
      initial: 'Initial Value',
      type: null,
      withLabel: null,
      inline: null,
      number: null,
      textarea: null,
      autogrow: null,
      disabled: null,
      username: '',
      password: ''
    }),
    methods: {
      async loginUser() {
        const response = await Vue.axios.post('/businessUser/login', {
          "username": this.username,
          "password": this.password
        });
        if (response.data.resultCode === 100) {
          console.log(response.data.data)
          await this.saveSession(response.data.data);
          console.log("Saved")
          location.href = "/"
          // await this.$router.push("/")
        } else {
          console.log(response.data.error)
          alert(response.data.error)
        }
      },

      async saveSession(data) {
        this.$session.start()
        await this.$session.set('token', data.token)
        await this.$session.set('user', data)
        console.log("Token = " + Vue.prototype.$session.get('token'))
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
