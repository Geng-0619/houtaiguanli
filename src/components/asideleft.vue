<template>
  <div>
    <!-- <el-radio-group v-model="isCollapse" style="width:200px;height:50px;"> -->
    <!-- <el-radio-button :label="false">展开</el-radio-button>
    <el-radio-button :label="true">收起</el-radio-button>-->

    <!-- </el-radio-group> -->
    <el-menu
      default-active="1-4-1"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      :collapse="isCollapse"
    >
      <p class="xsxs" @click="sxsx">|||</p>
      <!--  -->
      <el-submenu :index="item.id" v-for="(item,index) in asidelist" :key="index">
        <template slot="title">
          <i class="el-icon-user-solid"></i>
          <span slot="title">{{ item.authName }}</span>
        </template>
        <el-menu-item-group v-for="(item,i) in item.children" :key="i">
          <!-- <router-link to="/Userlist"> -->
          <el-menu-item @click="Jump(item.authName)" :index="item.id">{{ item.authName }}</el-menu-item>
          <!-- </router-link> -->
        </el-menu-item-group>
      </el-submenu>
      <!--  -->
    </el-menu>
  </div>
</template>

<script>
export default {
  props: ["asidelist"],
  name: "asideleft",
  data() {
    return {
      isCollapse: false
    };
  },
  methods: {
    sxsx() {
      this.isCollapse = !this.isCollapse;
    },
    handleOpen(key, keyPath) {
      // console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      // console.log(key, keyPath);
    },
    created() {},
    Jump(n) {
      console.log(n);
      if (n == "用户列表") {
        this.$router.push({
          path: "/Userlist"
        });
      } else if (n == "角色列表") {
        this.$router.push({
          path: "/jslist"
        });
      } else if (n == "分类参数") {
        this.$router.push({
          path: "/params"
        });
      } else if (n == "权限列表") {
        this.$router.push({
          path: "/Jurisdiction"
        });
      } else if (n == "商品列表") {
        this.$router.push({
          path: "/Goodslist"
        });
      } else if (n == "订单列表") {
        this.$router.push({
          path: "/order"
        });
      } else if (n == "数据报表") {
        this.$router.push({
          path: "/information"
        });
      } else if (n == "商品分类") {
        this.$router.push({
          path: "/categories"
        });
      }
    }
  }
};
</script>

<style lang="" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  /* min-height: 877px; */
  height: 100%;
  background: #333744;
  color: #fff;
}
.el-menu--collapse{
  min-height: 877px;
  height: 100%;
  background: #333744;
  color: #fff;
}
.el-menu{
  min-height: 877px;
   height: 100%;
}
.xsxs {
  /* min-width: 50px; */
  /* width: 200px; */
  height: 20px;
  color: #fff;
  background: #4a5064;
  margin: 0;
  text-align: center;
  line-height: 20px;
  font-size: 14px;
}
</style>