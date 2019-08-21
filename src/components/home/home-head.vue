<template>
  <div class="head">
    <el-row type="flex" class="row-bg" justify="space-between">
      <el-col :span="6">
        <div class="left">
          <i class="el-icon-d-arrow-right"></i>
          <span>今年今日今时今事</span>
        </div>
      </el-col>
      <el-col :span="10">
        <div class="grid-content bg-purple">
          <el-input placeholder="请输入搜索的文章内容" style="width: 60%"></el-input>

          <span class="toux">
            <!-- 动态获取用户头像 -->
            <img :src="user.photo ? user.photo : baseURL" alt="touxiang" />
          </span>

          <el-dropdown trigger="click" @command="commandList">
            <span class="el-dropdown-link">
              {{user.name}}
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <!-- @command为elemen-ui中定义的下拉菜单的事件 -->
            <el-dropdown-menu slot="dropdown">
              <!-- command为事件项 -->
              <el-dropdown-item command="ownInfo">个人信息</el-dropdown-item>
              <el-dropdown-item command="gitAdd">git地址</el-dropdown-item>
              <el-dropdown-item command="getOut">退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data () {
    return {
      user: {},
      baseURL: require('../../assets/img/avatar.jpg') // require将默认地址转为base64
    }
  },
  methods: {
    // 1. 获取用户基本信息
    getUserInfo () {
      // 2. 从localStronage中取出用户登录信息(包含token)
      let userInfo = window.localStorage.getItem('user-info')
      // 3. 如果存在 则取出token不存在则为null
      let token = userInfo ? JSON.parse(userInfo).token : null
      this.$axios({
        url: '/user/profile',
        headers: {
          // 4. 将headers中赋值 后端需要的token身份信息，也就是携带令牌
          Authorization: `Bearer ${token}`
        }
      }).then(result => {
        this.user = result.data.data // 获取到用户最新的个人资料
      })
    },
    commandList (command) {
      // command为事件获取到的项
      // 设置下拉菜单时间项
      // console.log(command)
      if (command === 'ownInfo') {
        this.$router.push('/home/account')
      } else if (command === 'gitAdd') {
        window.location.href = 'https://github.com/Arh8687yr/hmtt'
      } else {
        window.localStorage.clear() // 擦除本项目的数据
        this.$router.push({ path: '/login' })
      }
    }
  },
  created () {
    this.getUserInfo()
  }
}
</script>

<style lang="less" scoped>
.head {
  line-height: 60px;
  .left {
    i {
      padding: 10px;
    }
  }
  .bg-purple {
    height: 60px;
    width: 100%;
    display: flex;
    justify-content: center;
    .toux {
      padding: 0 10px;
      img {
        height: 100%;
      }
    }
  }
}
</style>
