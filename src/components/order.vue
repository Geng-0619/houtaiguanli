<template>
  <div>
    <!-- 搜索 -->
    <div style="display:flex;">
      <el-input v-model="search" style="width:184px;" placeholder="输入关键字搜索" />
      <el-button type="info" icon="el-icon-search"></el-button>
    </div>
    <!--  -->
    <el-table
      :data="tableData.filter(data => !search || data.goods_name.toLowerCase().includes(search.toLowerCase()))"
      style="width: 100%"
    >
      <el-table-column label="#" prop="order_id"></el-table-column>
      <el-table-column label="订单编号" prop="order_number"></el-table-column>
      <el-table-column label="商品价格" prop="order_price"></el-table-column>
      <el-table-column label="是否付款" prop="goods_weight"></el-table-column>
      <el-table-column label="是否发货" prop="is_send"></el-table-column>
      <el-table-column label="下单时间" prop="update_time"></el-table-column>

      <el-table-column label="操作">
        <template slot-scope>
          <!-- 编辑按钮 -->
          <el-button type="primary" size="small" icon="el-icon-edit"></el-button>
          <!-- 删除按钮 -->
          <el-button type="danger" size="small" icon="el-icon-delete"></el-button>
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
    <!--  -->
  </div>
</template>

<script>
import Product from "../services/product-service.js";
const _product = new Product();
export default {
  name: "order",
  data() {
    return {
      search: "",
      tableData: []
    };
  },
  created() {
    _product.order().then(res => {
      // console.log(res)
      this.tableData = res.data.data.goods;
      this.num = res.data.data.total;
    });
  },
  methods: {
    handleSizeChange(val) {
      //   console.log(`每页 ${val} 条`);
      let obj = {
        val: val,
        num: 1
      };
      _product.order1(obj).then(res => {
        this.tableData = res.data.data.goods;
      });
    },
    handleCurrentChange(val) {
      //   console.log(`当前页: ${val}`);
      let obj = {
        num: val,
        val: 10
      };
      _product.order1(obj).then(res => {
        this.tableData = res.data.data.goods;
      });
    }
  }
};
</script>

<style lang="" scoped>
</style>