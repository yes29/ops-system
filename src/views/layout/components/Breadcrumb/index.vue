<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item,index) in levelList" v-if="item.meta.title" :key="item.path">
        <!-- <span v-if="index== levelList.length - 1" class="no-redirect">{{ item.meta.title }}</span> -->
        <a @click.prevent="handleLink(item)">{{ item.meta.title }}</a>
      </el-breadcrumb-item>
      <el-breadcrumb-item v-if="navName" key="0000">{{navName}}</el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { getQuery } from '@/utils/index';
import { RouteRecord } from 'vue-router';
import pathToRegexp from 'path-to-regexp';
import { constants } from 'fs';

@Component
export default class Breadcrumb extends Vue {
  levelList: RouteRecord[] = [];
  navName: any = getQuery('nav_name');
  created() {
    this.getBreadcrumb();
  }

  @Watch('$route')
  onRouteChange() {
    this.navName = getQuery('nav_name');
    this.getBreadcrumb();
  }

  getBreadcrumb() {
    const matched = this.$route.matched.filter((item) => {
      if (item.name) {
        return true;
      }
    });
    this.levelList = matched;
  }

  pathCompile(path: string) {
    const { params } = this.$route;
    const toPath = pathToRegexp.compile(path);
    return toPath(params);
  }

  handleLink(item: any) {
    const { redirect, path } = item;
    if (redirect) {
      this.$router.push(redirect);
      return;
    }
    this.$router.push(this.pathCompile(path));
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .app-breadcrumb.el-breadcrumb {
    display: inline-block;
    font-size: 14px;
    line-height: 50px;
    margin-left: 10px;
    .no-redirect {
      color: #fff;
      cursor: text;
    }
    .hamburger-container svg {
      fill: #0a92ff;
    }
  }
</style>
