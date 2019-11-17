<!--  -->
<template>
  <div class="roles">
    <div class="roles_content">
      <div class="roles_right">
        <p class="roles_right_title">
          <span>首页></span>
          <span>商品管理></span>
          <span>参数列表></span>
        </p>
        <div class="roles_right_content">
          <div></div>
          <el-alert title="注意：只允许为第三级分类设置相关参数！" type="warning" :closable="false" show-icon></el-alert>
          <div class="block">
            <span>选择商品分类：</span>
            <el-cascader
              v-model="acc1"
              :options="options"
              ref="getGoodclass"
              :props="{ expandTrigger: 'hover',label:'cat_name',value:'cat_id' }"
              @change="handleChange"
            ></el-cascader>
          </div>
          <div class="active_list">
            <el-tabs v-model="activeName" @tab-click="handleClick">
              <el-tab-pane label="动态参数" name="first">
                <el-button
                  :disabled="activeList.length>0?false:true"
                  size="mini"
                  type="primary"
                  @click="dialogFormVisible=true"
                >添加参数</el-button>
                <el-dialog title="添加动态参数" :visible.sync="dialogFormVisible">
                  <el-form
                    :model="canshucontent"
                    ref="canshucontent"
                    label-width="100px"
                    class="demo-dynamic"
                  >
                    <el-form-item prop="canshucontent" label="动态参数">
                      <el-input v-model="canshucontent"></el-input>
                    </el-form-item>
                  </el-form>
                  <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button :plain="true" type="primary" @click="addcan">确 定</el-button>
                  </div>
                </el-dialog>
                <el-table :data="activeList" style="width: 100%">
                  <el-table-column type="expand">
                    <template slot-scope="props">
                      <el-form label-position="left" inline class="demo-table-expand">
                        <span v-for="(v,i) in props.row.attr_vals.split(',')" :key="i">
                          <el-tag
                            v-if="props.row.attr_vals!==''"
                            @close="activeClosed(v,props.row,i)"
                            closable
                          >{{v}}</el-tag>
                        </span>
                        <el-input
                          class="input-new-tag"
                          v-if="inputVisible"
                          v-model="inputValue"
                          ref="saveTagInput"
                          size="small"
                          :plain="true"
                          @keyup.enter.native="handleInputConfirm"
                          @blur="handleInputConfirm(props.row,props.$index)"
                        ></el-input>
                        <el-button
                          v-else
                          class="button-new-tag"
                          size="small"
                          @click="showInput"
                        >+ New Tag</el-button>
                      </el-form>
                    </template>
                  </el-table-column>
                  <el-table-column type="index" prop="#"></el-table-column>
                  <el-table-column label="参数名称" prop="attr_name"></el-table-column>
                  <el-table-column label="操作" prop="desc">
                    <template slot-scope="scope">
                      <el-button
                        type="primary"
                        :plain="true"
                        @click="editActive(scope.row.$index,scope.row)"
                        icon="el-icon-edit"
                      >编辑</el-button>
                      <el-button
                        type="danger"
                        :plain="true"
                        @click="delActive(scope.row.$index,scope.row)"
                        icon="el-icon-delete"
                      >删除</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </el-tab-pane>
              <el-tab-pane label="静态属性" name="second">
                <el-button
                  :disabled="addList.length>0?false:true"
                  size="mini"
                  type="primary"
                  @click="showjintaicontent=true"
                >添加属性</el-button>
                <el-dialog title="添加静态属性" :visible.sync="showjintaicontent">
                  <el-form
                    :model="jintaicontent"
                    ref="jintaicontent"
                    label-width="100px"
                    class="demo-dynamic"
                  >
                    <el-form-item prop="jintaicontent" label="静态数据">
                      <el-input v-model="jintaicontent"></el-input>
                    </el-form-item>
                  </el-form>
                  <div slot="footer" class="dialog-footer">
                    <el-button @click="showjintaicontent = false">取 消</el-button>
                    <el-button :plain="true" type="primary" @click="addshuxing">确 定</el-button>
                  </div>
                </el-dialog>
                <el-table :data="addList" style="width: 100%">
                  <el-table-column type="expand">
                    <template slot-scope="props">
                      <el-form label-position="left" inline class="demo-table-expand">
                        <el-tag
                          v-for="(v,i) in props.row.attr_vals.split(',')"
                          v-if="props.row.attr_vals!==''"
                          :key="i"
                          closable
                          @close="activeClosed1(v,props.row,i)"
                        >{{v}}</el-tag>
                        <el-input
                          class="input-new-tag"
                          v-if="inputVisibles"
                          v-model="inputValues"
                          ref="saveTagInputs"
                          size="small"
                          :plain="true"
                          @keyup.enter.native="quitehandleInputConfirm"
                          @blur="quitehandleInputConfirm(props.row,props.$index)"
                        ></el-input>
                        <el-button
                          v-else
                          class="button-new-tag"
                          size="small"
                          @click="quiteshowInput"
                        >+ New Tag</el-button>
                      </el-form>
                    </template>
                  </el-table-column>
                  <el-table-column type="index" prop="#"></el-table-column>
                  <el-table-column label="参数名称" prop="attr_name"></el-table-column>
                  <el-table-column label="操作" prop="desc">
                    <template slot-scope="scope">
                      <el-button type="primary" icon="el-icon-edit">编辑</el-button>
                      <el-button
                        type="danger"
                        @click="delquiet(scope.row.$index,scope.row)"
                        icon="el-icon-delete"
                      >删除</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </el-tab-pane>
            </el-tabs>
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
  inject: ["reload"],
  data() {
    //这里存放数据
    return {
      options: [],
      value: [],
      acc1: [],
      activeName: "first",
      activeList: [],
      addList: [],
      inputVisible: false,
      inputVisibles: false,
      inputValue: "",
      inputValues: "",
      dynamicTags: [],
      dialogFormVisible: false,
      canshucontent: "",
      jintaicontent: "",
      showjintaicontent: false
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    handleChange(value) {
      this.acc1 = value;
      _product.attributes(this.acc1[2]).then(res => {
        this.activeList = res.data.data;
        console.log(this.activeList);
      });
      _product.quiet(this.acc1[2]).then(res => {
        this.addList = res.data.data;
        console.log(this.addList);
      });
    },
    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    quiteshowInput() {
      this.inputVisibles = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInputs.$refs.input.focus();
      });
    },
    quitehandleInputConfirm(v, i) {
      let attr = "";
      let inputValues = this.inputValues;
      if (inputValues == "") {
        this.inputVisibles = false;
        this.inputValues = "";
        return false;
      } else {
        if (v.attr_vals == "") {
          attr = inputValues;
        } else {
          attr = v.attr_vals + "," + inputValues;
        }
        let obj = {
          cat_id: v.cat_id,
          attr_id: v.attr_id,
          attr_name: v.attr_name,
          attr_sel: v.attr_sel,
          attr_vals: attr
        };
        console.log(obj);
        _product.delTag(obj).then(res => {
          // console.log(res)
          if (res.data.meta.status == 200) {
            this.addList[i].attr_vals = attr;
            this.inputVisibles = false;
            this.$message({
              message: res.data.meta.msg
            });
            inputValues = "";
          }
        });
      }
    },
    handleInputConfirm(v, i) {
      let attr = "";
      let inputValue = this.inputValue;
      if (inputValue == "") {
        this.inputVisible = false;
        this.inputValue = "";
        return false;
      } else {
        if (v.attr_vals == "") {
          attr = inputValue;
        } else {
          attr = v.attr_vals + "," + inputValue;
        }
        let obj = {
          cat_id: v.cat_id,
          attr_id: v.attr_id,
          attr_name: v.attr_name,
          attr_sel: v.attr_sel,
          attr_vals: attr
        };
        // console.log(obj);
        _product.delTag(obj).then(res => {
          // console.log(res);
          if (res.data.meta.status == 200) {
            this.inputVisible = false;
            this.activeLists[i].attr_vals = attr;
            this.$message({
              message: res.data.meta.msg
            });
            inputValue = "";
          }
        });
      }
    },
    handleClick(tab, event) {},
    addcan() {
      let obj = {
        id: this.acc1[2],
        type: this.canshucontent,
        attr_sel: "many"
      };
      console.log(obj);
      _product.activecan(obj).then(res => {
        if (res.data.meta.status == 201) {
          this.$message({
            message: res.data.meta.msg
          });
          this.dialogFormVisible = false;
          this.reload();
        }
      });
    },
    activeClosed(tag, v, i) {
      console.log(tag, v, i);
      let attr = v.attr_vals.split(",");
      attr.splice(i, 1);
      v.attr_vals = attr.join(",");
      let obj = {
        cat_id: v.cat_id,
        attr_id: v.attr_id,
        attr_name: v.attr_name,
        attr_sel: v.attr_sel,
        attr_vals: v.attr_vals
      };
      // console.log(obj);
      _product.delTag(obj).then(res => {
        // console.log(res.data);
        if (res.data.meta.status == 200) {
          this.activeLists[i].attr_vals = attr;
          // this.inputVisible = false;
          this.$message({
            message: res.data.meta.msg
          });
        }
      });
    },
    activeClosed1(tag, v, i) {
      console.log(tag, v, i);
      let attr = v.attr_vals.split(",");
      attr.splice(i, 1);
      v.attr_vals = attr.join(",");
      let obj = {
        cat_id: v.cat_id,
        attr_id: v.attr_id,
        attr_name: v.attr_name,
        attr_sel: v.attr_sel,
        attr_vals: v.attr_vals
      };
      console.log(obj);
      _product.delTag(obj).then(res => {
        console.log(res.data);
        if (res.data.meta.status == 200) {
          this.addList[i].attr_vals = attr;
          this.inputVisible = false;
          this.$message({
            message: res.data.meta.msg
          });
        }
      });
    },
    addshuxing() {
      let obj = {
        id: this.acc1[2],
        type: this.jintaicontent,
        attr_sel: "only"
      };
      console.log(obj);
      _product.activecan(obj).then(res => {
        if (res.data.meta.status == 201) {
          this.$message({
            message: res.data.meta.msg
          });
          this.showjintaicontent = false;
        }
      });
    },
    editActive(i, v) {},
    delActive(i, v) {
      let obj = {
        cat_id: v.cat_id,
        attr_id: v.attr_id
      };
      _product.delActives(obj).then(res => {
        if (res.data.meta.status == 200) {
          this.$message({
            message: res.data.meta.msg
          });
          this.reload();
        }
      });
    },
    delquiet(i, v) {
      let obj = {
        cat_id: v.cat_id,
        attr_id: v.attr_id
      };
      _product.delquiets(obj).then(res => {
        if (res.data.meta.status == 200) {
          this.$message({
            message: res.data.meta.msg
          });
          this.reload();
        }
      });
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    _product.goodsClass().then(res => {
      this.options = res.data.data;
      console.log(this.options);
    });
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
<style lang='' >
.is-top .is-active {
  background: #fff;
  padding: 0;
}
/* @import url(); 引入公共css类 */
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
.roles {
  width: 100%;
}
.block {
  margin-top: 20px;
}
.active_list {
  margin-top: 30px;
}
.roles_content {
  display: flex;
  width: 100%;
  /* background-color: #ddd; */
}
.roles_right {
  width: 100%;
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
  /* padding: 20px; */
}
</style>