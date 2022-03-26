<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{path:'/home'}">首页</el-breadcrumb-item>
      <el-breadcrumb-item>事假中心</el-breadcrumb-item>
      <el-breadcrumb-item>销假</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片 -->
    <el-card class="box-card">
      <el-button type="primary">销假</el-button>
    </el-card>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
</style>