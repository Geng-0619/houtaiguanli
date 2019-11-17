<template>
  <div style="width:93%;" class="goodxq">
    <!-- 商品名称 -->
    <el-form
      :model="numberValidateForm"
      ref="numberValidateForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item
        label="商品名称"
        prop="goodsname"
        :rules="[
      { required: true, message: '请输入商品名称'}
    ]"
      >
        <el-input type="text" v-model.number="numberValidateForm.goodsname" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <!-- 商品价格 -->
    <el-form
      :model="numberValidateForm"
      ref="numberValidateForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item
        label="商品价格"
        prop="goodsprice"
        :rules="[
      { required: true, message: '请输入商品价格'}
    ]"
      >
        <el-input type="number" v-model.number="numberValidateForm.goodsprice" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <!-- 商品重量 -->
    <el-form
      :model="numberValidateForm"
      ref="numberValidateForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item
        label="商品重量"
        prop="goodswigth"
        :rules="[
      { required: true, message: '请输入商品重量'}
    ]"
      >
        <el-input type="number" v-model.number="numberValidateForm.goodswigth" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <!-- 商品数量 -->
    <el-form
      :model="numberValidateForm"
      ref="numberValidateForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item
        label="商品数量"
        prop="goodsnum"
        :rules="[
            { required: true, message: '请输入商品数量'}
    ]"
      >
        <el-input type="number" v-model.number="numberValidateForm.goodsnum" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <!-- 商品分类 -->
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
    <!--  -->
  </div>
</template>

<script>
import Product from "../services/product-service.js";
const _product = new Product();
export default {
  data() {
    return {
      numberValidateForm: {
        goodsname: "",
        goodsprice: "",
        goodswigth: "",
        goodsnum: ""
      },
      options: [],
      acc1: []
    };
  },
  created() {
    _product.goodsfl().then(res => {
      console.log(res);
      this.options = res.data.data;
    });
  },
  methods: {
    handleChange(value) {
      this.$store.state.goods_name = this.numberValidateForm.goodsname;
      this.$store.state.goods_price = this.numberValidateForm.goodsprice;
      this.$store.state.goods_weight = this.numberValidateForm.goodswigth;
      this.$store.state.goods_number = this.numberValidateForm.goodsnum;
      this.$store.state.goods_cat = this.acc1.join(',');
      // console.log(this.acc1.join(','));
      //   console.log(value[value.length-1]);
      this.$store.state.acc = value;
      let res = this.$refs.sss.getCheckedNodes();
      //  console.log(res[0].data.cat_id)
      this.$store.state.rids = res[0].data.cat_id;
    }
  }
};
</script>

<style lang="" scoped>
</style>