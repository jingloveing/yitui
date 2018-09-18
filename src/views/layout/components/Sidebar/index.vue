<template>
  <el-scrollbar wrap-class="scrollbar-wrapper">
    <div style="background: white;text-align: center;line-height:59px;box-shadow:0px 0px 2px 2px rgba(35,51,95,0.34);">
      <img :src="enterprise.logo" alt="" style="width: 40px;height: 40px;vertical-align: middle;">
      <span v-text="enterprise.name" style="color: #333;font-size: 14px;height: 40px;line-height:40px;display: inline-block;vertical-align: middle;"></span>
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
      'sidebar',
      'enterprise',
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
