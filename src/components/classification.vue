<template>
  <div>
    <!-- 分类 -->
    <div class="block">
      <span class="demonstration">商品分类</span>
      <el-cascader
        v-model="acc1"
        :options="options"
        ref="sss"
        :props="{ expandTrigger: 'hover',label : 'cat_name',value:'cat_id' }"
        @change="handleChange"
      ></el-cascader>
    </div>
    <!-- 动态参数 -->
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="动态参数" name="first">
        <el-button type="primary" @click="dialogFormVisible = true">添加参数</el-button>
        <el-table :data="tableData" style="width: 100%">
          <el-table-column type="expand">
            <el-tag
              :key="tag"
              v-for="(tag) in dynamicTags"
              closable
              :disable-transitions="false"
              @close="handleClose(tag)"
            >{{tag}}</el-tag>
            <el-input
              class="input-new-tag"
              v-if="inputVisible"
              v-model="inputValue"
              ref="saveTagInput"
              size="small"
              @keyup.enter.native="handleInputConfirm"
              @blur="handleInputConfirm"
            ></el-input>
            <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
          </el-table-column>
          <el-table-column label="#" prop="attr_id"></el-table-column>
          <el-table-column label="参数名称" prop="attr_name"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="primary" size="small" icon="el-icon-edit">编辑</el-button>
              <el-button
                type="danger"
                @click="handleDelete(scope.$index, scope.row)"
                size="small"
                icon="el-icon-delete"
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <!-- 静态属性 -->
      <el-tab-pane label="静态属性" name="second">
        <el-button type="primary" @click="dialogFormVisible1 = true">添加属性</el-button>
        <el-table :data="tableData1" style="width: 100%">
          <el-table-column type="expand">
            <template slot-scope="scope">
              <!-- <el-form label-position="left" inline class="demo-table-expand">
                  <span>{{ props.row.attr_vals }}</span>
              </el-form>-->
              <!-- <el-tag
                :key="tag"
                closable
                :disable-transitions="false"
                @close="handleClose1(props.row)"
              >{{props.row.attr_vals}}</el-tag>-->

              <el-tag
                :key="tag"
                v-for="(tag) in scope.row.attr_vals.split(' ')"
                closable
                :disable-transitions="false"
                @close="handleClose1(scope.$index, tag)"
              >{{tag}}</el-tag>
              <el-input
                class="input-new-tag"
                v-if="inputVisible"
                v-model="inputValue"
                ref="saveTagInput"
                size="small"
                @keyup.enter.native="handleInputConfirm"
                @blur="handleInputConfirm"
              ></el-input>
              <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
            </template>
          </el-table-column>
          <el-table-column label="#" prop="attr_id"></el-table-column>
          <el-table-column label="属性名称" prop="attr_name"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="primary" size="small" icon="el-icon-edit">编辑</el-button>
              <el-button
                type="danger"
                @click="handleDelete1(scope.$index, scope.row)"
                size="small"
                icon="el-icon-delete"
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
    <!-- 动态参数 -->
    <el-dialog title="动态参数" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="动态参数" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="Addgoodsc">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 静态属性 -->
    <el-dialog title="静态属性" :visible.sync="dialogFormVisible1">
      <el-form :model="form">
        <el-form-item label="静态属性" :label-width="formLabelWidth">
          <el-input v-model="form.name1" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible1 = false">取 消</el-button>
        <el-button type="primary" @click="Addgoodsc1">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Product from "../services/product-service.js";
const _product = new Product();
export default {
  name: "classification",
  data() {
    return {
      options: [],
      acc1: [],
      activeName: "first",
      tableData: [],
      tableData1: [],
      dynamicTags: [],
      inputVisible: false,
      inputValue: "",
      rids: "",
      dialogFormVisible: false,
      dialogFormVisible1: false,
      form: {
        name: "",
        name1: ""
      },
      formLabelWidth: "120px"
    };
  },
  methods: {
    //删除大的
    handleDelete(n, i) {
      // console.log(n,i)
      // d删除
      _product.dtgoodsdel(i).then(res => {
        console.log(res);
      });
    },
    //删除静态属性
    handleDelete1(n, i) {
      this.tableData[n].attr_vals.split(" ");
      // console.log(n,i)
      // d删除
      _product.dtgoodsdel1(i).then(res => {
        console.log(res);
      });
    },
    //添加大的
    Addgoodsc() {
      this.dialogFormVisible = false;
      // 添加;
      let inputValue = {
        inputValue: this.form.name,
        rids: this.rids
      };
      // this.dynamicTags.push(inputValue);
      _product.dtAddgoods(inputValue).then(res => {
        console.log(res);
      });
    },
    //静态属性
    Addgoodsc1() {
      this.dialogFormVisible1 = false;
      // 添加;
      let inputValue = {
        inputValue: this.form.name1,
        rids: this.rids
      };
      // this.dynamicTags.push(inputValue);
      _product.dtAddgoods1(inputValue).then(res => {
        console.log(res);
      });
    },
    handleChange(value) {
      // console.log(this.acc1[this.acc1.length - 1])
      this.rids = this.acc1[this.acc1.length - 1];
      // 分类参数
      this.getdynamicTags();
    },
    getdynamicTags() {
      _product.canshu(this.acc1[this.acc1.length - 1]).then(res => {
        // console.log(res);
        this.tableData = res.data.data;
        this.dynamicTags = res.data.data[0].attr_vals.split(" ");
        // console.log(this.dynamicTags)
        _product.shuxing(this.acc1[this.acc1.length - 1]).then(res => {
          // console.log(res.data.data);
          this.tableData1 = res.data.data;
          console.log(res.data.data);
        });
      });
    },
    handleClick(tab, event) {
      // console.log(tab, event);
    },
    handleClose1(n, i) {
      console.log(n);
      console.log(i);
      let aa = this.tableData1[n].attr_vals.split(" ");
      console.log(aa);
      aa.splice(aa.indexOf(i), 1);
      console.log(aa);
      // console.log(this.tableData1[n])

      let obj = {
        id1: this.tableData1[n].cat_id,
        id2: this.tableData1[n].attr_id,
        name: this.tableData1[n].attr_name,
        sel: this.tableData1[n].attr_sel,
        vals: aa
      };
      console.log(obj);
      _product.delDt(obj).then(res => {
        console.log(res);
        if (res.data.meta.status == 200) {
          this.$message({
            message: "更新成功",
            type: "success"
          });
          this.getdynamicTags();
        }
      });
    },
    handleClose(tag) {
      // console.log(tag)
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
      // console.log(this.tableData)
      // console.log(this.dynamicTags.join(" "))
      let obj = {
        id1: this.tableData[0].cat_id,
        id2: this.tableData[0].attr_id,
        name: this.tableData[0].attr_name,
        sel: this.tableData[0].attr_sel,
        vals: this.dynamicTags.join(" ")
      };
      _product.delDt(obj).then(res => {
        // console.log(res)
        if (res.data.meta.status == 200) {
          this.$message({
            message: "更新成功",
            type: "success"
          });
          this.getdynamicTags();
        }
      });
    },

    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.dynamicTags.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = "";
    },
    //商品分类
    getDateI() {
      _product.goodsfl().then(res => {
        // console.log(res);
        this.options = res.data.data;
      });
    }
  },
  created() {
    this.getDateI();
  }
};
</script>

<style lang="" >
.is-top .is-active {
  background: #eaedf1;
}
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>