<template>
  <div class="myInfo">
    <div class="title">修改密码</div>
    <el-form :model="formData" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm"
             @submit.native="submitForm('ruleForm')"
             @submit.native.prevent>
      <el-form-item label="昵称" prop="nickName">
        <el-input v-model="formData.nickName"></el-input>
      </el-form-item>
      <el-form-item label="头像" prop="avatar">
        <el-upload
          class="avatar-uploader"
          :action="uploadUrl"
          :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
          <img v-if="formData.avatar" :src="formData.avatar" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="手机" prop="mobile">
        <el-input v-model="formData.mobile" disabled></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="formData.email"></el-input>
      </el-form-item>
      <el-form-item style="display: flex;" class="btn-box">
        <el-button type="primary" native-type="submit" :loading="loading" class="my-btn save">确认修改</el-button>
        <button @click="resetForm('ruleForm')" class="my-btn reset">重新填写</button>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    name: "myInfo",
    data() {
      return {
        uploadUrl: process.env.BASE_URL + '/oss/upload',
        loading:false,
        formData: {
          nickName: '',
          avatar: '',
          mobile: '',
          email: ''
        },
        rules: {
          nickName: [
            { required: true, message: '请输入登录名称', trigger: 'blur' },
          ],
          avatar: [
            { required: true, message: '请输入头像', trigger: 'blur' },
          ],
          mobile: [
            { required: true, message: '请输入手机号', trigger: 'blur' },
          ]
        }
      };
    },
    computed: {
      ...mapGetters([
        'user',
      ])
    },
    created () {
      this.$store.dispatch('GetUser').then(res => {
        this.formData = {
          nickName: res.nickName,
          avatar: res.avatar,
          mobile: res.mobile,
          email: res.email,
        }
      });
    },
    methods: {
      handleAvatarSuccess (res, file) {
        this.formData.avatar = res.url
      },
      beforeAvatarUpload (file) {
        const isImg = file.type === 'image/jpeg' || 'image/png'
        const isLt2M = file.size / 1024 / 1024 < 2

        if (!isImg) {
          this.$message.error('上传图片只能是 JPG、PNG 格式!')
        }
        if (!isLt2M) {
          this.$message.error('上传图片大小不能超过 2MB!')
        }
        return isImg && isLt2M
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      submitForm() {
        this.$refs.ruleForm.validate(valid => {
          if (valid) {
            this.loading = true
            this.$store.dispatch('UpdateUser', this.formData).then((res) => {
              this.loading = false
              this.$message({
                message: '修改成功',
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
