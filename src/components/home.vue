<template>
  <div>
    <el-container>
      <!-- 首页头部 -->
      <el-header>
        <div class="home">
          <div class="home_header">
            <img src="../../static/logo.ca983f1.png" alt />
            <p>电商后台管理系统</p>
          </div>
          <el-button type="info" style="margin-right:15px">退出</el-button>
        </div>
      </el-header>
      <el-container>
        <!-- 左侧导航栏 -->
        <!-- <el-aside width="150px"> -->
            <asideleft :asidelist="asidelist"></asideleft>
        <!-- </el-aside> -->
        <!-- 内容区 -->
        <el-main>
            <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import "../css/home.css";
import asideleft from './asideleft'
import Product from "../services/product-service.js";
const _product = new Product();
export default {
  name: "home",
  data() {
    return {
      asidelist:[]
    };
  },
  components:{
      asideleft 
  },
  created () {
    // http://www.wyunfei.com:7001/api/private/v1/menus
      _product.menus().then(res => {
            // console.log(res.data.data)
            this.asidelist = res.data.data
        });
  }
};
</script>

<style lang="">
</style>