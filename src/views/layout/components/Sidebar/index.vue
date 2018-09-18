<template>
  <el-scrollbar wrap-class="scrollbar-wrapper">
    <div style="background: rgb(52, 56, 67);text-align: center;line-height:59px;box-shadow:0px 0px 2px 2px rgba(35,51,95,0.34);">
      <img src="/src/assets/logo.png" alt="" style="width: 109px;height: 34px;vertical-align: middle;">
    </div>
    <el-menu
      :show-timeout="200"
      :default-active="$route.path"
      :collapse="isCollapse"
      mode="vertical"
      background-color="rgba(52,56,67,1)"
      text-color="#ccd3e7"
      active-text-color="#fff"
    >
      <sidebar-item v-for="route in routes" :key="route.name" :item="route" :base-path="route.path"/>
    </el-menu>
  </el-scrollbar>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'

export default {
  components: { SidebarItem },
  computed: {
    ...mapGetters([
      'sidebar'
    ]),
    routes() {
      return this.$router.options.routes
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  }
}
</script>
