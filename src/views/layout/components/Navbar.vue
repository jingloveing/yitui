<template>
  <div class="navbars-box">
    <el-menu class="navbars" mode="horizontal">
      <hamburger :toggle-click="toggleSideBar" :is-active="sidebar.opened" class="hamburger-container"/>
      <breadcrumb class="breadcrumb-container"/>
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <img :src="user.avatar" class="user-avatar" :onerror="defaultImg">
          <span class="name" v-text="user.nickName"></span>
          <i class="el-icon-caret-bottom"/>
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <router-link class="inlineBlock" to="/setting/myInfo">
            <el-dropdown-item>
              基本资料
            </el-dropdown-item>
          </router-link>
          <router-link class="inlineBlock" to="/setting/changePassword">
            <el-dropdown-item>
              修改密码
            </el-dropdown-item>
          </router-link>
          <el-dropdown-item divided>
            <span style="display:block;text-align: center;" @click="logout">退出</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-menu>
    <!--<div class="my-breadcrumb" v-show="this.$route.meta.showBreadcrumb!==true">-->

    <!--</div>-->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Hamburger from '@/components/Hamburger'
import Breadcrumb from '@/components/Breadcrumb'

export default {
  components: {
    Hamburger,
    Breadcrumb
  },
  data(){
    return{
      defaultImg:'this.src="' + require('../../../assets/img/default_user.png') + '"'
    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'user'
    ])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('ToggleSideBar')
    },
    logout() {
      this.$store.dispatch('LogOut').then(() => {
        location.reload() // 为了重新实例化vue-router对象 避免bug
      })
    },
  },
  created(){

  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbars {
  height: 60px;
  line-height: 60px;
  border-radius: 0px !important;

  .hamburger-container {
    line-height: 68px;
    height: 60px;
    float: left;
    padding: 0 40px;
  }
  .screenfull {
    position: absolute;
    right: 90px;
    top: 16px;
    color: red;
  }
  .avatar-container {
    height: 60px;
    display: inline-block;
    position: absolute;
    right: 35px;
    vertical-align: middle;
    .avatar-wrapper {
      cursor: pointer;
      position: relative;
      .user-avatar {
        width: 56px;
        height: 56px;
        border-radius: 50%;
        vertical-align: middle;
        margin-bottom: 2px;
      }
      .name{
        line-height: 60px;display: inline-block;
        font-size: 16px;
        color: rgba(34,34,34,1);
        margin-left: 11px;
      }
      .el-icon-caret-bottom {
        position: absolute;
        right: -20px;
        top: 25px;
        font-size: 12px;
      }
    }
  }

}
/*.my-breadcrumb{*/
  /*width:100%;*/
  /*height:48px;*/
  /*line-height: 48px;*/
  /*background:rgba(255,255,255,1);*/
  /*font-size:14px;*/
  /*font-weight:400;*/
  /*color:rgba(136,136,136,1)*/
/*}*/
.breadcrumb-container{
  line-height: 48px;
}
</style>

