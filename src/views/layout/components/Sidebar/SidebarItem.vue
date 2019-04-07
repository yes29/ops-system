<template>
  <div class="sider-menu" v-if="item">
    <el-menu-item :index="item.path" v-if="!item.children && item.main && item.read">
      <i :class="'icon iconfont icon-menu-sub ' + item.icon"></i>
      <span slot="title">{{item.title}}</span>
    </el-menu-item>
    <el-submenu :index="item.icon" v-if="item.main && item.children">
      <template slot="title">
        <i :class="'icon iconfont icon-menu-sub ' + item.icon"></i>
        <span slot="title">{{item.title}}</span>
      </template>
      <el-menu-item
          v-if="row.read"
          :index="row.path"
          v-for="(row, index) in item.children"
          :key="index">
        <i :class="'icon iconfont icon-menu-child ' + row.icon"></i>
        {{row.title}}
      </el-menu-item>
    </el-submenu>
  </div>
</template>
<script lang="ts">
import path from 'path';
import { Route } from 'vue-router';
import { Component, Vue, Prop } from 'vue-property-decorator';
@Component
export default class SidebarItem extends Vue {
  @Prop({ required: true }) item!: Route;
  @Prop({ default: false }) isNest!: boolean;
  @Prop({ default: '' }) basePath!: string;
}
</script>
<style lang="scss" scoped>
.icon-menu-sub {
  margin-right: 5px;
  width: 24px;
  text-align: center;
  font-size: 18px;
  vertical-align: middle;
  float: left;
  color: #fff;
}
.icon-menu-child {
  margin-right: 3px;
  width: 20px;
  text-align: center;
  font-size: 17px;
  vertical-align: middle;
}
</style>
<style lang="scss">
.sider-menu{
  .el-icon-arrow-down{
    color: #fff;
  }
  .icon-attribute, .icon-deploy, .icon-account-setting{
    font-size: 17px;
  }    
}
</style>
