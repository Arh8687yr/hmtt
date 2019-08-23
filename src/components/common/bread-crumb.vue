<template>
  <!-- 自定义全局面包屑 -->
  <el-breadcrumb separator=">">
    <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>
      <slot name="title"></slot>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {}
</script>

<style>
</style>
