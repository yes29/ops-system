<template>
  <section class="app-main">
    <keep-alive v-if="cache">
      <router-view></router-view>
    </keep-alive>
    <router-view v-else></router-view>
  </section>
</template>

<script lang="ts">
import { Component, Vue,  Watch} from 'vue-property-decorator';
@Component
export default class AppMain extends Vue {
  cache = false;
  mounted() {
    this.changeRoute(this.$route.meta);
  }

  // 监听路由，是否缓存页面
  @Watch('$route.meta')
  changeRoute(meta: any) {
    if (meta.cache) {
      this.cache = true;
    } else {
      this.cache = false;
    }
  }
}
</script>

<style lang="scss" scoped>
.app-main {
  padding: 20px;
  background: #eeeeee;
  min-height: calc(100vh - 90px) !important;
  position: relative;
  overflow: hidden;
}
</style>
