<template>
  <div class="home">
    <!-- element-ui外层容器 -->
    <el-container>
      <!-- 左侧边栏容器 -->
      <el-aside style="min-height: 100vh; width: 200px; background-color: #323745;">
        <home-aside></home-aside>
      </el-aside>
      <!-- 右侧边栏容器 -->
      <el-container>
        <!-- 右侧头部区域 -->
        <el-header style="padding:0">
          <home-head></home-head>
        </el-header>
        <!-- 右侧主区域 -->
        <el-main class="main">
          <!-- 二级路由的容器 -->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'home',
  components: {}
}
</script>

<style lang="less" scoped>
.main {
  padding: 0;
}
</style>
