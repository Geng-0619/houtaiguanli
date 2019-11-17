<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "App",
  created() {
    axios.interceptors.request.use(config => {
      const token = JSON.parse(localStorage.getItem("token"));
      // console.log(token)
      // if(token){
      token ? (config.headers.Authorization = token) : null;
      // }
      return config;
    });
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100%;
  height: 100%;
}
html,
body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}
.el-submenu__title {
  background: #333744;
  color: #fff !important;
}
.el-submenu__title:hover {
  background: #000;
}
.el-menu-item-group__title {
  padding: 0 !important;
}
.el-menu-item,
.is-active {
  background: #333744;
  color: #fff;
}
.el-menu-item:hover {
  background: #000;
}
.el-menu-item:active {
  background: #333744 !important;
}
.el-main {
  text-align: left !important;
  line-height: 30px !important;
}
.el-aside {
  text-align: left;
}
.el-menu-item {
  text-align: center;
}
.el-form-item {
  width: 100%;
  margin: 0;
}
.el-form-item__content {
  width: 30%;
}
.el-form-item {
  width: 100% !important;
  /* border-bottom: 1px solid #ccc; */
  border-top: 1px solid #ccc;
  display: flex;
}

.el-form-item__content > .el-form-item {
  /* border-bottom: 1px solid #ccc; */
  border-top: none;
  /* width: 800px; */
}
.el-dialog__body .el-form-item {
  border-top: none;
  margin-bottom: 20px;
}
.el-dialog__body .el-form-item .el-form-item__content {
  margin-left: 0 !important;
  width: 80%;
}
.el-form-item--feedback {
  border-top: none;
  margin-left: 570.891px;
  margin-bottom: 22px;
}
.el-cascader-menu__list .is-active{
  background: #fff;
}
</style>
