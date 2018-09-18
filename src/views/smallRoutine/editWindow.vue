<template>
  <div class="editWindow">
    <div class="left">
      <div class="list">
          <a v-for="(item,index) in tabList" :class="tabActive==index?'active':''" @click="tabActive=index" :href="'#'+index">
            <div>
              <img :src="item.img1" alt="" v-show="tabActive!=index">
              <img :src="item.img2" alt="" v-show="tabActive==index">
              <p>{{item.title}}</p>
            </div>
          </a>
      </div>
    </div>
    <div class="center">
      <div class="header">
        官网 <img src="/src/assets/img/samll_icon.png" alt="" style="width: 80px;height: 23px;">
      </div>
      <div class="swiper-container" id="0">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(item,index) in bannerArr">
            <img :src="item" alt="">
          </div>
        </div>
      </div>
      <div class="part" id="1">
        <h5>企业简介</h5>
        <div class="part-intro">
          杭州易呼智能科技有限公司（简称：易呼）智能，是一家数据智能技术服务公司，专注大数据和人工智能技术并将其应用于商业领域。
          公司在人工智能、语音识别、行业知识图谱处于行业顶尖水平，并持有多项技术专利和著作权。其自主研发的易呼智能语音机器人，易呼电销机器人，易呼客服机器人，易呼客服辅助/培训机器人，易呼智能呼叫中心，易呼企业数据中台，致力为与帮助企业升级获取客户，洞察市场，服务客户的方式。助推企业获客方式与客户服务方式的转型升级，实现销售、客户服务从劳动密集型向技术密集型转型。
        </div>
      </div>
      <div class="part" id="2">
        <h5>企业咨询</h5>
        <div class="box">
          <div class="img"><img
            src="https://yitui2018.oss-cn-beijing.aliyuncs.com/36cffc15-a646-4d4e-a91e-a51e82f83702.jpg" alt=""
            style="width: 100%; height: 100%;"></div>
          <div class="info">
            <div class="title">宁波上市公司百事乐居地产公司</div>
            <div class="time">2018-09-07 10:55:07
            </div>
          </div>
        </div>
      </div>
      <div class="part" id="3">
        <h5>合作伙伴</h5>
        <div class="infos"><img
          src="https://yitui2018.oss-cn-beijing.aliyuncs.com/7b223a75-1b58-4912-ad3c-342f387839d3.jpg"><img
          src="https://yitui2018.oss-cn-beijing.aliyuncs.com/cba667ef-4ba9-4d0e-b06e-3eff4843d6bd.jpg"><img
          src="https://yitui2018.oss-cn-beijing.aliyuncs.com/c399f8dd-2021-46c4-b934-3d74ac829c82.jpg"><img
          src="https://yitui2018.oss-cn-beijing.aliyuncs.com/576eff03-5a7c-460b-98f7-a854c4a9d445.jpg"><img
          src="https://yitui2018.oss-cn-beijing.aliyuncs.com/a7c4c7f7-9744-458a-b941-aa4889621043.jpg"><img
          src="https://yitui2018.oss-cn-beijing.aliyuncs.com/801782fa-9b97-4058-a435-d0777771703e.jpg"><img
          src="https://yitui2018.oss-cn-beijing.aliyuncs.com/6a092a93-6242-4e0e-8b20-73b5b4f694cc.jpg"><img
          src="https://yitui2018.oss-cn-beijing.aliyuncs.com/6049a7cb-8d42-4afb-ad1e-afb33fafe142.jpg"></div>
      </div>
      <div class="part" id="4">
        <h5>联系我们</h5>
        <div class="items">
          <div class="name"><p>
            刘欢</p>
            <img src="https://yitui2018.oss-cn-beijing.aliyuncs.com/e533c80f-908c-41ae-886e-0e9945936aa3.jpg">
          </div>
          <div class="infos">
            <div class="info_item">手机:15821557570</div>
            <div class="info_item">邮箱:3278331875@qq.com</div>
          </div>
        </div>
      </div>
    </div>
    <div class="right">
      <h3>{{tabList[tabActive].title}}</h3>
      <div class="right-part" v-show="tabActive==0">
        <p class="upload-title">选择图片：<span>(最多可上传4张)</span></p>
        <el-upload
          action="https://jsonplaceholder.typicode.com/posts/"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove">
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
        <div>
          <button class="my-btn">保存</button>
        </div>
      </div>
      <div class="right-part" v-show="tabActive==1">
        <p style="margin-top: 30px;font-size:14px;font-weight:400;color:rgba(102,102,102,1);">填写内容:</p>
        <el-input type="textarea"></el-input>
        <div>
          <button class="my-btn">保存</button>
        </div>
      </div>
      <div class="right-part" v-show="tabActive==2" style="padding: 0 9px;">
        <el-table border
                  ref="multipleTable"
                  :data="list"
                  tooltip-effect="dark"
                  style="width: 100%"
                  class="my-table">
          <el-table-column prop="title" label="咨询标题" width="107"></el-table-column>
          <el-table-column
            label="头像"
            width="107" prop="img">
            <template slot-scope="scope">
              <img :src="scope.row.img" alt="" class="photo">
            </template>
          </el-table-column>
          <el-table-column prop="time" label="发布时间" width="94"></el-table-column>
          <el-table-column prop="status" width="68" label="状态">
            <template slot-scope="scope">
              <el-switch v-model="scope.row.status" active-color="#5FB878"></el-switch>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <button
                style="width:22px;height:22px;line-height:22px;background:rgba(30,159,255,1);border-radius:4px;padding: 0;text-align: center;"
                @click="addModel=true"><img src="/src/assets/img/edit.png" alt=""></button>
              <button
                style="width:22px;height:22px;line-height:22px;background:rgba(241,51,45,1);border-radius:4px;padding: 0;text-align: center;"
                @click="delModel=true"><img src="/src/assets/img/del.png" alt=""></button>
            </template>
          </el-table-column>
        </el-table>
        <div>
          <button class="my-btn" style="width: 84px;" @click="addModel=true">添加咨询</button>
        </div>
      </div>
      <div class="right-part" v-show="tabActive==3">
        <p class="upload-title">合作商：</p>
        <el-upload
          action="https://jsonplaceholder.typicode.com/posts/"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove">
          <i class="el-icon-plus"></i>
        </el-upload>
        <p class="upload-title">（最多可上传9张）</p>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
        <div>
          <button class="my-btn">保存</button>
        </div>
      </div>
      <div class="right-part" v-show="tabActive==4">
        <el-form label-width="80px" class="demo-ruleForm" style="margin-top: 18px;">
          <el-form-item label="活动区域" prop="region">
            <el-select v-model="connect" placeholder="请选择活动区域">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div>
          <button class="my-btn">保存</button>
        </div>
      </div>
    </div>
    <!--添加咨询---model-->
    <el-dialog
      title="添加咨询"
      :visible.sync="addModel"
      width="30%"
      center class="model1">
      <div class="editModel-main">
        <el-form :model="addInfoData" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="咨询标题" prop="name">
            <el-input v-model="addInfoData.name"></el-input>
          </el-form-item>
          <el-form-item label="封面图片">
            <el-upload
              class="avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
            >
              <!--:before-upload="beforeAvatarUpload"-->
              <img v-if="addInfoData.imageUrl" :src="addInfoData.imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="详情内容" prop="desc">
            <el-input type="textarea" v-model="addInfoData.desc"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addModel = false">保存</el-button>
    <el-button @click="addModel = false">取 消</el-button>

  </span>
    </el-dialog>
    <!--删除企业咨询-->
    <el-dialog
      title="信息"
      :visible.sync="delModel"
      width="30%"
      center>
      <span>确定删除吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="delModel = false">确 定</el-button>
    <el-button @click="delModel= false">取 消</el-button>

  </span>
    </el-dialog>
  </div>
</template>

<script>
  import Swiper from 'swiper'

  export default {
    name: 'editWindow',
    data() {
      return {
        tabActive: 0,
        tabList: [
          {
            img1: '/src/assets/img/banner.png',
            img2: '/src/assets/img/banner_active.png',
            title: '轮播图'
          },
          {
            img1: '/src/assets/img/intro.png',
            img2: '/src/assets/img/intro_active.png',
            title: '企业简介'
          },
          {
            img1: '/src/assets/img/info.png',
            img2: '/src/assets/img/info_active.png',
            title: '企业咨询'
          },
          {
            img1: '/src/assets/img/friends.png',
            img2: '/src/assets/img/friends_active.png',
            title: '合作伙伴'
          },
          {
            img1: '/src/assets/img/consult.png',
            img2: '/src/assets/img/consult_active.png',
            title: '联系我们'
          }
        ],
        bannerArr: ['http://img.zcool.cn/community/0117e2571b8b246ac72538120dd8a4.jpg@1280w_1l_2o_100sh.jpg', 'http://img.zcool.cn/community/0117e2571b8b246ac72538120dd8a4.jpg@1280w_1l_2o_100sh.jpg'],
        dialogImageUrl: '',
        dialogVisible: false,
        list: [{
          title: '标题',
          img: 'http://img.zcool.cn/community/0117e2571b8b246ac72538120dd8a4.jpg@1280w_1l_2o_100sh.jpg',
          time: '2018-01-12 12:00:00',
          status: false
        }],
        addModel: false,
        delModel: false,
        addInfoData: {
          name: '',
          desc: '',
          imageUrl: ''
        },
        rules: {
          name: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          desc: [
            { required: true, message: '请填写活动形式', trigger: 'blur' }
          ]
        },
        connect: {}
      }
    },
    methods: {
      handleRemove(file, fileList) {
        console.log(file, fileList)
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url
        this.dialogVisible = true
      },
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw)
      },
    },
    mounted() {
      var mySwiper = new Swiper('.swiper-container', {
        autoplay: true,
        loop: true
      })
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  p {
    margin: 0;
  }

  .editWindow {
    display: flex;
    justify-content: space-between;
    margin: 0 -12px;
    .left {
      width: 326px;
      .list{
        font-size: 14px;
        font-weight: 300;
        border-top: 1px solid rgba(35, 51, 95, 0.08);
        overflow: hidden;
        background: white;
        box-shadow: 0px 0px 6px 0px rgba(35, 51, 95, 0.08);
        .active {
          color: rgba(111, 206, 241, 1);
        }
        a{
          float: left;
          width: 50%;
          height: 163px;
          border-bottom: 1px dotted rgba(225, 225, 225, 1);
          display: flex;
          align-items: center;
          justify-content: center;
          color: rgba(196, 196, 196, 1);
          div{
            text-align: center;
            p {
              margin-top: 26px;
            }
          }
        }
        li:nth-child(odd) {
          border-right: 1px dotted rgba(225, 225, 225, 1);

        }
      }
    }
    .center {
      width: 375px;
      height: 780px;
      overflow-y: scroll;
      background: white;
      .header {
        width: 100%;
        height: 44px;
        background: rgba(31, 45, 61, 1);
        color: white;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 16px;
        img {
          width: 80px;
          height: 23px
        }
      }
      .swiper-container {
        border-bottom: 1px solid rgba(245, 245, 248, 1);;
        .swiper-slide {
          width: 100%;
          height: 450px;
          img {
            width: 100%;
            height: 100%;
          }
        }
      }
      h5 {
        font-size: 14px;
        font-weight: 400;
        color: rgba(34, 34, 34, 1);
        line-height: 40px;
        padding: 0 16px;
        margin: 0;
      }
      .part {
        border-bottom: 1px solid rgba(245, 245, 248, 1);
        .part-intro {
          padding: 12px 15px;
          white-space: pre-line;
          word-break: break-all;
          word-wrap: break-word;
          overflow: hidden;
        }
        .box {
          height: 100px;
          display: -ms-flexbox;
          display: flex;
          -ms-flex-direction: row;
          flex-direction: row;
          text-align: left;
          margin: 15px;
          margin-bottom: 0;
          padding-bottom: 15px;
          background: #fff;
          border-bottom: 1px solid #ddd;
          .img {
            min-width: 100px;
            max-width: 100px;
            min-height: 80px;
            max-height: 80px;
            margin-right: 12px;
            background-size: 100% 100%;
          }
          .info {
            padding: 4px 0;
            position: relative;
            .title {
              font-size: 14px;
              color: #333;
              line-height: 18px;
              display: -webkit-box;
              -webkit-line-clamp: 2;
              overflow: hidden;
            }
            .time {
              color: #666;
              margin-top: 24px;
              font-size: 12px;
              position: absolute;
              bottom: 2px;
              width: 120px;
            }
          }

        }
        .infos {
          background: #fff;
          font-size: 14px;
          text-align: left;
          padding: 15px;
          line-height: 26px;
          img {
            width: 33.33%;
            height: 110px;
            padding-right: 8px;
            margin-bottom: 8px;
            box-sizing: border-box;
          }
        }
        .items{
          position: relative!important;
          border: 1px solid #ddd;
          border-radius: 3px;
          margin: 12px;
          box-sizing: border-box;
          overflow: auto;
          .name{
            padding: 12px 0;
            background: #fff;
            padding-bottom: 34px;
            p{
              color: #333;
              font-size: 14px;
              padding-left: 15px;
            }
            img{
              display: block;
              position: absolute;
              top: 6px;
              right: 12px;
              width: 60px;
              height: 60px;
              border-radius: 6px;
            }
          }
          .infos{
            background: #fff;
            font-size: 14px;
            text-align: left;
            padding: 8px 0 5px 15px;
            line-height: 26px;
          }
        }
      }
    }
    .right {
      width: 480px;
      background: white;
      box-shadow: 0px 0px 6px 0px rgba(35, 51, 95, 0.08);
      h3 {
        height: 55px;
        line-height: 55px;
        text-align: center;
        font-size: 16px;
        font-weight: 400;
        color: rgba(34, 34, 34, 1);
        margin: 0;
        border-top: 1px solid rgba(35, 51, 95, 0.08);
        border-bottom: 1px solid rgba(35, 51, 95, 0.08);
      }
      .right-part {
        padding: 0 40px;
        .upload-title {
          font-size: 14px;
          font-weight: 400;
          color: rgba(102, 102, 102, 1);
          line-height: 80px;
          span {
            font-size: 12px;
            color: rgba(170, 170, 170, 1);
          }
        }
        .my-btn {
          width: 58px;
          height: 36px;
          background: rgba(37, 189, 197, 1);
          border-radius: 2px;
          font-size: 14px;
          font-weight: 400;
          color: rgba(255, 255, 255, 1);
          margin-top: 54px;
        }
        .photo {
          width: 80px;
          height: 50px;
        }
      }
    }
    .editModel-main {
      margin: 0 50px;

    }
  }

</style>
<style rel="stylesheet/scss" lang="scss">
  .editWindow {
    .el-upload--picture-card {
      width: 80px;
      height: 80px;
      line-height: 80px;
      border-radius: 2px;
    }
    .el-upload-list--picture-card .el-upload-list__item {
      width: 80px;
      height: 80px;
      border-radius: 2px;
    }
    .el-table .has-gutter th, .el-table .has-gutter tr {
      background: rgba(243, 243, 243, 1);
      height: 43px;
    }
    .el-table .cell {
      text-align: center;
    }
    .el-table th {
      padding: 0;
    }
    .el-dialog--center {
      min-width: 500px;
    }
    .el-dialog__header {
      background: rgba(57, 67, 89, 1);

    }
    .el-dialog__title {
      color: white;
    }
    .avatar-uploader .el-upload {
      background: rgba(245, 245, 250, 1);
      border: 1px dashed rgba(168, 199, 255, 1);
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
      width: 227px;
      height: 91px;
      line-height: 91px;
      text-align: center;
    }
    .avatar {
      width: 178px;
      height: 178px;
      display: block;
    }
  }

</style>
