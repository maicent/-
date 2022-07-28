<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">

      <div class="title-container">
        <h3 class="title">明日方舟数据库 登录</h3>
      </div>

      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input ref="username" v-model="loginForm.username" placeholder="用户名" name="username" type="text" tabindex="1" auto-complete="on" />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="密码"
          name="password"
          tabindex="2"
          auto-complete="on"
          @keyup.enter.native="handleLogin"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>

      <el-form-item prop="verifyCodeActual">
        <el-popover
          placement="bottom"
          width="144"
          title="点击更换图片"
          trigger="click"
        >
          <img id="img-vcode" :src="src" @click="getImage">

          <el-input slot="reference" ref="verifyCodeActual" v-model="loginForm.verifyCodeActual" placeholder="请输入验证码" name="verifyCodeActual" type="text" tabindex="1" auto-complete="off" />
        </el-popover>
      </el-form-item>

      <div class="tips">
        <el-link type="primary" icon="el-icon-edit" style="margin-right:20px;" @click="dialogVisible = true">登录代表同意用户协议</el-link>
      </div>

      <el-button id="login" :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleLogin">登录</el-button>
      <el-button style="width:100%;margin-bottom:30px;margin-left:0" @click.native.prevent="reg">注册</el-button>

    </el-form>
    <el-dialog title="用户协议" :visible.sync="dialogVisible" width="40%" :before-close="handleClose">
      <span>1、本网站仅为用户自愿在本站存储数据，用户行为与本站无关</span><br>
      <span>2、本站只利用前端开源技术为用户提供基本的分析服务，不会将数据共享给第三方，更不会使用数据做其他用途</span><br>
      <span>3、如有侵权请联系管理员maicent AT QQ dot com</span><br>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
// import { getKaptcha } from '@/api/user'
export default {
  name: 'Login',
  data() {
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('密码不能小于6位'))
      } else {
        callback()
      }
    }
    const validateCode = (rule, value, callback) => {
      if (value) {
        callback()
      } else {
        callback(new Error('验证码不能为空'))
      }
    }
    return {
      loginForm: {
        username: '',
        password: '',
        verifyCodeActual: ''
      },
      loginRules: {
        verifyCodeActual: [{ required: true, trigger: 'blur', validator: validateCode }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined,
      dialogVisible: false,
      src: ''
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  created() {
    this.getImage()// 获取验证码
  },
  methods: {
    getImage() { // 获取验证码
      this.src = process.env.VUE_APP_BASE_API + '/kaptcha?ts=' + new Date().valueOf()
    },
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('user/login', this.loginForm).then((data) => {
            console.log(this.redirect)
            this.$router.push({ path: this.redirect || '/dashboard/index' })
            this.loading = false
          }).catch((x) => {
            this.loading = false
            console.log(x)
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    reg() {
      this.$router.push({ path: '/reg' })
    },
    xieyi() {
      console.log('sss')
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    }

  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg:#283443;
$light_gray:#fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
