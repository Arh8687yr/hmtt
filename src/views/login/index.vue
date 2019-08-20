<template>
  <div class="con">
    <!-- 卡片区域 -->
    <el-card class="el-card">
      <!-- logo区域 -->
      <div class="logo-top">
        <img src="../../assets/img/logo_index.png" alt="logo黑马头条号" />
      </div>
      <!-- 表单区域 -->
      <el-form :model="formDate" :rules="rules" ref="loginForm">
        <el-form-item prop="mobile">
          <el-input placeholder="请输入手机号" v-model="formDate.mobile"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input placeholder="请输入验证码" v-model="formDate.code" style="width:68%;float:left"></el-input>
          <el-button type="primary" style="float:right">发送验证码</el-button>
        </el-form-item>
        <el-form-item prop='check'>
          <!-- checkbox绑定check -->
          <el-checkbox v-model="formDate.check">我已阅读并同意用户协议和隐私条款</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width: 100%" @click="login">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {

  data () {
    // 定义了一个自定义函数
    var func = function (rule, value, callback) {
      if (value) {
        // 满足校验
        callback() // 同意继续往下走
      } else {
        // 否则不满足校验
        callback(new Error('您必须无条件同意被坑'))
      }
    }

    return {
      formDate: {
        mobile: '',
        code: '',
        check: false
      },
      rules: {
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { pattern: /^1[3456789]\d{9}$/, message: '请输入正确的手机号' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { pattern: /^\d{6}$/, message: '验证码必须为6位数' }
        ],
        check: [{
          validator: func // 自定义函数
        }]
      }
    }
  },
  methods: {
    login () {
      this.$refs.loginForm.validate(isOK => {
        if (isOK) {
          this.$axios({
            method: 'post',
            url: '/authorizations',
            data: this.formDate // post参数是在data中写入的
          }).then(result => {
            window.localStorage.setItem('user-info', JSON.stringify(result.data.data))
            // 编程式导航
            this.$router.push('/home')
          })
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.con {
  width: 100%;
  height: 100vh; // 适配屏幕高度
  background-image: url(../../assets/img/login_bg.jpg);
  background-size: cover; // 设置背景图片铺满容器 默认contain 图片大小显示
  display: flex;
  // 设置卡片垂直 左右居中
  justify-content: center;
  align-items: center;
  .el-card {
    // 卡片区域
    width: 430px;
    height: 340px;
    .logo-top {
      // logo区域
      height: 40px;
      text-align: center;
      padding-bottom: 20px;

      img {
        height: 100%;
      }
    }
  }
}
</style>
