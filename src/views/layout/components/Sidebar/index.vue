<template>
  <el-scrollbar wrap-class="scrollbar-wrapper">
    <!-- background-color="#304156"
    text-color="#bfcbd9"
    active-text-color="#409EFF" -->
    <el-menu
        unique-opened
        :show-timeout="200"
        :default-active="$route.path"
        @select="handleSelect"
        :collapse="isCollapse"
        mode="vertical"
        background-color="#304156"
        text-color="#bfcbd9"
        active-text-color="#409eff"> 
      <el-menu-item class="nav-title" index="">
        <span v-if="sidebar.opened" class="c-ffd fs18">OPS-SYSTEM</span>
        <i v-else class="c-ffd ml_10 fs18">OPS</i>
      </el-menu-item>
      <sidebar-item v-for="route in menuList" :key="route.path" :item="route" :base-path="route.path"/>
    </el-menu>
  </el-scrollbar>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { AppModule } from '@/store/modules/app';
import SidebarItem from './SidebarItem.vue';
import { getObjLocal, getMenu } from '@/utils/index';
import { constants } from 'fs';
@Component({components: {SidebarItem}})
export default class SideBar extends Vue {
  menuList = [];
  get sidebar() {
    return AppModule.sidebar;
  }

  get routes() {
    return (this.$router as any).options.routes;
  }

  get isCollapse() {
    return !this.sidebar.opened;
  }

  mounted() {
    this.menuList = getMenu();
  }

  handleSelect(path: string) {
    this.$router.push(path);
  }
}
</script>
