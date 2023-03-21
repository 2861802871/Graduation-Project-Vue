<template>
  <div class="welcome">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>欢迎登录</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- <h1>欢迎登录学生出勤管理系统</h1> -->
    <!-- 轮播图 -->
    <el-carousel trigger="click" height="600px">
      <el-carousel-item v-for="item in ImgSrc" :key="item.id">
        <img :src="item.src" alt="" class="images">
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  data () {
    return {
      ImgSrc: [
        { id: 1, src: require('../assets/image/1.jpg') }, { id: 2, src: require('../assets/image/2.jpg') }, { id: 3, src: require('../assets/image/3.jpg') }, { id: 4, src: require('../assets/image/4.jpg') }, { id: 5, src: require('../assets/image/5.jpg') }, { id: 6, src: require('../assets/image/6.jpg') },
      ]
    }
  }
}
</script>

<style lang="less" scoped>
h1 {
  font-size: 20px;
  text-align: center;
  color: rgb(67, 68, 68);
}
.welcome {
  height: 100%;
}
.images {
  // height: auto;
  width: 100%;
}
</style>