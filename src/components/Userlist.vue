<template>
  <div>
    <!-- <template slot="header" slot-scope="scope"> -->
    <div style="display:flex;">
      <el-input v-model="search" style="width:184px;" placeholder="输入关键字搜索" />
      <el-button type="info" icon="el-icon-search"></el-button>
      <el-button type="primary" @click="dialogFormVisible = true">添加用户</el-button>
    </div>
    <!-- </template> -->
    <el-table
      :data="tableData.filter(data => !search || data.username.toLowerCase().includes(search.toLowerCase()))"
      style="width: 100%"
    >
      <el-table-column label="#" prop="id"></el-table-column>
      <el-table-column label="姓名" prop="username"></el-table-column>
      <el-table-column label="邮箱" prop="email"></el-table-column>
      <el-table-column label="电话" prop="create_time"></el-table-column>
      <el-table-column label="角色" prop="role_name"></el-table-column>

      <el-table-column label="状态">
        <template slot-scope="scope">
          <!-- 修改状态 -->
          <el-switch
            @change="upcheck(scope.$index, scope.row)"
            v-model="scope.row.mg_state"
            active-color="#09EFF"
            inactive-color="#ddd"
          ></el-switch>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <!-- 编辑按钮 -->
          <el-button
            @click="userUpdate(scope.$index, scope.row)"
            type="primary"
            size="small"
            icon="el-icon-edit"
          ></el-button>
          <!-- 删除按钮 -->
          <el-button
            type="danger"
            @click="userDel(scope.$index, scope.row)"
            size="small"
            icon="el-icon-delete"
          ></el-button>
          <!-- 分配角色按钮 -->
          <el-button
            type="warning"
            @click="fenpeijs(scope.$index, scope.row)"
            size="small"
            icon="el-icon-setting"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 添加数据弹框 -->
    <el-dialog title="添加用户" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input v-model="form.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth">
          <el-input v-model="form.Email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号" :label-width="formLabelWidth">
          <el-input v-model="form.tel" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="Adduser">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 修改---数据弹框 -->
    <el-dialog title="修改用户" :visible.sync="dialogFormVisible1">
      <el-form :model="form">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="form.name1" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth">
          <el-input v-model="form.Email1" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号" :label-width="formLabelWidth">
          <el-input v-model="form.tel1" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible1 = false">取 消</el-button>
        <el-button type="primary" @click="updateItem">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 角色分配----->
    <el-dialog title="角色分配" :visible.sync="dialogFormVisible2">
      <el-form :model="form">
        <el-form-item label="当前的用户" :label-width="formLabelWidth">{{fpname}}</el-form-item>
        <el-form-item label="当前的角色" :label-width="formLabelWidth">{{fprolename}}</el-form-item>
        <el-form-item label="分配新角色" :label-width="formLabelWidth">
          <el-select v-model="form.region2" placeholder="请选择">
            <el-option
              v-for="(item,i) in fplist"
              :key="i"
              :label="item.roleName"
              :value="item.roleName"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="fenpei">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 分页器 -->
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-sizes="[2, 5, 10, 15]"
        :page-size="1"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tableData.total"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import Product from "../services/product-service.js";
const _product = new Product();
export default {
  name: "Userlist",
  data() {
    return {
      tableData: [],
      search: "",
      currentPage4: 1, //当前页数
      page: 1,
      dialogFormVisible: false,
      dialogFormVisible1: false,
      dialogFormVisible2: false,
      form: {
        name: "",
        name1: "",
        delivery: false,
        password: "",
        Email: "",
        Email1: "",
        tel: "",
        tel1: "",
        region2: ""
      },
      formLabelWidth: "120px",
      rids: "",
      fpname: "",
      fprolename: "",
      fplist: []
    };
  },
  methods: {
    //角色分配
    fenpei() {
      let aa = this.fplist.filter(item => {
        return item.roleName == this.form.region2;
      });
      let bb = aa[0].id;
      // console.log(bb)
      let obj = {
        id: bb,
        rids: this.rids
      };
      _product.userfp(obj).then(res => {
        if (res.data.meta.status == 200) {
          this.getData();
          this.dialogFormVisible2 = false
        }
        // console.log(res);
      });
    },
    //角色  弹出框
    fenpeijs(n, i) {
      this.dialogFormVisible2 = true;
      // console.log(n, i);
      this.fpname = i.username;
      this.fprolename = i.role_name;
      this.rids = i.id;
      // console.log(this.rids);
      _product.roles1().then(res => {
        //  console.log(res.data.data);
        this.fplist = res.data.data;
        // console.log(this.fplist);
      });
    },
    //修改状态
    upcheck(n, i) {
      // console.log(n, i);
      _product.upcheck(i).then(res => {
        console.log(res);
      });
    },
    //编辑用户
    updateItem() {
      let obj = {
        username: this.form.name1,
        email: this.form.Email1,
        mobile: this.form.tel1,
        id: this.rids
      };
      _product.userupdate(obj).then(res => {
        // console.log(res);
        if (res.data.meta.status == 200) {
          this.getData();
        }
      });
    },
    //编辑----弹框
    userUpdate(n, i) {
      this.dialogFormVisible1 = true;
      this.rids = i.id;
    },
    //删除用户
    userDel(n, i) {
      // console.log(n,i)
      _product.usersdel(i.id).then(res => {
        // console.log(res)
        if (res.data.meta.status == 200) {
          this.getData();
        }
      });
    },
    //添加用户
    Adduser() {
      this.dialogFormVisible = false;
      let obj = {
        username: this.form.name,
        password: this.form.password,
        email: this.form.Email,
        mobile: this.form.tel
      };
      _product.users2(obj).then(res => {
        // console.log(res);
        if (res.data.meta.status == 201) {
          this.getData();
        }
      });
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    handleSizeChange(val) {
      let obj = {
        val: val,
        num: 1
      };
      _product.users1(obj).then(res => {
        this.tableData = res.data.data.users;
      });
    },
    handleCurrentChange(val) {
      let obj = {
        num: val,
        val: 10
      };
      _product.users1(obj).then(res => {
        this.tableData = res.data.data.users;
      });
    },
    getData() {
      _product.users().then(res => {
        this.tableData = res.data.data.users;
        // console.log(this.tableData)
      });
    }
  },
  created() {
    //   users
    this.getData();
  }
};
</script>

<style lang="" scoped>
</style>