<template>
  <div class="wrap">
    <header class="sign-in">
      <img src="../../assets/img/logo.jpg" />
      <span class="app-name">企业后台管理系统</span>
    </header>
    <div class="big-box">
      <div class="login-box">
        <h3 class="title">登录</h3>

        <div class="el-form-item__content">
          <img src="../../assets/img/person.png" class="input_icon" />
          <input id="userphone" type="text" class="el-input__inner" placeholder="账号" v-model="loginForm.username"/>
        </div>
        <div class="el-form-item__content">
          <img src="../../assets/img/suo.png" class="input_icon" />
          <input id="password" type="password" class="el-input__inner" placeholder="密码" v-model="loginForm.password" />
        </div>
        <button id="btn-login" class="el-button" @click="handleLogin()">登录</button>
      </div>
    </div>
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
      }
    }
  },
  methods: {
    handleLogin() {
      if(!this.loginForm.username){
        this.$message({
          message:'请输入用户名',
          type: 'error',
          duration: 5 * 1000
        })
        return
      }
      if(!this.loginForm.password){
        this.$message({
          message:'请输入密码',
          type: 'error',
          duration: 5 * 1000
        })
        return
      }
      this.$store.dispatch('Login', this.loginForm).then((res) => {
        if(res.role=='AGENCY'){
          this.$router.push({ path: '/company/register' })
        }else{
          this.$router.push({ path: '/home' })
        }

      }).catch(res => {
        console.log(res)
        this.$message({
          message: res.response && res.response.data.message || '登录失败',
          type: 'error',
          duration: 5 * 1000
        })
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  /*signin*/
  .sign-in{
    text-align: left;
    height: 100px;
    line-height: 100px;
    background: #fff;
    z-index: 1;
  }
  .sign-in img{
    vertical-align: middle;
    margin-left: 9%;
    margin-top: -12px;
    height: 71px;
    width: 71px;
  }
  .sign-in .app-name{
    font-size: 30px;
    line-height: 100px;
    color: #4a4a4a;
  }
  .big-box{
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: url(../../assets/img/login_bd.jpg) no-repeat 50%;
    background-size: cover;
    margin-top: 100px;
  }
  .big-box .login-box{
    position: absolute;
    top: -100px;
    bottom: 0;
    left: 0;
    right: 0;
    width: 20.6%;
    height: 28.4%;
    min-width: 370px;
    min-height: 264px;
    margin: auto;
    margin-right: 21%;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    padding: 0 40px;
    background: #fff;
    border: 1px solid #eaeaea;
    padding-bottom: 20px;
  }
  .big-box .login-box .title{
    text-align: left;
    font-size: 20px;
    color: #4a4a4a;
    padding: 20px 0;
    font-weight: 500;
    margin: 0;
  }
  .big-box .login-box .el-form-item__content{
    position: relative;
    font-size: 14px;
    display: inline-block;
    width: 100%;
    margin-bottom: 20px;
  }
  .big-box .login-box .el-form-item__content .input_icon{
    position: absolute;
    top: 10px;
    left: 13px;
    width: 18px;
    z-index: 1;
  }
  .big-box .login-box .el-input__inner{
    -webkit-appearance: none;
    background-color: #fff;
    background-image: none;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    font-size: inherit;
    height: 40px;
    line-height: 1;
    outline: 0;
    padding: 0 15px;
    transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    width: 100%;
    padding-left: 40px;
  }
  .big-box .login-box .el-button{
    color: #fff;
    background-color: #1aad19;
    border-color: #1aad19;
    padding: 12px 20px;
    font-size: 14px;
    border-radius: 4px;
    width: 100%;
  }

</style>


