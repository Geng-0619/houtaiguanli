<template>
  <div class="canshu">
      <p style="margin: 20px 0 20px 30px;">尺寸</p>
    <el-tag
      v-for="tag in tags"
      :key="tag.name"
      closable
      :type="tag.type"
      @close="handleClose(tag)"
    >>{{tag}}</el-tag>
  </div>
</template>

<script>
import Product from "../services/product-service.js";
const _product = new Product();
export default {
  name: "canshu",
  data() {
    return {
      tags: []
    };
  },
  created() {
    _product.canshu(this.$store.state.rids).then(res => {
      //   console.log(res.data.data[0].attr_vals.split(','));
      this.tags = res.data.data[0].attr_vals.split(",");
    });
  },
  methods: {
    handleClose(tag) {
      this.tags.splice(this.tags.indexOf(tag), 1);
    }
  }
};
</script>

<style lang="">
.canshu .el-tag{
    padding: 10px 30px;
    height: 52px;
    margin: 0 0 0 30px;
}
</style>