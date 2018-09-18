<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">
      <img src="../../assets/login-logo.png" alt="" class="logo">
      <h3 class="title">后台管理系统</h3>
      <el-form-item prop="username" style="border-bottom: 1px solid #fff;">
        <span class="svg-container svg-container_login">
          <svg-icon icon-class="logo_user" />
        </span>
        <el-input v-model="loginForm.username" name="username" type="text" auto-complete="off" placeholder="Username" />
      </el-form-item>
      <el-form-item prop="password" style="border-bottom: 1px solid #fff;">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :type="pwdType"
          v-model="loginForm.password"
          name="password"
          auto-complete="off"
          placeholder="Password"
          @keyup.enter.native="handleLogin" />
        <span class="show-pwd" @click="showPwd">
          <svg-icon icon-class="eye" />
        </span>
      </el-form-item>
      <el-form-item>
        <el-button :loading="loading" type="primary" style="width:100%;background: rgba(29,103,68,1);border-color: rgba(29,103,68,1);height: 41px;" @click.native.prevent="handleLogin">
          LOGIN
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入正确的用户名'))
      } else {
        callback()
      }
    }
    const validatePass = (rule, value, callback) => {
      callback()
    }
    return {
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePass }]
      },
      loading: false,
      pwdType: 'password'
    }
  },
  methods: {
    showPwd() {
      if (this.pwdType === 'password') {
        this.pwdType = ''
      } else {
        this.pwdType = 'password'
      }
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('Login', this.loginForm).then((res) => {
            this.loading = false
            this.$router.push({ path: '/home' })
          }).catch(() => {
            this.loading = false
          })

        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
$bg:#2d3a4b;
$light_gray:#eee;

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
      &:-webkit-autofill {
        -webkit-box-shadow: 0 0 0px 1000px rgba(1, 1, 1,.23) inset !important;
        background-color: rgba(250, 250, 250,0) !important;
        -webkit-text-fill-color: #fff !important;
      }
    }
  }
  .el-form-item {
    color: #454545;
    margin:0 auto 22px;
    width: 278px;
  }
}

</style>

<style rel="stylesheet/scss" lang="scss" scoped>
$dark_gray:#889aa4;
$light_gray:#eee;
.login-container {
  position: fixed;
  height: 100%;
  width: 100%;
  background-image: url(../../assets/login_bg.jpg);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  .login-form {
    position: absolute;
    left: 0;
    right: 0;
    margin: 200px auto;
    width:600px;
    height:400px;
    background:rgba(1,1,1,.23);
    border-radius:12px;
    text-align: center;
    .logo{
      width: 152px;
      height: 47px;
      margin: 18px 0;
    }
  }
  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
    &_login {
      font-size: 20px;
    }
  }
  .title {
    font-size: 14px;
    font-weight:400;
    color:rgba(255,255,255,1);
    line-height:22px;
    margin: 0px auto 40px auto;
    text-align: center;
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


