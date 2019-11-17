<template>
  <div>
    <div @click="Upperlevel">首页</div>
    <div>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="date" label="#" width="180"></el-table-column>
        <el-table-column prop="name" label="权限名称" width="180"></el-table-column>
        <el-table-column prop="address" label="路径"></el-table-column>
        <el-table-column prop="" label="权限等级"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: "mainleft",
  data() {
    return {
      tableData: [
       
      ]
    };
  },
  methods: {
    Upperlevel(){
      this.$router.push({
        path:"/about"
      })
    }
  },
};
</script>

<style lang="" scoped>
</style>