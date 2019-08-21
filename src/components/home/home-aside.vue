<template>
  <div class="aside">
    <div class="top">
      <img src="../../assets/img/logo_admin.png" alt="logo" />
    </div>
    <div class="title">
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        background-color="#353b4e"
        text-color="#adafb5"
        active-text-color="#ffd04b"
        router
      >
      <!-- router为开启路由模式，开始后 el-menu-item的index江湖作为路由的path进行跳转 -->
        <el-menu-item index="/home">
          <i class="el-icon-menu"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>内容管理</span>
          </template>
          <el-menu-item index="/home/publish">
            <template slot="title">发布文章</template>
          </el-menu-item>
          <el-menu-item index="/home/articles">
            <template slot="title">内容列表</template>
          </el-menu-item>
          <el-menu-item index="/home/comment">
            <template slot="title">评论列表</template>
          </el-menu-item>
          <el-menu-item index="/home/material">
            <template slot="title">素材管理</template>
          </el-menu-item>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>粉丝管理</span>
          </template>
          <el-menu-item index="/home/fansdata">
            <template slot="title">图文数据</template>
          </el-menu-item>
          <el-menu-item index="/home/fansinfo">
            <template slot="title">粉丝概况</template>
          </el-menu-item>
          <el-menu-item index="/home/fansimg">
            <template slot="title">粉丝画像</template>
          </el-menu-item>
          <el-menu-item index="/home/fanslist">
            <template slot="title">粉丝列表</template>
          </el-menu-item>
        </el-submenu>
        <el-menu-item index="/home/account">
          <i class="el-icon-setting"></i>
          <span slot="title">账户信息</span>
        </el-menu-item>
      </el-menu>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
.top {
  height: 60px;
  width: 100%;
  background-color: #2e2f32;
  text-align: center;
  padding: 10px 0;
  img {
    width: 70%;
  }
}
</style>
