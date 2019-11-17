<template>
  <div class="login_box">
    <!-- 登录页面头像 -->
    <div class="user_login">
      <div>
        <img src="../../static/timg.jpg" alt />
      </div>
    </div>
    <!--  element 表单   -->
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <!-- 账号 -->
      <el-form-item label prop="admin">
        <el-input type="text" placeholder="账号" v-model="ruleForm.admin" autocomplete="off"></el-input>
      </el-form-item>
      <!-- 密码 -->
      <el-form-item label prop="password">
        <el-input type="password" placeholder="密码" v-model="ruleForm.password" autocomplete="off"></el-input>
      </el-form-item>
      <!-- 提交重置 -->
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import "../css/login.css";
import Product from "../services/product-service.js";
const _product = new Product();
export default {
  name: "login",
  data() {
    //   密码
    var checkAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入登录密码"));
      } else if (value.length < 5) {
        return callback(new Error("长度在6到15个字符"));
      } else {
        callback();
      }
    };
    // 名称
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入登录名称"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        admin: "",
        password: ""
      },
      //   验证规则
      rules: {
        admin: [{ validator: validatePass, trigger: "blur" }],
        password: [{ validator: checkAge, trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      // 自带验证
      this.$refs[formName].validate(valid => {
        if (valid) {
          //   alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
      //   console.log(this.ruleForm.admin)
      //   console.log(this.ruleForm.password)
      //获取使用v-model绑定的input输入框内容
      let login = {
        // 账号
        username: this.ruleForm.admin,
        // 密码
        password: this.ruleForm.password
      };
      // 登录接口
      _product.login(login).then(res => {
        // console.log(res.data.meta.status)
        // 判断是否成功
        if (res.data.meta.status == 200) {
          localStorage.setItem("token", JSON.stringify(res.data.data.token));
          this.$message({
            message: "登录成功",
            type: "success"
          });
          this.$router.push({
            path: "/home"
          });
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  },
  created() {
    // _product.Dgxq().then(res => {});
  }
};
</script>

<style lang="" scoped>
.login_box {
  width: 100%;
  height: 100%;
  background: url(../../static/bj.gif);
  padding: 130px 0 0 0;
}
</style>