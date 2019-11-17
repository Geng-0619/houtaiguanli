<template>
  <div>
    <div style="display:flex;">
      <el-input v-model="search" style="width:184px;" placeholder="输入关键字搜索" />
      <el-button type="info" icon="el-icon-search"></el-button>
      <router-link to="goodslistxq">
        <el-button type="primary" @click="dialogFormVisible = true">添加商品</el-button>
      </router-link>
    </div>

    <el-table
      :data="tableData.filter(data => !search || data.goods_name.toLowerCase().includes(search.toLowerCase()))"
      style="width: 100%"
    >
      <el-table-column label="#" prop="goods_id"></el-table-column>
      <el-table-column label="商品信息" prop="goods_name"></el-table-column>
      <el-table-column label="商品价格（元）" prop="goods_price"></el-table-column>
      <el-table-column label="商品重量" prop="goods_weight"></el-table-column>
      <el-table-column label="创建时间" prop="add_time"></el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <!-- 编辑按钮 -->
          <el-button type="primary" size="small" icon="el-icon-edit"></el-button>
          <!-- 删除按钮 -->
          <el-button type="danger" @click="handleDelete(scope.$index, scope.row)" size="small" icon="el-icon-delete"></el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-sizes="[10, 15, 20, 30]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="num"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import Product from "../services/product-service.js";
const _product = new Product();
export default {
  name: "Goodslist",
  data() {
    return {
      tableData: [],
      currentPage4: 1,
      num: "",
      search: ""
    };
  },
  created() {
    _product.Goodslist().then(res => {
      console.log(res);
      this.tableData = res.data.data.goods;
      this.num = res.data.data.total;
    });
  },
  methods: {
    //商品删除
    handleDelete(n,i){
      // console.log(i.goods_id)
      _product.goodsDelete(i.goods_id).then(res => {
        console.log(res)
      })
    },
    handleSizeChange(val) {
      //   console.log(`每页 ${val} 条`);
      let obj = {
        val: val,
        num: 1
      };
      _product.Goodslist1(obj).then(res => {
        this.tableData = res.data.data.goods;
      });
    },
    handleCurrentChange(val) {
      //   console.log(`当前页: ${val}`);
      let obj = {
        num: val,
        val: 10
      };
      _product.Goodslist1(obj).then(res => {
        this.tableData = res.data.data.goods;
      });
    }
  }
};
</script>

<style lang="" scoped>
</style>