<template>
  <div class="structure">
    <div class="titles">{{ user.profile.departmentName }}({{ total }})</div>
    <div class="title">
      <div style="display: inline-block;">
        <label class="my-label">
          <span>姓名</span>
          <input v-model="listParams.keyword" class="my-input">
        </label>
      </div>
      <div class="search" @click="getList()">
        <img src="/src/assets/img/search.png" alt="">
      </div>
    </div>
    <div class="main">
      <button class="add-btn" @click="centerDialogVisible = true">添加</button>
      <button class="del-btn" @click="deleteUser()">删除</button>
      <el-table border
                ref="multipleTable"
                :data="list"
                tooltip-effect="dark"
                style="width: 100%"
                @selection-change="handleSelectionChange"
                class="my-table">
        <el-table-column
          type="selection"
          width="63">
        </el-table-column>
        <el-table-column
          label="头像"
          width="120" prop="img">
          <template slot-scope="scope">
            <img :src="scope.row.avatar || defaultAvatar" alt="" class="photo">
          </template>
        </el-table-column>
        <el-table-column prop="nickName" label="姓名" width="200"></el-table-column>
        <el-table-column prop="profile.position" label="职位" width="200" show-overflow-tooltip></el-table-column>
        <el-table-column prop="profile.departmentName" label="部门" show-overflow-tooltip></el-table-column>
        <el-table-column prop="mobile" label="手机号" width="160" show-overflow-tooltip></el-table-column>
        <el-table-column prop="profile.enabledFeature.ai" width="120" label="AI雷达和名片">
          <template slot-scope="scope">
            <el-switch @change="toggleFeature(scope.row, 'ai', $event)"
                       :value="scope.row.profile.enabledFeatures && scope.row.profile.enabledFeatures.indexOf('ai') >= 0"
                       active-color="#5FB878"></el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="profile.enabledFeature.boss" width="120" label="BOSS雷达">
          <template slot-scope="scope">
            <el-switch @change="toggleFeature(scope.row, 'boss', $event)"
                       :value="scope.row.profile.enabledFeatures && scope.row.profile.enabledFeatures.indexOf('boss') >= 0"
                       active-color="#5FB878"></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="120" show-overflow-tooltip>
          <template slot-scope="scope">
            <el-button @click="handleShowQrCode(scope.row)" type="text" size="small" style="color: #70BFE7;">二维码
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="10"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>
    </div>
    <el-dialog
      title="添加用户"
      :visible.sync="centerDialogVisible"
      width="50%"
      center class="model1">
      <el-form :model="formData" :rules="rules" ref="ruleForm" label-width="180px" class="demo-ruleForm">
        <el-form-item label="姓名" prop="nickName">
          <el-input v-model="formData.nickName" placeholder="请输入姓名" style="width: 240px;"></el-input>
        </el-form-item>
        <el-form-item label="职业" prop="position">
          <el-input v-model="formData.position" placeholder="请输入职业" style="width: 240px;"></el-input>
        </el-form-item>
        <el-form-item label="名片展示手机号" prop="mobile" placeholder="请输入名片展示手机号">
          <el-input v-model="formData.mobile" style="width: 240px;"></el-input>
          <span style="position: absolute; line-height: 22px;font-size:12px;color:rgba(102,102,102,1);padding: 0 20px;">此号将显示在AI名片的联系方式上，可在AI雷达“我的”—“个人信息”中修改</span>
        </el-form-item>
        <el-form-item label="绑定微信手机号" prop="weChatMobile">
          <el-input v-model="formData.weChatMobile" placeholder="请输入绑定微信手机号" style="width: 240px;"></el-input>
          <span style="position: absolute;line-height: 22px;font-size:12px;color:rgba(102,102,102,1);padding: 0 20px;">此号将绑定企业微信，用于微信内登录和接收AI雷达消息，一旦绑定不可修改</span>
        </el-form-item>
        <el-form-item label="选择所属部门" prop="department">
          <el-input :value="user.profile.departmentName" style="width: 240px;" disabled></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="createUser">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="信息"
      :visible.sync="model2"
      width="30%"
      center>
      <span>确定删除吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="小程序码"
      :visible.sync="qrCodeVisible"
      width="460px"
      center>
      <img :src="qrCode" v-loading="qrCodeLoading" style="width: 400px; height: 400px">
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="qrCodeVisible = false">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
  import defaultAvatar from '@/assets/img/default_user.png'
  import enterpriseUser from '@/api/enterprise-user'
  import user from '@/api/user'
  import {mapGetters} from 'vuex'

  export default {
    name: 'radar',
    computed: {
      ...mapGetters([
        'user'
      ])
    },
    data() {
      return {
        defaultAvatar: defaultAvatar,
        qrCodeVisible: false,
        qrCodeLoading: false,
        qrCode: '',
        centerDialogVisible: false,
        model2: false,
        num: '5',
        loading: false,
        currentPage: 0,
        total: 0,
        list: [],
        listParams: {
          keyword: '',
          page: 0,
          size: 10
        },
        multipleSelection: [],
        formData: {
          nickName: '',
          position: '',
          mobile: '',
          weChatMobile: '',
          departmentIds: [1]
        },
        rules: {
          nickName: [
            {required: true, message: '请输入姓名', trigger: 'blur'}
          ],
          position: [
            {required: true, message: '请输入职业', trigger: 'blur'}
          ],
          mobile: [
            {required: true, message: '请输入名片展示手机号', trigger: 'blur'}
          ],
          weChatMobile: [
            {required: true, message: '请输入绑定微信手机号', trigger: 'blur'}
          ],
          departmentIds: [
            {required: true, message: '请选择部门', trigger: 'blur'}
          ]
        }
      };
    },
    created() {
      this.getList()
    },
    methods: {
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      handleSizeChange(val) {
        this.listParams.size = val
        this.getList()
      },
      handleCurrentChange(val) {
        this.listParams.page = val - 1
        this.getList()
      },
      handleShowQrCode(row) {
        this.qrCode = ''
        this.qrCodeLoading = true
        this.qrCodeVisible = true
        user.getWeAppQrCode({ userId: row.id }).then(res => {
          this.qrCode =  res.data.url
          this.qrCodeLoading = false
        }, () => {
          this.qrCodeLoading = false
        })
      },
      getList(params) {
        const input = Object.assign({}, this.listParams, params)

        this.loading = true
        enterpriseUser.query(input).then(res => {
          this.listParams.page = input.page
          this.listParams.size = input.size

          this.list = res.data.content
          this.total = res.data.totalElements
          this.loading = false
        });
      },
      createUser() {
        enterpriseUser.create(this.formData).then(res => {
          this.getList()
          this.centerDialogVisible = false
          this.$notify({
            title: '成功',
            message: '添加成功',
            type: 'success',
            duration: 2000
          })
        }, err => {
          this.$notify({
            title: '失败',
            message: (err.response && err.response.data.message) || '添加失败',
            type: 'error',
            duration: 2000
          })
        })
      },
      deleteUser() {
        const ids = this.multipleSelection.map(item => item.id)

        enterpriseUser.batchDelete({ids: ids}).then(() => {
          this.getList()
          this.$notify({
            title: '成功',
            message: '删除成功',
            type: 'success',
            duration: 2000
          })
        }, err => {
          this.$notify({
            title: '失败',
            message: (err.response && err.response.data.message) || '删除失败',
            type: 'error',
            duration: 2000
          })
        })
      },
      toggleFeature(row, name, enable) {
        (enable ? enterpriseUser.enableFeature : enterpriseUser.disableFeature)({
          userId: row.id,
          name: name
        }).then(res => {
          this.getList()
          this.$notify({
            title: '成功',
            message: '切换成功',
            type: 'success',
            duration: 2000
          })
        }, err => {
          this.$notify({
            title: '失败',
            message: (err.response && err.response.data.message) || '切换失败',
            type: 'error',
            duration: 2000
          })
        })
      }
    }
  }
</script>

<style scoped>
  .structure {
    margin-top: 20px;
    min-height: 700px;
    background: rgba(255, 255, 255, 1);
    border-radius: 4px;
    box-shadow: 0rem 0rem 2px 2px rgba(35, 51, 95, 0.1);
  }

  .structure:before {
    display: table;
    content: "";
  }

  .titles {
    height: 67px;
    line-height: 67px;
    font-size: 14px;
    font-weight: 400;
    color: rgba(68, 68, 68, 1);
    padding: 0 64px;
    box-sizing: content-box;
    border-bottom: 1px solid rgba(233, 233, 233, 1);
  }

  .title {
    line-height: 38px;
    padding: 15px 65px;
    box-sizing: content-box;
  }

  .my-label {
    margin-right: 60px;
  }

  .my-input {
    outline: none;
    width: 171px;
    height: 38px;
    border: 1px solid rgba(230, 230, 230, 1);
    border-radius: 2px;
    padding: 0 20px;
    box-sizing: border-box;
    margin-left: 15px;
  }

  .search {
    width: 62px;
    height: 38px;
    background: rgba(37, 189, 197, 1);
    border-radius: 2px;
    text-align: center;
    cursor: pointer;
    display: inline-block;
    margin-left: 40px;
  }

  .search img {
    width: 22px;
    height: 22px;
  }

  .main {
    padding: 0 65px;
  }

  .add-btn, .del-btn {
    font-size: 14px;
    font-weight: 300;
    color: rgba(255, 255, 255, 1);
    width: 62px;
    height: 38px;
    line-height: 38px;
    border-radius: 2px;
  }

  .add-btn {
    background: rgba(30, 159, 255, 1);
    margin-right: 20px;
  }

  .del-btn {
    background: rgba(255, 87, 34, 1);
  }

  .my-table {
    margin-top: 16px;
  }

  .my-table .photo {
    width: 52px;
    height: 52px;
    border-radius: 50%;
  }

  .block {
    padding: 39px 0 53px;
    text-align: center;
  }

  .block .el-pagination {
    display: inline-block;
  }
</style>
<style>
  .el-dialog__header {
    background: rgba(57, 67, 89, 1);

  }

  .el-dialog__title {
    color: white;
  }

  .structure .model1 .el-dialog {
    min-width: 780px;
  }

  .el-table .has-gutter th, .el-table .has-gutter tr {
    background: rgba(243, 243, 243, 1);
  }

  .el-table .cell {
    text-align: center;
  }

  .el-table td, .el-table th {
    padding: 0;
    height: 63px;
  }
</style>
