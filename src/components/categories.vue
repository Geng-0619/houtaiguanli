<!--  -->
<template>
  <div class="roles">
    <div class="roles_content">
      <div class="roles_right">
        <p class="roles_right_title">
          <span>首页></span>
          <span>商品管理></span>
          <span>商品分类></span>
        </p>
        <div class="roles_right_content">
          <div class="clssify">
            <el-button type="primary" @click="dialogFormVisible = true">添加分类</el-button>
            <!-- 添加分类框 -->
            <el-dialog title="添加分类" :visible.sync="dialogFormVisible">
              <el-form :model="form">
                <el-form-item label="分类名称" :label-width="formLabelWidth">
                  <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="父级分类" :label-width="formLabelWidth">
                  <template class="block">
                    <!-- <span class="demonstration">单选选择任意一级选项</span> -->
                    <el-cascader
                      :options="options"
                      ref="getGoodclass"
                      :props="{ expandTrigger: 'hover',label:'cat_name',value:'cat_id',checkStrictly: true  }"
                      @change="handleChange"
                    ></el-cascader>
                  </template>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="Addcateg">确 定</el-button>
              </div>
            </el-dialog>
            <!--  -->
            <el-table
              :data="goods.result"
              style="width: 100%;margin-bottom: 20px;"
              row-key="cat_id"
              border
              sort-by="index"
              :tree-props="{children: 'children', children: 'children'}"
            >
              <el-table-column prop="cat_id" label="#" sortable width="180"></el-table-column>
              <el-table-column prop="cat_name" label="分类名称" sortable width="180"></el-table-column>
              <el-table-column prop="cat_delete" label="是否有效"></el-table-column>
              <el-table-column prop="cat_level" label="排序">
                <template slot-scope="scope">
                  <el-tag
                    :type="`${scope.row.cat_level=='0'?'success':scope.row.cat_level=='1'?'info':'danger'}`"
                    v-html="`${scope.row.cat_level=='0'?'一级':scope.row.cat_level=='1'?'二级':'三级'}`"
                  >{{scope.row.ji}}</el-tag>
                  <!-- <el-tag :type"`${cat_level==1}`"></el-tag> -->
                </template>
              </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <!-- 编辑按钮 -->
                  <el-button type="primary" size="small" icon="el-icon-edit">编辑</el-button>
                  <!-- 删除按钮 -->
                  <el-button
                    type="danger"
                    @click="handleDelete(scope.$index, scope.row)"
                    size="small"
                    icon="el-icon-delete"
                  >删除</el-button>
                </template>
              </el-table-column>
            </el-table>
            <div class="block" style="marginTop:20px">
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage4"
                :page-sizes="[ 10, ]"
                :page-size="100"
                layout="total, sizes, prev, pager, next, jumper"
                :total="goods.total"
              ></el-pagination>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import Product from "../services/product-service";
const _product = new Product();
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      goods: {},
      currentPage4: 1,
      dialogFormVisible: false,
      form: {
        name: "",
        region: ""
      },
      formLabelWidth: "120px",
      options: [],
      acc: ""
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    //删除分类
    handleDelete(n, i) {
      // console.log(n)
      // console.log(i.cat_id)
      _product.handleDeletes(i.cat_id).then(res => {
        console.log(res);
        if (res.data.meta.status == 200) {
          this.$message({
            message: "删除分类成功",
            type: "success"
          });
          this.getI();
        }
      });
    },
    //添加分类
    Addcateg() {
      this.dialogFormVisible = false;

      if (this.acc == "") {
        let obj = {
          cat_pid: 0,
          cat_name: this.form.name,
          cat_level: 0
        };
        console.log(obj);
        _product.Addcategories(obj).then(res => {
          console.log(11);
          console.log(res);
          if (res.data.meta.status == 201) {
            this.$message({
              message: "添加分类成功",
              type: "success"
            });
            this.getI();
          }
        });
      } else {
        let obj = {
          cat_pid: this.acc.cat_id,
          cat_name: this.form.name,
          cat_level: this.acc.cat_level + 1
        };
        console.log(obj);
        _product.Addcategories(obj).then(res => {
          console.log(22);
          console.log(res);
          if (res.data.meta.status == 201) {
            this.$message({
              message: "添加分类成功",
              type: "success"
            });
            this.getI();
          }
        });
      }
    },
    handleChange(n) {
      // console.log(n)
      let acc1 = this.$refs.getGoodclass.getCheckedNodes();
      this.acc = acc1[0].data;
      console.log(this.acc);
    },
    handleSizeChange(val) {
      let obj = {
        pagenum: 1,
        pagesize: val
      };
      _product.categories(obj).then(res => {
        this.goods = res.data.data;
      });
    },
    handleCurrentChange(val) {
      let obj = {
        pagenum: val,
        pagesize: 10
      };
      _product.categories(obj).then(res => {
        this.goods = res.data.data;
      });
    },
    getI() {
      let obj = {
        type: 3,
        pagenum: 1,
        pagesize: 10
      };
      _product.categories(obj).then(res => {
        this.goods = res.data.data;
        // console.log(res)
        // console.log(this.options);
        // console.log(this.goods);
        let obj1 = {
          type: 3,
          pagenum: 1,
          pagesize: res.data.data.total
        };
        _product.categories(obj1).then(resp => {
          this.options = resp.data.data.result;
        });
      });
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.getI();
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {} //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang='' scoped>
/* @import url(); 引入公共css类 */
.el-form-item__content .el-cascader {
  display: block;
}
.roles {
  width: 100%;
}
.roles_content {
  display: flex;
  width: 100%;
  /* background-color: #ddd; */
}
.roles_right {
  width: 100%;
}
.roles_right_title {
  width: 100%;
  height: 30px;
  /* line-height: 30px; */
  /* text-indent: 50px; */
  padding-bottom: 20px;
  margin: 0;
}
.roles_right_content {
  width: 100%;
  /* height: 825px; */
  height: 100%;
  background-color: white;
  border-radius: 5px;
  margin: 0;
  box-sizing: border-box;
  /* padding: 25px; */
}
</style>