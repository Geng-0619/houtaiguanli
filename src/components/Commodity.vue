<template>
  <div>
    <quill-editor ref="text" v-model="content" class="myQuillEditor" :options="editorOption" />
    <el-button type="primary" @click="submit">提交</el-button>
  </div>
</template>

<script>
import Product from "../services/product-service.js";
const _product = new Product();
import { quillEditor } from "vue-quill-editor";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
export default {
  name: "Commodity",
  components: {
    quillEditor
  },
  data() {
    return {
      content: "",
      editorOption: {}
    };
  },
  methods: {
    submit() {
      this.$store.state.goods_introduce = this.$refs.text.value
      console.log(this.$refs.text.value);
      //添加商品
      let obj = {
        goods_name:this.$store.state.goods_name,
        goods_price:this.$store.state.goods_price,
        goods_weight:this.$store.state.goods_weight,
        goods_cat:this.$store.state.goods_cat,
        goods_number:this.$store.state.goods_number,
        goods_introduce:this.$store.state.goods_introduce,
        pics:this.$store.state.pics,
      }
      console.log(obj)
      _product.Addgoods(obj).then(res => {
        console.log(res)
      })
    }
  }
};
</script>

<style lang="" scoped>
</style>