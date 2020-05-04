<template>
  <div class="wrapper" >
    <nav id="sidebar">
      <div class="p-4 pt-5">
        <a href="#" class="img logo rounded-circle mb-5" style="background-image: url(https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Circle-icons-profile.svg/1200px-Circle-icons-profile.svg.png);"></a>
        <ul class="list-unstyled components mb-5">
          <li class="active">
            <a href="#">Home</a>
          </li>
          <li>
            <a href="/orders">Orders</a>
          </li>
          <li>
          <li>
            <a href="/products">Products</a>
          </li>
          <li>
            <a href="/finance">Finance</a>
          </li>
          <li>
            <a href="">Sign out</a>
          </li>

        </ul>

      </div>
    </nav>
    <div class="footer">
      <p>Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0.
        Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. </p>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Sidebar"
  }
</script>

<style scoped>
  body {
    font-family: 'Poppins', Arial, sans-serif;
    font-size: 14px;
    line-height: 1.8;
    font-weight: normal;
    background: #fafafa;
    color: #808080;
  }
  a {
    transition: 0.3s all ease;
    color: #f8b739;
  }
  a:hover, a:focus {
    text-decoration: none !important;
    outline: none !important;
    box-shadow: none;
  }
  button {
    transition: 0.3s all ease;
  }
  button:hover, button:focus {
    text-decoration: none !important;
    outline: none !important;
    box-shadow: none !important;
  }
  h1, h2, h3, h4, h5, .h1, .h2, .h3, .h4, .h5 {
    line-height: 1.5;
    font-weight: 400;
    font-family: 'Poppins', Arial, sans-serif;
    color: black;
  }
  .ftco-section {
    padding: 7em 0;
  }
  .ftco-no-pt {
    padding-top: 0;
  }
  .ftco-no-pb {
    padding-bottom: 0;
  }
  .heading-section {
    font-size: 28px;
    color: black;
  }
  .heading-section small {
    font-size: 18px;
  }
  .img {
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
  }
  .navbar {
    padding: 15px 10px;
    background: #fff;
    border: none;
    border-radius: 0;
    margin-bottom: 40px;
    box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.1);
  }
  .navbar-btn {
    box-shadow: none;
    outline: none !important;
    border: none;
  }
  .line {
    width: 100%;
    height: 1px;
    border-bottom: 1px dashed #ddd;
    margin: 40px 0;
  }
  .wrapper {
    background-color: #1d1919;
    height: 100%;
    width: 100%;
  }
  #sidebar {
    min-width: 300px;
    max-width: 300px;
    background: #1d1919;
    color: #fff;
    transition: all 0.3s;
  }
  #sidebar.active {
    margin-left: -300px;
  }
  #sidebar .logo {
    display: block;
    width: 120px;
    height: 120px;
    margin: 0 auto;
  }
  #sidebar .logo span {
    display: block;
  }
  #sidebar ul.components {
    padding: 0;
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
    display: block;
    color: rgba(255, 255, 255, .8);
    border-bottom: 1px solid rgba(255, 255, 255, .1);
  }
  #sidebar ul li a:hover {
    color: #f8b739;
  }
  #sidebar ul li.active > a {
    background: transparent;
    color: #f8b739;
  }
  a[data-toggle="collapse"] {
    position: relative;
  }
  .dropdown-toggle::after {
    display: block;
    position: absolute;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
  }
  #content {
    width: 100%;
    padding: 0;
    min-height: 100vh;
    transition: all 0.3s;
  }
  .btn.btn-primary {
    background: #f8b739;
    border-color: #f8b739;
  }
  .btn.btn-primary:hover, .btn.btn-primary:focus {
    background: #f8b739 !important;
    border-color: #f8b739 !important;
  }
  .footer p {
    margin-top: 50px;
    padding: 20px;
    min-width: 300px;
    max-width: 300px;
    align-content: baseline;
    color: rgba(255, 255, 255, .5);
  }

</style>
