<!--  -->
<template>
  <div class="roles">
    <div class="roles_content">
      <div class="roles_right">
        <p class="roles_right_title">
          <span>首页></span>
          <span>数据统计></span>
          <span>数据报表></span>
        </p>
        <div class="roles_right_content">
          <div id="myChart"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import Product from "../services/product-service";
let echarts = require("echarts");
const _product = new Product();
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      name: "information"
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    draw() {
      // 初始化echarts实例
      //       let myChart = this.$echarts.init(document.getElementById('reports'))
      let myChart = this.$echarts.init(document.getElementById("myChart")); // 绘制图表
      var option = {
        title: {
          text: "用户来源"
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985"
            }
          }
        },
        legend: {
          data: this.legend
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: this.xAxis
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: this.series
      }; // 防止越界，重绘canva
      window.onresize = myChart.resize;
      myChart.setOption(option); // 设置option
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    _product.reports().then(res => {
      if (res.data.meta.status === 200) {
        this.legend = res.data.data.legend.data;
        this.series = res.data.data.series;
        this.xAxis = res.data.data.xAxis[0].data;
        this.yAxis = res.data.data.yAxis;
        console.log(this.legend);
        this.draw();
      }
      console.log(res.data.data);
    });
  },
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
.roles {
  width: 100%;
}
.roles_content {
  display: flex;
  width: 100%;
  /* background-color: #ddd; */
}
#myChart {
  width: 800px;
  height: 400px;
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
  width: 95%;
  /* height: 825px; */
  height: 100%;
  background-color: white;
  border-radius: 5px;
  margin: 0;
  box-sizing: border-box;
  /* padding: 20px; */
}
</style>