<template>
  <div class="changePassword">
    <div class="title">修改密码</div>
      <el-form :model="formData" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="当前密码" prop="loginName">
          <el-input v-model="formData.loginName"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="tel">
          <el-input v-model="formData.tel"></el-input>
        </el-form-item>
        <el-form-item label="确认新密码" prop="department">
          <el-input v-model="formData.department"></el-input>
        </el-form-item>
        <el-form-item>
          <button @click.native.prevent="toRegister()" :loading="loading" class="my-btn">确认修改</button>
        </el-form-item>
      </el-form>

  </div>
</template>

<script>
    export default {
        name: "changePassword",
      data() {
        return {
          loading:false,
          formData: {
            loginName: '',
            tel: '',
            department: '',
            address: '',
            openCard: ''
          },
          rules: {
            loginName: [
              { required: true, message: '请输入登录名称', trigger: 'blur' },
            ],
            tel: [
              { required: true, message: '请输入手机号', trigger: 'blur' },
            ],
            department: [
              { required: true, message: '请输入公司名称', trigger: 'blur' },
            ],
            address: [
              { required: true, message: '请输入公司地址', trigger: 'blur' },
            ],
            openCard: [
              { required: true, message: '请输入名片数量', trigger: 'blur' },
            ],
          }
        };
      },
      methods: {
        resetForm(formName) {
          this.$refs[formName].resetFields();
        },
        toRegister() {
          this.$refs.ruleForm.validate(valid => {
            if (valid) {
              this.loading = true
              this.$store.dispatch('Register', this.formData).then((res) => {
                this.loading = false
                this.$message({
                  message: res.data.message,
                  type: 'success',
                  duration: 5 * 1000
                })


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

<style scoped>
  .changePassword{
    margin-top: 20px;
    height:700px;
    background:rgba(255,255,255,1);
    border-radius:4px;
    box-shadow:0rem 0rem 2px 2px rgba(35,51,95,0.1);
  }
  .changePassword:before{
    display: table;
    content: "";
  }
  .title{
    height: 67px;
    line-height: 67px;
    font-size:14px;
    font-weight:400;
    color:rgba(68,68,68,1);
    padding: 0 25px;
    box-sizing: content-box;
    border-bottom: 1px solid rgba(233,233,233,1);
  }
  .my-btn{
    width:86px;
    height:40px;
    border-radius:2px;
    font-size:14px;
    font-weight:300;
    background:rgba(37,189,197,1);
    color:rgba(255,255,255,1);
  }
</style>
<style>
  .changePassword .el-form{
    margin-left: 87px;margin-top: 48px;
  }
  .changePassword .el-form .el-form-item__content{
    width: 200px;
  }
  .changePassword .el-form-item{
    margin-bottom: 26px;
  }
</style>
