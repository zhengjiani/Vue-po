<template>
  <div>
<!--    面包屑导航区域-->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>页面对象</el-breadcrumb-item>
      <el-breadcrumb-item>页面对象自动生成</el-breadcrumb-item>
    </el-breadcrumb>
<!--    卡片视图区-->
    <el-card class="box-card">
      <div v-for="o in 4" :key="o" class="text item">

      </div>
    </el-card>
  </div>
</template>

<script>
  export default {
    name: "Auto"
  }
</script>

<style lang="less" scoped>

</style>