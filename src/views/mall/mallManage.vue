<template>
  <div class="mallManage">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="已上架商品" name="sell" style="margin-left: 50px;">
      </el-tab-pane>
      <el-tab-pane label="已售完" name="sellOut">
        <div>

        </div>
      </el-tab-pane>
      <el-tab-pane label="未上架" name="notSell">
        <div>

        </div>
      </el-tab-pane>
    </el-tabs>
    <div class="main">
      <div>
        <button class="my-btn del-btn" v-show="activeName=='sell' || activeName=='sellOut'" @click="outSellModel=true">下架商品</button>
        <button class="my-btn add-btn" v-show="activeName=='sell'" @click="toAddGoods()">添加商品</button>
        <button class="my-btn edit-btn" v-show="activeName=='sell'" @click="editModel=true">商城编辑</button>
        <button class="my-btn remove-btn" v-show="activeName=='notSell'" @click="delModel=true">删除商品</button>
        <button class="my-btn sell-btn" v-show="activeName=='notSell'">上架商品</button>
        <input type="" class="my-input" placeholder="请输入商品名称">
        <div class="search">
          <img src="/src/assets/img/search.png" alt="">
        </div>
      </div>
      <el-table border
                ref="multipleTable"
                :data="tableData3"
                tooltip-effect="dark"
                style="width: 100%"
                @selection-change="handleSelectionChange"
                class="my-table">
        <el-table-column
          type="selection"
          width="60">
        </el-table-column>
        <el-table-column
          label="产品图片"
          width="90" prop="img">
          <template slot-scope="scope">
            <img :src="scope.row.img" alt="" class="photo">
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="产品名称" show-overflow-tooltip >
        </el-table-column>
        <el-table-column
          prop="address"
          label="产品单价">
        </el-table-column>
        <el-table-column
          prop="address"
          label="销量"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="address"
          label="库存"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="time"
          label="创建时间">
        </el-table-column>
        <el-table-column
          prop="time"
          label="上架时间">
        </el-table-column>
        <el-table-column
          label="操作"
          width="197"
          show-overflow-tooltip>
          <template slot-scope="scope">
            <div class="table-btn table-edit-btn" v-show="activeName=='sell' || activeName=='sellOut'">
              <img src="/src/assets/img/edit.png" alt="">
              编辑
            </div>
            <div class="table-btn table-del-btn" v-show="activeName=='sell' || activeName=='sellOut'" @click="outSellModel=true">
              <img src="/src/assets/img/outsell.png" alt="">
              下架
            </div>
            <div class="table-btn table-edit-btn" v-show="activeName=='notSell'">
              <img src="/src/assets/img/add.png" alt="">上架
            </div>
            <div class="table-btn remove-btn" v-show="activeName=='notSell'" @click="delModel=true">
              <img src="/src/assets/img/del.png" alt="">
              删除
            </div>
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage4"
          :page-sizes="[100, 200, 300, 400]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="400">
        </el-pagination>
      </div>
    </div>
    <!--商品删除---model-->
    <el-dialog
      title="信息"
      :visible.sync="delModel"
      width="30%"
      center>
      <span>确定删除吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
    <el-button @click="centerDialogVisible = false">取 消</el-button>

  </span>
    </el-dialog>
    <!--商品下架---model-->
    <el-dialog
      title="信息"
      :visible.sync="outSellModel"
      width="30%"
      center>
      <span>确定下架吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
    <el-button @click="centerDialogVisible = false">取 消</el-button>

  </span>
    </el-dialog>
    <!--商城编辑---model-->
    <el-dialog
      title="商城编辑"
      :visible.sync="editModel"
      width="50%"
      center class="model1">
     <div class="editModel-main">
       <p class="editModel-title">添加商城首页banner图</p>
       <el-upload
         class="avatar-uploader"
         action="https://jsonplaceholder.typicode.com/posts/"
         :show-file-list="false"
         :on-success="handleAvatarSuccess"
       >
         <!--:before-upload="beforeAvatarUpload"-->
         <img v-if="imageUrl" :src="imageUrl" class="avatar">
         <i v-else class="el-icon-plus avatar-uploader-icon"></i>
       </el-upload>
       <p class="tip">限制一张作为商城也的固定banner图，其尺寸大小建议为：750*300px</p>
     </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="centerDialogVisible = false">保存</el-button>
    <el-button @click="centerDialogVisible = false">取 消</el-button>

  </span>
    </el-dialog>
  </div>
</template>

<script>
    export default {
        name: "mallManage",
      data(){
        return{
          delModel:false,
          outSellModel:false,
          editModel:false,
          activeName:'sell',
          imageUrl: '',
          currentPage4: 4,
          tableData3: [{
            img:'http://img.zcool.cn/community/0117e2571b8b246ac72538120dd8a4.jpg@1280w_1l_2o_100sh.jpg',
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄',
            time:'2018/09/06 12:11:23',
          }],
          multipleSelection: [],
        }
      },
      methods:{
        handleSelectionChange(val) {
          this.multipleSelection = val;
        },
        handleSizeChange(val) {
          console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
          console.log(`当前页: ${val}`);
        },
        handleClick(tab, event) {
          console.log(tab, event);
          console.log(this.activeName)
        },
        handleAvatarSuccess(res, file) {
          this.imageUrl = URL.createObjectURL(file.raw);
        },
        beforeAvatarUpload(file) {
          const isJPG = file.type === 'image/jpeg';
          const isLt2M = file.size / 1024 / 1024 < 2;

          if (!isJPG) {
            this.$message.error('上传头像图片只能是 JPG 格式!');
          }
          if (!isLt2M) {
            this.$message.error('上传头像图片大小不能超过 2MB!');
          }
          return isJPG && isLt2M;
        },
        toAddGoods(){
          this.$router.push('/mall/addGoods')
        }
      },

    }
</script>

<style scoped>
  .mallManage{
    margin-top: 20px;
    min-height:700px;
    background:rgba(255,255,255,1);
    border-radius:4px;
    box-shadow:0rem 0rem 2px 2px rgba(35,51,95,0.1);
  }
  .mallManage:before{
    display: table;
    content: "";
  }
  .main{
    padding: 0 64px;
  }
  .my-btn{
    width:77px;
    height:38px;
    line-height: 38px;
    text-align: center;
    border-radius:2px;
    font-size:14px;
    font-weight:300;
    color:rgba(255,255,255,1);
    margin-right: 30px;
  }
  .del-btn{
    background:rgba(255,87,34,1);
  }
  .add-btn{
    background:rgba(45,173,230,1);
  }
  .edit-btn{
    background:rgba(30,159,255,1);
  }
  .remove-btn{
    background:rgba(241,51,45,1);
  }
  .sell-btn{
    background:rgba(11,149,252,1);
  }
  .my-input{
    outline: none;
    width:171px;
    height:38px;
    border:1px solid rgba(230,230,230,1);
    border-radius:2px;
    padding: 0 20px;
    box-sizing: border-box;
    margin-left: 15px;
  }
  .search{
    width:62px;
    height:38px;
    line-height:38px;
    background:rgba(37,189,197,1);
    border-radius:2px;
    text-align: center;
    cursor: pointer;
    display: inline-block;
    margin-left: 40px;
  }
  .search img{
    width:22px;
    height:22px;
  }
  .my-table{
    margin-top: 16px;
  }
  .my-table .photo{
    width:52px;
    height:52px;
    border-radius:50%;
  }
  .block{
    padding: 39px 0 53px;
    text-align: center;
  }
  .block .el-pagination{
    display: inline-block;
  }
  .table-btn{
    width:72px;
    height:40px;
    line-height: 40px;
    border-radius:2px;
    font-size:14px;
    font-weight:300;
    color:rgba(255,255,255,1);
    display: inline-block;
  }
  .table-btn img{
    width:15px;
    height:15px;
  }
  .table-edit-btn{
    background:rgba(30,159,255,1);
    margin-right: 17px;
  }
  .table-del-btn{
    background:rgba(255,87,34,1);
  }
.editModel-main{
  margin: 0 90px;
}
.editModel-title{
  font-size:14px;
  font-weight:300;
  color:rgba(102,102,102,1);
  margin-bottom: 30px;
}
.editModel-main .tip{
  margin-top: 20px;
  width:228px;
  height:34px;
  font-size:12px;
  font-weight:300;
  color:rgba(153,153,153,1);
  line-height:20px;
}



</style>
<style>
  .el-dialog__header{
    background:rgba(57,67,89,1);

  }
  .el-dialog__title{
    color: white;
  }
  .mallManage .el-tabs__nav-wrap{
    padding-left: 64px;
    height: 62px;
    line-height: 62px;
  }
  .mallManage .el-tabs__nav-wrap::after{
    height: 1px;
    background-color:rgba(242,242,242,1);
  }
  .el-table .has-gutter th,.el-table .has-gutter tr{
    background: rgba(243,243,243,1);
  }
  .el-table .cell{
    text-align: center;
  }
  .el-table td, .el-table th{
    padding: 0;
    height: 63px;
  }
  .mallManage .avatar-uploader .el-upload {
    background:rgba(245,245,250,1);
    border:1px dashed rgba(168,199,255,1);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .mallManage .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .mallManage .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 227px;
    height: 91px;
    line-height: 91px;
    text-align: center;
  }
  .mallManage .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
