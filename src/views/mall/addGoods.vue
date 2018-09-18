<template>
  <div class="addGoods">
    <div class="title">基本信息</div>
    <el-form label-position="right" label-width="80px" :model="formLabelAlign" style="margin: 23px 0 0 103px;">
      <el-form-item label="商品名称">
        <el-input v-model="formLabelAlign.name" style="width: 220px"></el-input>
      </el-form-item>
      <el-form-item label="产品主图">
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
        <p class="tip">第一张为默认封面图，建议图片尺寸: 350*350px 2M以内，你可以拖动图片调整顺序，最多上传5张</p>
      </el-form-item>
      <el-form-item label="产品详情">
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
        <p class="tip">商品详情图，按顺序排列，建议尺寸：宽750px,高不限</p>
      </el-form-item>
    </el-form>
    <h3>价格与库存</h3>
    <el-form ref="form" :model="form" label-width="80px" style="margin-left: 103px;">
      <el-form-item label="商品半价">
        <el-input v-model="form.name" style="width: 100px"></el-input> 元
      </el-form-item>
      <el-form-item label="商品库存">
        <el-input v-model="form.name" style="width: 100px"></el-input> 元
      </el-form-item>
      <el-form-item label="">
        <el-radio-group v-model="form.resource">
          <el-radio label="暂不上架(添加至未上架)"></el-radio>
          <el-radio label="即时上架(添加至已上架)"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>

        <el-button>取消</el-button>
        <el-button type="primary" @click="onSubmit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: 'addGoods',
    data() {
      return {
        formLabelAlign: {
          name: '',
          region: '',
          type: ''
        },
      dialogImageUrl: '',
        dialogVisible: false,
        form: {
          name: '',
          resource: '',
        }
      };
    },
    methods: {
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      onSubmit() {
        console.log('submit!');
      }
    }
  }
</script>

<style scoped>
  .addGoods{
    margin-top: 20px;
    min-height:700px;
    background:rgba(255,255,255,1);
    border-radius:4px;
    box-shadow:0rem 0rem 2px 2px rgba(35,51,95,0.1);
    padding-bottom: 35px;
  }
  .addGoods:before{
    display: table;
    content: "";
  }
  .title{
    height: 67px;
    line-height: 67px;
    font-size:14px;
    font-weight:400;
    color:rgba(68,68,68,1);
    padding: 0 64px;
    box-sizing: content-box;
    border-bottom: 1px solid rgba(233,233,233,1);
  }
  .tip{
    margin-top: 12px;
    width:266px;
    line-height: 20px;
    font-size:12px;
    font-weight:400;
    color:rgba(102,165,192,1);
  }
  h3{
    width:80px;
    height:16px;
    font-size:16px;
    font-weight:400;
    color:rgba(34,34,34,1);
    margin-left: 40px;
  }
</style>
<style>
  .addGoods .el-upload--picture-card {
    width:100px;
    height:100px;
    line-height: 100px;
    background:rgba(245,245,250,1);
    border:1px dashed rgba(145,199,222,1);
    font-size: 28px;
    color: #8c939d;
    text-align: center;
  }

</style>
