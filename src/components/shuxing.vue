<template>
  <div style="padding:0 20px;font-size:14px;width:90%;">
      <div v-for="(item,index) in goodssx" :key="index">
          <p>{{ item.attr_name }}</p>
          <input type="text" :value="item.attr_vals" style="border:1px solid #ccc;width:100%;height:40px;padding-left:15px;box-sizing:border-box;">
      </div>
  </div>
</template>

<script>
import Product from "../services/product-service.js";
const _product = new Product();
export default {
  name: "shuxing",
  data() {
      return {
          goodssx:[]
      }
  },
  created() {
    _product.shuxing(this.$store.state.rids).then(res => {
        console.log(res.data.data);
        this.goodssx = res.data.data
    });
  }
};
</script>

<style lang="">
</style>