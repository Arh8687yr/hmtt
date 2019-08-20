<template>
  <div class="home">
    <!-- element-ui外层容器 -->
    <el-container>
      <!-- 左侧边栏容器 -->
      <el-aside>1</el-aside>
      <!-- 右侧边栏容器 -->
      <el-container>
        <!-- 右侧头部区域 -->
        <el-header>2</el-header>
        <!-- 右侧主区域 -->
        <el-main>3</el-main>
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
