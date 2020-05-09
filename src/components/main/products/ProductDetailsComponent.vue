<template>
  <div class="container">
    <h1>Product Details</h1>


    <!--
      product id

      -->

    <div>Product ID : {{this.productDetail.productId}}</div>

    <form>
      <div class="form-group">
        <label for="productName">Product Name</label>
        <input v-model="this.productDetail.productName" type="text" class="form-control" id="productName" placeholder="Enter product name" @>
      </div>

      <div class="form-group">
        <label for="supplierProductId">Supplier Product ID</label>
        <input v-model="this.productDetail.productName" type="text" class="form-control" id="supplierProductId" placeholder="Enter supplier product ID" @>
      </div>

      <div class="form-group">
        <label for="productDescription">Product Description</label>
        <input type="text" class="form-control" id="productDescription"  placeholder="Enter product description" @>
      </div>

      <div class="row">
        <div class="col">
          <div class="form-group">
            <label for="productSku">Product SKU</label>
            <input type="text" class="form-control" id="productSku" placeholder="Enter product sku" @>
          </div>
        </div>

        <div class="col">
          <div class="form-group">
            <label for="category">Category</label>
            <select  class="form-control" id="category" >
              <option selected>Choose...</option>
              <option>...</option>
            </select>
          </div>
        </div>


        <div class="col-3">
          <div class="form-group">
            <label for="productQuantity">Quantity</label>
            <input type="number" class="form-control" id="productQuantity" placeholder="Enter quantity available" @>
          </div>
        </div>

      </div>

      <div class="row">
        <div class="col">
          <div class="form-group">
            <label for="productPrice">Original Price</label>
            <input type="number" class="form-control" id="productPrice" placeholder="Enter original product price" @>
          </div>
        </div>

        <div class="col">
          <div class="form-group">
            <label for="productDiscount">Discount</label>
            <input type="number" class="form-control" id="productDiscount" placeholder="Enter discount in percentage" @>
          </div>
        </div>

        <div class="col-3">
          <div class="form-group">
            <div>Final Price : </div>
            <div>2000</div>
          </div>
        </div>

      </div>

      <button type="submit" class="btn btn-primary">Submit</button>
    </form>



  </div>
</template>

<script>
  export default {
    props: ['productDetail']
  }
</script>

<style scoped>

</style>
