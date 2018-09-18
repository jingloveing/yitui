<template>
  <div class="myInfo">
    <div class="title">修改密码</div>
    <el-form :model="formData" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="用户名" prop="loginName">
        <el-input v-model="formData.loginName"></el-input>
      </el-form-item>
      <el-form-item label="昵称" prop="tel">
        <el-input v-model="formData.tel"></el-input>
      </el-form-item>
      <el-form-item label="头像" prop="department">
        <el-upload
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :on-success="handleAvatarSuccess">
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="手机" prop="address">
        <el-input v-model="formData.address"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="openCard">
        <el-input v-model="formData.openCard"></el-input>
      </el-form-item>
      <el-form-item style="display: flex;" class="btn-box">
        <button @click.native.prevent="toRegister()" :loading="loading" class="my-btn save">确认修改</button>
        <button @click="resetForm('ruleForm')" class="my-btn reset">重新填写</button>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>
  export default {
    name: "myInfo",
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
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
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
  .myInfo{
    margin-top: 20px;
    height:700px;
    background:rgba(255,255,255,1);
    border-radius:4px;
    box-shadow:0rem 0rem 2px 2px rgba(35,51,95,0.1);
  }
  .myInfo:before{
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
  }
  .save{
    background:rgba(37,189,197,1);
    color:rgba(255,255,255,1);
  }
  .reset{
    background: white;
    border:1px solid rgba(209,209,209,1);
    color:rgba(68,68,68,1);
  }
</style>
<style rel="stylesheet/scss" lang="scss">
  .myInfo{
    .el-form{
      margin-left: 87px;margin-top: 48px;
    }
    .el-form .el-form-item__content{
      width: 220px;
    }
    .el-form-item{
      margin-bottom: 26px;
    }
    .btn-box .el-form-item__content{
      display: flex;
      justify-content: space-between;
    }


    .avatar-uploader .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
      border-color: #409EFF;
    }
    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 80px;
      height: 80px;
      line-height: 80px;
      text-align: center;
    }
    .avatar {
      width: 80px;
      height: 80px;
      line-height: 80px;
      display: block;
    }
  }

</style>
