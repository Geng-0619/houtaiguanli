<template>
  <div style="width:93%;padding:0 25px;">
    <el-upload
      class="upload-demo"
      action="http://www.wyunfei.com:7001/api/private/v1/upload"
      :headers="headers"
      :file-list="fileList"
      :on-success="handlePreview"
      list-type="picture" 
    >
      <el-button size="small" type="primary">点击上传</el-button>
    </el-upload>
  </div>
</template>

<script>
import Product from "../services/product-service.js";
const _product = new Product();
export default {
  name: "goodsimages",
  data() {
    return {
      fileList: [],
      headers: {
        Authorization: ""
      }
    };
  },
  methods: {
    handlePreview(res, file, fileList) {
      console.log(res);
      let pic = {
         pic : res.data.tmp_path
      }
      this.$store.state.pics.push(pic)
      console.log(this.$store.state.pics)
      // console.log(pic)
      // console.log(fileList)
    }
  },
  created () {
    let token = JSON.parse(localStorage.getItem('token'))
    this.headers.Authorization = token
  }
};
</script>

<style lang="">
</style>