<template>
  <div class="register">
    <div class="title">填写企业开户资料</div>
    <el-form :model="formData" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="登录名称" prop="userNickName">
        <el-input v-model="formData.userNickName"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="mobile">
        <el-input v-model="formData.mobile"></el-input>
      </el-form-item>
      <el-form-item label="公司名称" prop="name">
        <el-input v-model="formData.name"></el-input>
      </el-form-item>
      <el-form-item label="公司地址" prop="address">
        <el-input v-model="formData.address"></el-input>
      </el-form-item>
      <el-form-item label="名片数量" prop="cardTotal">
        <el-input v-model="formData.cardTotal"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click.native.prevent="toRegister()" :loading="loading">立即开户</el-button>
        <el-button @click="resetForm('ruleForm')">重新填写</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>
  import enterprise from '@/api/enterprise'

  export default {
    name: 'register',
    data() {
      return {
        loading: false,
        formData: {
          userNickName: '',
          mobile: '',
          name: '',
          address: '',
          cardTotal: ''
        },
        rules: {
          userNickName: [
            {required: true, message: '请输入登录名称', trigger: 'blur'},
          ],
          mobile: [
            {required: true, message: '请输入手机号', trigger: 'blur'},
          ],
          name: [
            {required: true, message: '请输入公司名称', trigger: 'blur'},
          ],
          address: [
            {required: true, message: '请输入公司地址', trigger: 'blur'},
          ],
          cardTotal: [
            {required: true, message: '请输入名片数量', trigger: 'blur'},
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
            enterprise.create(this.formData).then(() => {
              this.loading = false
              this.$message({
                message: '开户成功',
                type: 'success',
                duration: 5 * 1000
              })
            }, res => {
              this.loading = false
              this.$message({
                message: (res.response && res.response.data.message) || '开户失败',
                type: 'success',
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
  .register {
    margin-top: 20px;
    height: 700px;
    background: rgba(255, 255, 255, 1);
    border-radius: 4px;
    box-shadow: 0rem 0rem 2px 2px rgba(35, 51, 95, 0.1);
  }

  .register:before {
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

  .register .el-form {
    margin-left: 87px;
    margin-top: 48px;
  }

</style>
<style>
  .register .el-form .el-form-item__content {
    width: 290px;
  }

  .register .el-form-item {
    margin-bottom: 26px;
  }
</style>
