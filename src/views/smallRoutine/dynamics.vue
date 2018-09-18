<template>
   <div class="dynamics">
     <el-tabs v-model="activeName" class="tab">
       <el-tab-pane label="全部" name="all">


       </el-tab-pane>
       <el-tab-pane label="公司" name="company">

       </el-tab-pane>
       <el-tab-pane label="个人" name="self">

       </el-tab-pane>
     </el-tabs>
     <div class="main">
       <el-button type="primary" class="publish" @click="addModel=true">发布企业动态</el-button>
       <div class="main-list">
         <div class="list" v-for="(item,index) in list">
            <div class="flex list-item">
              <img src="/src/assets/img/AI.png" alt="" class="photo">
              <div class="des">
                 <p class="name">易呼智能</p>
                 <p class="time">2013-09-12 15:23:13</p>
                 <p class="publish-title">易推产品易推产品易推产品易推产品易推产品易推产品</p>
                <img src="/src/assets/img/AI.png" alt="" class="publish-picture">
              </div>
            </div>
           <div class="footer">
               <div>
                 <img src="/src/assets/img/no_collect.png" alt="">
                 <!--<img src="/src/assets/img/collect.png" alt="">-->
                 <span>222</span>
               </div>
             <div>
               <img src="/src/assets/img/infos.png" alt="">
               <span>222</span>
             </div>
             <div @click="delModel=true">
               <img src="/src/assets/img/del_gray.png" alt="">
               <span>删除</span>
             </div>
           </div>
         </div>
       </div>
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
     <!--删除动态---model-->
     <el-dialog
       title="信息"
       :visible.sync="delModel"
       width="30%"
       center>
       <span>确定删除吗？</span>
       <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="delModel = false">确 定</el-button>
    <el-button @click="delModel = false">取 消</el-button>
  </span>
     </el-dialog>
     <!--发布企业动态---model-->
     <el-dialog
       title="发布新动态"
       :visible.sync="addModel"
       width="30%"
       center class="model1">
       <div class="editModel-main">
         <el-form :model="addData" ref="ruleForm" label-width="100px" class="demo-ruleForm">
           <el-form-item label="填写内容" prop="desc">
             <el-input type="textarea" v-model="addData.desc"></el-input>
           </el-form-item>
           <el-form-item label="选择图片">
             <el-upload
               action="https://jsonplaceholder.typicode.com/posts/"
               list-type="picture-card"
               :on-preview="handlePictureCardPreview"
               :on-remove="handleRemove">
               <i class="el-icon-plus"></i>
             </el-upload>
           </el-form-item>

         </el-form>
       </div>
       <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addModel = false">保存</el-button>
    <el-button @click="addModel = false">取 消</el-button>

  </span>
     </el-dialog>
   </div>
</template>

<script>
  export default {
    name: 'dynamics',
    data(){
      return{
        activeName:'all',
        list:[1,2,3,3,5,2,2,2,,2,2,,2,2,2,2,22,2,2,2],
        currentPage4: 4,
        delModel:false,
        addModel:false,
        addData:{
          desc:'',
          picture:[]
        },
      }
    },
    methods:{
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
      handleRemove(file, fileList) {
        console.log(file, fileList)
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url
        this.dialogVisible = true
      },
    },
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .dynamics{
    position: relative;
    margin: 18px -12px 0;
    .tab{
      background: white;
    }
    .flex{
      display: flex;
      align-items: flex-start;
    }
    .main{

      .publish{
        position: absolute;
        left: 440px;
        top: 10px;
      }
      .main-list {
        margin: 16px 40px;
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
        .list {
          width: 300px;
          height: 300px;
          background: rgba(255, 255, 255, 1);
          border-radius: 4px;
          box-shadow: 0px 0px 9px 0px rgba(35, 51, 95, 0.06);
          padding: 18px;
          box-sizing: border-box;
          margin:0 10px 20px 10px;
          position: relative;
          .list-item {

          }
          .photo {
            width: 50px;
            height: 50px;
            border-radius: 2px;
            border: 1px solid #ddd;
          }
          .des {
            width: calc(100% - 50px);
            padding-left: 18px;
            box-sizing: border-box;
            .name {
              font-size: 14px;
              font-weight: bold;
              color: rgba(68, 68, 68, 1);
            }
            .time {
              font-size: 14px;
              font-weight: 300;
              color: rgba(153, 153, 153, 1);
            }
            .publish-title {
              font-size: 14px;
              font-weight: 300;
              color: rgba(68, 68, 68, 1);
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
            .publish-picture {
              width: 101px;
              height: 101px;
              margin: 26px 0;
            }
          }
          .footer{
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-around;
            font-size:14px;
            font-weight:300;
            color:rgba(153,153,153,1);
            img{
              width: 18px;
              height: 18px;
            }
          }
        }
      }
      .block{
        padding: 39px 0 53px;
        text-align: center;
        .el-pagination{
          display: inline-block;
        }
      }
    }
  }
  .dynamics:before{
    display: table;
    content: '';
  }



</style>
<style rel="stylesheet/scss" lang="scss">
  .dynamics{
    .el-tabs__nav-wrap{
      padding-left: 64px;
      height: 62px;
      line-height: 62px;
    }
    .el-tabs__nav-wrap::after{
      height: 1px;
      background-color:rgba(242,242,242,1);
    }
    .el-tabs__header{
      margin: 0;
    }
    .el-dialog--center {
      min-width: 500px;
    }
    .el-upload--picture-card {
      width: 110px;
      height: 110px;
      line-height: 110px;
      border-radius: 2px;
    }
    .el-upload-list--picture-card .el-upload-list__item {
      width: 110px;
      height: 110px;
      border-radius: 2px;
    }
  }

</style>
