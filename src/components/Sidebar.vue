<template>
  <div class="wrapper">
    <h2 id="heading"><a id="headingAnchor" href="/"><img width="200px" height="200px" src="logo.png"></img></a><b> NearbyRush </b></h2>
    <nav id="sidebar">
      <div class="p-4 pt-5">
        <ul class="nav navbar-nav">
          <li class="nav-item">
            <a class="nav-link" href="/"><i class="fa fa-home"></i>
              Home </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/orders"><i class="fas fa-shipping-fast" style="margin-right: 20px"></i>Orders</a>
          </li>
          <li>
          <li class="nav-item">
            <a class="nav-link" href="/products"><i class="fas fa-tshirt" style="margin-right: 20px"></i>Products</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/finance"><i class="fas fa-rupee-sign" style="margin-right: 20px"></i>
              Finance</a>
          </li>
          <li class="nav-item" >
            <a class="nav-link" href="/addCategories"><i class="fas fa-stream" style="margin-right: 20px"></i>Category</a>
          </li>
          <li class="nav-item" @click="Profile">
            <a class="nav-link" href="/profile"><i class="fa fa-user-plus"></i>
              Profile</a>
          </li>
          <li class="nav-item" @click="signOut">
            <a class="nav-link" href="/login"><i class="fas fa-sign-out-alt" style="margin-right: 20px"></i>
              Sign out</a>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
  export default {

    methods: {
      signOut() {
        if (confirm("Are you sure you want to sign out?")) {
          console.log(this.$session.get('token'));
          console.log(this.$session.get('user'));
          this.$session.clear();
          this.$router.push("/login")
        }
      }
    }
  }


</script>

<style scoped>

  .wrapper {
    position: fixed;
    background-color: #272C33;
    height: 100%;
    width: 15%;
  }

  #sidebar {
    width: 100%;
    background: #272C33;
    color: #fff;
    transition: all 0.3s;
  }

  #sidebar ul li {
    font-size: 16px;
  }

  #sidebar ul li > ul {
    margin-left: 10px;
  }

  #sidebar ul li > ul li {
    font-size: 14px;
  }

  #sidebar ul li a {
    padding: 10px 0;
    margin-top: 20px;
    display: block;
    color: #aaaaaa;
  }

  #sidebar ul li a:hover {
    color: white;
  }

  #sidebar ul li.active > a {
    color: white;
  }

  a[data-toggle="collapse"] {
    position: relative;
  }

  .fa-home {
    margin-right: 20px;
  }

  .fa-user-plus {
    margin-right: 20px;
  }

  .fas{
    margin-right: 20px;
  }

  #heading {
    text-align: center;
    font-family: "Open Sans";
    text-underline: #fafafa;
    color: white;
    padding-left: 10px;
    padding-right: 10px;
    padding-bottom: 20px;
    padding-top: 30px;
    border-bottom: 1px solid rgba(255, 255, 255, .1);
    margin-left: 10px;
    margin-right: 10px;
  }

  #headingAnchor {
    color: white;
  }

  #headingAnchor:hover {
    text-decoration: none;
  }


</style>
