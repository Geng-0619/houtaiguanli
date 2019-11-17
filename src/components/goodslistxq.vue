<template>
  <div>
    <!--  -->
    <p
      style="width:40px;width:97%;color:#909399;background:#ccc;padding: 8px 16px;border-radius: 4px;text-align:center;"
    >添加商品信息</p>
    <el-steps :active="active" finish-status="success">
      <el-step title="基本信息"></el-step>
      <el-step title="商品参数"></el-step>
      <el-step title="商品属性"></el-step>
      <el-step title="商品图片"></el-step>
      <el-step title="商品内容"></el-step>
      <el-step title="完成"></el-step>
    </el-steps>
    <!--  -->
    <div style="display:flex;">
      <div style="height: 300px;width:100px;" class="gsls">
        <li @click="next(0)" :class="{'activedd':activeadd==0}">基本信息</li>
        <li @click="next(1)" :class="{'activedd':activeadd==1}">商品参数</li>
        <li @click="next(2)" :class="{'activedd':activeadd==2}">商品属性</li>
        <li @click="next(3)" :class="{'activedd':activeadd==3}">商品图片</li>
        <li @click="next(4)" :class="{'activedd':activeadd==4}">商品内容</li>
      </div>
      <router-view></router-view>
    </div>
    <!--  -->
  </div>
</template>

<script>
export default {
  name: "goodslistxq",
  data() {
    return {
      active: 0,
      activeadd: 0
    };
  },
  computed: {},
  methods: {
    next(n) {
      // console.log(n)
      //   console.log(this.$store.state.acc);
      if (this.$store.state.acc == "") {
        this.$message.error("请选择商品分类！");
      } else {
        this.active = n;
        this.activeadd = n;
        if (n == 1) {
          this.$router.push({
            path: "/canshu"
          });
        } else if (n == 2) {
          this.$router.push({
            path: "/shuxing"
          });
        } else if (n == 3) {
          this.$router.push({
            path: "/goodsimages"
          });
        } else if (n == 4) {
          this.$router.push({
            path: "/Commodity"
          });
        } else if (n == 0) {
          this.$router.push({
            path: "/goodsxx"
          });
        }
      }
    }
  },
  created() {
    //   console.log(this.acc)
  }
};
</script>

<style lang="">
.el-steps--horizontal {
  padding: 0 60px;
}
.gsls > li {
  list-style: none;
  padding: 10px 5px;
}
.activedd {
  color: #409eff;
  border-right: 2px solid #409eff;
}
.gsls > li:hover {
  color: #409eff;
}
.goodxq .el-form-item {
  border-top: none;
  margin-top: 20px;
}

.goodxq .el-form-item__label {
  font-size: 18px;
}
</style>