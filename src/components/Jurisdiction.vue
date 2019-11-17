<template>
  <div>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="id" label="#" width="180"></el-table-column>
      <el-table-column prop="authName" label="权限名称" width="180"></el-table-column>
      <el-table-column prop="path" label="路径"></el-table-column>
      <el-table-column label="权限等级">
        <template slot-scope="scope">
          <el-tag
            :type="`${scope.row.dj=='一级'?'primary':scope.row.dj=='二级'?'success':'danger'}`"
          >{{scope.row.dj}}</el-tag>
          <!-- <el-tag :type"`${cat_level==1}`"></el-tag> -->
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import Product from "../services/product-service.js";
const _product = new Product();
import Vue from "vue";
export default {
  name: "Jurisdiction",
  data() {
    return {
      tableData: []
    };
  },
  created() {
    _product.rights().then(res => {
      console.log(res.data.data);
      //   this.tableData = res.data.data;
      res.data.data.forEach(v => {
        v.dj = "一级";
        this.tableData.push(v);
        v.children.forEach(j => {
          j.dj = "二级";
          this.tableData.push(j);
          j.children.forEach(l => {
            l.dj = "三级";
            this.tableData.push(l);
          });
        });
      });
    });
  }
};
</script>

<style lang="" scoped>
</style>