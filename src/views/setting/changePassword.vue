<template>
  <div class="changePassword">
    <div class="title">修改密码</div>
    <el-form :model="formData" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm"
             @submit.native="submitForm('ruleForm')"
             @submit.native.prevent>
      <el-form-item label="当前密码" prop="oldPassword">
        <el-input v-model="formData.oldPassword"></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="newPassword">
        <el-input v-model="formData.newPassword"></el-input>
      </el-form-item>
      <el-form-item label="确认新密码" prop="reNewPassword">
        <el-input v-model="formData.reNewPassword"></el-input>
      </el-form-item>
      <el-form-item>
        <button @click.native.prevent="changePassword()" :loading="loading" class="my-btn">确认修改</button>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>
  export default {
    name: "changePassword",
    data() {
      return {
        loading: false,
        formData: {
          oldPassword: '',
          newPassword: '',
          reNewPassword: ''
        },
        rules: {
          oldPassword: [
            {required: true, message: '请输入当前密码', trigger: 'blur'},
          ],
          newPassword: [
            {required: true, message: '请输入新密码', trigger: 'blur'},
          ],
          reNewPassword: [
            {required: true, message: '再次请输入新密码', trigger: 'blur'},
          ]
        }
      };
    },
    methods: {
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      submitForm() {
        this.$refs.ruleForm.validate(valid => {
          if (valid) {
            if (this.formData.newPassword !== this.formData.reNewPassword) {
              this.$message({
                message: '两次输入密码不一致',
                type: 'error',
                duration: 1000
              })
              return false
            }
            this.loading = true
            this.$store.dispatch('ChangePassword', this.formData).then(() => {
              this.loading = false
              this.$message({
                message: '修改成功',
                type: 'success',
                duration: 5 * 1000
              })
            }).catch(err => {
              console.log(err)
              this.loading = false
              this.$message({
                message: (err.response && err.response.data.message) || '修改失败',
                type: 'error',
                duration: 5 * 1000
              })
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
  .changePassword {
    margin-top: 20px;
    height: 700px;
    background: rgba(255, 255, 255, 1);
    border-radius: 4px;
    box-shadow: 0rem 0rem 2px 2px rgba(35, 51, 95, 0.1);
  }

  .changePassword:before {
    display: table;
    content: "";
  }

  .title {
    height: 67px;
    line-height: 67px;
    font-size: 14px;
    font-weight: 400;
    color: rgba(68, 68, 68, 1);
    padding: 0 25px;
    box-sizing: content-box;
    border-bottom: 1px solid rgba(233, 233, 233, 1);
  }

  .my-btn {
    width: 86px;
    height: 40px;
    border-radius: 2px;
    font-size: 14px;
    font-weight: 300;
    background: rgba(37, 189, 197, 1);
    color: rgba(255, 255, 255, 1);
  }
</style>
<style>
  .changePassword .el-form {
    margin-left: 87px;
    margin-top: 48px;
  }

  .changePassword .el-form .el-form-item__content {
    width: 200px;
  }

  .changePassword .el-form-item {
    margin-bottom: 26px;
  }
</style>
