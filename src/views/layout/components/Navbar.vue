<template>
  <div>
    <el-menu class="navbar" mode="horizontal">
      <hamburger :toggle-click="toggleSideBar" :is-active="sidebar.opened" class="hamburger-container"/>
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <img :src="avatar+'?imageView2/1/w/80/h/80'" class="user-avatar" :onerror="defaultImg">
          <span class="name" v-text="name"></span>
          <i class="el-icon-caret-bottom"/>
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <router-link class="inlineBlock" to="/">
            <el-dropdown-item>
              Home
            </el-dropdown-item>
          </router-link>
          <el-dropdown-item divided>
            <span style="display:block;" @click="logout">LogOut</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-menu>
    <div class="breadcrumb" v-show="this.$route.meta.showBreadcrumb!==true">
      <breadcrumb class="breadcrumb-container"/>
    </div>
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
      defaultImg:'this.src="' + require('../../../assets/default_user.png') + '"'
    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar',
      'name'
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
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
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
.breadcrumb{
  width:100%;
  height:48px;
  line-height: 48px;
  background:rgba(255,255,255,1);
  font-size:14px;
  font-weight:400;
  color:rgba(136,136,136,1)
}
.breadcrumb-container{
  line-height: 48px;margin-left: 47px;
}

</style>

