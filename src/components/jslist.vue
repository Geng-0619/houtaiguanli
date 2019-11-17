<template>
  <div>
    <el-button type="primary" @click="dialogFormVisible = true">添加角色</el-button>
    <!-- 角色列表table表格 -->
    <el-table :data="tableData" style="width: 100%">
      <el-table-column type="expand">
        <!-- 分类 具体内容 -->
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <!-- 一级 -->
            <el-form-item :label="item.authName" v-for="(item,i) in props.row.children" :key="i">
              <!-- 二级 -->
              <el-form-item
                style="display:flex;"
                :label="item1.authName"
                v-for="(item1,i1) in item.children"
                :key="i1"
              >
                <div style="width:1426px;text-align:left;border-bottom: 1px solid #ccc;">
                  <!-- 三级 -->
                  <span v-for="(item2,i2) in item1.children" :key="i2">{{ item2.authName }}</span>
                </div>
              </el-form-item>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <!-- 表格头部  th 部分 -->
      <el-table-column label="#" prop="id"></el-table-column>
      <el-table-column label="角色名称" prop="roleName"></el-table-column>
      <el-table-column label="描述" prop="roleDesc"></el-table-column>
      <el-table-column label="操作" prop>
        <template slot-scope="scope">
          <el-button
            type="primary"
            @click="handleUpdate(scope.$index, scope.row)"
            size="small"
            icon="el-icon-edit"
          >编辑</el-button>
          <el-button
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            size="small"
            icon="el-icon-delete"
          >删除</el-button>
          <el-button
            type="warning"
            @click="handlefp(scope.$index, scope.row)"
            size="small"
            icon="el-icon-setting"
          >分配权限</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 添加角色的弹出框 -->
    <el-dialog title="添加新角色" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="角色名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="角色名称" :label-width="formLabelWidth">
          <el-input v-model="form.region" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="Addjslist">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 编辑角色的弹出框 -->
    <el-dialog title="编辑角色信息" :visible.sync="dialogFormVisible1">
      <el-form :model="form">
        <el-form-item label="角色名称" :label-width="formLabelWidth">
          <el-input v-model="form.name1" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="角色名称" :label-width="formLabelWidth">
          <el-input v-model="form.region1" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible1 = false">取 消</el-button>
        <el-button type="primary" @click="Updatelist">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 权限分配 -->
    <el-dialog title="权限分配" :visible.sync="dialogFormVisible2">
      <el-tree
        :data="qxfp"
        show-checkbox
        node-key="id"
        ref="tree"
        default-expand-all
        :props="defaultProps"
        @check-change="handleCheckChange"
      ></el-tree>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="dialogFo">确 定</el-button>
      </div>
    </el-dialog>
    <!--  -->
  </div>
</template>

<script>
import Product from "../services/product-service.js";
const _product = new Product();
export default {
  name: "jslist",
  data() {
    return {
      tableData: [],
      dialogFormVisible: false, // 控制添加的弹出框的显示隐藏
      dialogFormVisible1: false, // 控制编辑弹出框的显示隐藏
      dialogFormVisible2: false, // 控制编辑弹出框的显示隐藏
      form: {
        name: "",
        region: "",
        name1: "",
        region1: ""
      },
      formLabelWidth: "120px",
      rids: "",
      defaultProps: {
        children: "children",
        label: "authName"
      },
      qxfp: [],
      qxCheck: [],
      rids2: ""
    };
  },
  created() {
    //  角色列表接口调取数据
    this.getRoles();
    //  权限列表
  },
  methods: {
    dialogFo() {
      this.dialogFormVisible2 = false;
      let obj = {
        id: this.rids2,
        rids: JSON.stringify(this.qxCheck)
      };
      _product.Jurisdic(obj).then(res => {
        // console.log(res);
        if (res.data.meta.status == 200) {
          this.$message({
            message: "更新权限成功",
            type: "success"
          });
          this.getRoles();
        }
      });
    },
    // 获取选中的节点
    handleCheckChange() {
      let res = this.$refs.tree.getCheckedNodes();
      let arr = [];
      res.forEach(item => {
        arr.push(item.id);
      });
      this.qxCheck = arr;
      // console.log(arr)
    },
    //列表接口
    getRoles() {
      _product.roles1().then(res => {
        //  console.log(res.data.data);
        this.tableData = res.data.data;
      });
    },
    // 添加角色
    Addjslist() {
      // 控制模态框状态
      this.dialogFormVisible = false;
      let obj = {
        roleName: this.form.name,
        roleDesc: this.form.region
      };
      _product.roles(obj).then(res => {
        // console.log(res);
        // 判断成功 调用获取数据接口改变数据
        if (res.data.meta.status == 201) {
          this.$message({
            message: "添加数据成功",
            type: "success"
          });
          this.getRoles();
        }
      });
    },
    //权限分配
    handlefp(n, i) {
      this.dialogFormVisible2 = true;
      // console.log(n,i)
      this.rids2 = i.id;
      _product.rights().then(res => {
        // console.log(res.data.data);
        if (res.data.meta.status == 200) {
          this.qxfp = res.data.data;
          let arr = [];
          this.qxfp.map(item => {
            arr.push(item.id)
            item.children.map(v => {
              arr.push(v.id);
              v.children.map(x => {
                arr.push(x.id);
               
              });
            });
          });
          this.$refs.tree.setCheckedKeys(arr, true);
        }
      });
    },
    //删除角色
    handleDelete(n, i) {
      // console.log(i.id)
      _product.rolesa(i.id).then(res => {
        console.log(res);
        if (res.data.meta.status == 200) {
          // 提示信息;
          this.$message({
            message: "删除数据成功",
            type: "success"
          });
          this.getRoles();
        }
      });
    },
    //编辑数据 弹出框
    handleUpdate(n, i) {
      this.dialogFormVisible1 = true;
      this.rids = i.id;
      // console.log(this.rids)
    },
    //编辑角色
    Updatelist() {
      let obj = {
        id: this.rids,
        roleName: this.form.name1,
        roleDesc: this.form.region1
      };
      _product.roleaa(obj).then(res => {
        console.log(res);
        if (res.data.meta.status == 200) {
          // 提示信息;
          this.$message({
            message: "编辑数据成功",
            type: "success"
          });
          this.dialogFormVisible1 = false;
          this.getRoles();
        }
      });
    }
  }
};
</script>

<style lang="" scoped>
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>