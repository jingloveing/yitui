<template>
  <div class="user">
    <div class="title"><span class="circle"></span>企业信息</div>
    <div class="main">
      <label class="label">
        <div>
          <span class="title-name">企业LOGO：</span><img :src="enterprise.logo || '/src/assets/img/default_user.png'" alt="" class="photo">
          <label class="btn" for="upload">修改</label>
          <input id="upload" type="file" style="display: none" @change="uploadImg($event)" multiple
                 accept="image/*">
        </div>
        <el-tooltip placement="right">
          <div slot="content">该LOGO将显示在企管 <br>后台，以及作为企业动态<br>中公司的头像</div>
          <img src="/src/assets/img/question.png" alt="" class="question">
        </el-tooltip>
      </label>
      <label class="label">
        <div>
          <span class="title-name">主体简称：</span><span class="des">{{ enterprise.abbreviation }}</span>
          <button class="btn" @click="editAbbreviation = true">修改</button>
        </div>
        <el-tooltip placement="right">
          <div slot="content">企业简称将显示在企业 <br>动态、后台名称、AI名<br>片姓名下</div>
          <img src="/src/assets/img/question.png" alt="" class="question">
        </el-tooltip>
      </label>
      <label class="label">
        <div>
          <span class="title-name">企业名称：</span><span class="des">杭州易呼智能科技有限公司</span>
        </div>
      </label>
      <label class="label">
        <div>
          <span class="title-name">名片数量：</span><span class="des">{{ enterprise.cardTotal - enterprise.cardUsed }}/{{ enterprise.cardTotal }}</span>
        </div>
        <el-tooltip placement="right">
          <div slot="content">数值为“已开通数/最大开通 <br>数”，若需要增加最大开通<br>数，请联系你的代理商</div>
          <img src="/src/assets/img/question.png" alt="" class="question">
        </el-tooltip>
      </label>
      <label class="label">
        <div>
          <span class="title-name">到期时间：</span><span class="des">{{ enterprise.expireAt | formatDate }}</span>
        </div>
      </label>
      <label class="label">
        <div>
          <span class="title-name">公司地址：</span><span class="des">{{ enterprise.address }}</span>
          <button class="btn" @click="editAddress=true">修改</button>
        </div>
      </label>
      <label class="label">
        <div>
          <span class="title-name">登录账号</span><span class="des">{{ user.mobile }}</span>
        </div>
        <el-tooltip placement="right">
          <div slot="content">该手机同时作为本账号的<br>登录账号，成功修改后登<br>录账号也将被修改</div>
          <img src="/src/assets/img/question.png" alt="" class="question">
        </el-tooltip>
      </label>
    </div>
    <!--修改企业简称---model-->
    <el-dialog
      title="修改企业简称"
      :visible.sync="editAbbreviation"
      width="30%"
      center class="model1">
      <div class="editModel-main">
        <el-form label-width="100px">
          <el-form-item label="主体简称" prop="name">
            <el-input v-model="abbreviation"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="updateAbbreviation()">保存</el-button>
    <el-button @click="editAbbreviation = false">取 消</el-button>

  </span>
    </el-dialog>
    <!--修改公司地址---model-->
    <el-dialog
      title="修改公司地址"
      :visible.sync="editAddress"
      width="30%"
      center class="model1">
      <div class="editModel-main">
        <el-form label-width="100px">
          <el-form-item label="公司地址" prop="name">
            <el-input v-model="address"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="updateAddress()">保存</el-button>
    <el-button @click="editAddress = false">取 消</el-button>

  </span>
    </el-dialog>
  </div>
</template>

<script>
  import util from '@/utils/util'
  import axios from 'axios/index'
  import {mapGetters} from 'vuex'

  export default {
    name: 'user',
    data() {
      return {
        uploadUrl: process.env.BASE_URL + '/oss/upload',
        editAbbreviation: false,
        abbreviation: '',
        editAddress: false,
        address: '',
      }
    },
    computed: {
      ...mapGetters([
        'enterprise',
        'user'
      ])
    },
    filters: {
      formatDate (time) {
        let date = new Date(time)
        return util.formatDate(date, 'yyyy-MM-dd hh:mm')
      }
    },
    methods: {
      uploadImg(e) {
        const formData = new FormData();
        formData.append('file', e.target.files[0]);
        let config = {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
        axios.post(this.uploadUrl, formData, config).then((res) => {
          this.$store.dispatch('UpdateEnterprise', {
            logo: res.data.url
          });
        }, (err) => {
        })
      },
      updateAbbreviation() {
        this.editAbbreviation = false
        this.$store.dispatch('UpdateEnterprise', {
          abbreviation: this.abbreviation
        });
      },
      updateAddress() {
        this.editAddress = false
        this.$store.dispatch('UpdateEnterprise', {
          address: this.address
        });
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .user {
    margin-top: 20px;
    background: rgba(255, 255, 255, 1);
    min-height: 700px;
    border-radius: 4px;
    box-shadow: 0rem 0rem 2px 2px rgba(35, 51, 95, 0.1);
    &:before {
      display: table;
      content: "";
    }
    .title {
      height: 50px;
      line-height: 50px;
      padding-left: 20px;
      border-bottom: 1px solid rgba(228, 233, 244, 1);;
      .circle {
        width: 10px;
        height: 10px;
        margin-right: 10px;
        background: rgba(161, 154, 255, 1);
        border-radius: 50%;
        display: inline-block;
      }
    }
    .main {
      .label {
        width: 100%;
        font-size: 14px;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 22px 200px 22px 100px;
        &:nth-child(even) {
          background: rgba(249, 251, 255, 1);
        }
        .title-name {
          display: inline-block;
          width: 130px;
          margin-right: 22px;
          text-align: right;
        }
        .photo {
          width: 54px;
          height: 54px;
          border-radius: 50%;
        }
        .des {
          font-size: 14px;
          font-weight: 400;
          color: rgba(68, 68, 68, 1);
        }
        .btn {
          width: 54px;
          height: 26px;
          line-height: 26px;
          border: 1px solid rgba(117, 114, 255, 1);
          border-radius: 13px;
          margin-left: 174px;
          background: white;
          color: rgba(117, 114, 255, 1);
          outline: none;
          font-size: 14px;
          padding: 0;
        }
        .question {
          width: 20px;
          height: 20px;
        }
      }

    }
  }
</style>
<style rel="stylesheet/scss" lang="scss">
  .user {
    .el-dialog--center {
      min-width: 500px;
    }
    .el-dialog__header {
      background: rgba(57, 67, 89, 1);

    }
    .el-dialog__title {
      color: white;
    }
  }
</style>
