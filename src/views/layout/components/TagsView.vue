<template>
  <div class="tags-view-container">
    <scroll-pane ref="scrollPane" class="tags-view-wrapper">
      <router-link
        v-for="tag in visitedViews"
        ref="tag"
        :class="isActive(tag)?'active':''"
        :to="{ path: tag.path, query: tag.query, fullPath: tag.fullPath }"
        :key="tag.name"
        tag="span"
        class="tags-view-item"
        @click.middle.native="closeSelectedTag(tag)"
        @contextmenu.prevent.native="openMenu(tag,$event)">
        {{ tag.title }}
        <span class="el-icon-close" @click.prevent.stop="closeSelectedTag(tag)"/>
      </router-link>
    </scroll-pane>
    <ul v-show="visible" :style="{left:left+'px',top:top+'px'}" class="contextmenu">
      <li @click="refreshSelectedTag(selectedTag)">refresh</li>
      <li @click="closeSelectedTag(selectedTag)">close</li>
      <li @click="closeOthersTags">closeOthers</li>
      <li @click="closeAllTags">closeAll</li>
    </ul>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch} from 'vue-property-decorator';
import ScrollPane from '@/components/scrollPane/index.vue';
import { TagsViewModule } from '@/store/modules/tagsView';
import { setTimeout } from 'timers';
@Component({components: {ScrollPane}})
export default class TagsView extends Vue {
  visible = false;
  top = 0;
  left = 0;
  selectedTag = {};
  get visitedViews() {
    return TagsViewModule.visitedViews;
  }

  mounted() {
    this.addViewTags();
  }

  @Watch('$route.meta')
  routeChange(row: any) {
    this.addViewTags();
  }

  @Watch('visible')
  visibleChange(value: any) {
    if (value) {
        document.body.addEventListener('click', this.closeMenu);
    } else {
      document.body.removeEventListener('click', this.closeMenu);
    }
  }

  isActive(route: any) {
    return route.name === this.$route.name;
  }

  async addViewTags() {
    const { name } = this.$route;
    if (name) {
      TagsViewModule.addView(this.$route);
    }
    return false;
  }

  moveToCurrentTag() {
    const tags: any = this.$refs.tag;
    this.$nextTick(() => {
      for (const tag of tags) {
        if (tag.to.path === this.$route.path) {
          if (tag.to.fullPath !== this.$route.fullPath) {
            TagsViewModule.updateVisitedView(this.$route);
          }
          break;
        }
      }
    });
  }

  refreshSelectedTag(view: any) {
    location.reload();
  }

  async closeSelectedTag(view: any) {
    await TagsViewModule.delVisitedView(view);
    if (this.isActive(view)) {
      const latestView = this.visitedViews.slice(-1)[0];
      if (latestView) {
        this.$router.push(latestView);
      } else {
        this.$router.push('/');
      }
    }
  }

  async closeOthersTags() {
    this.$router.push(this.selectedTag);
    await TagsViewModule.delOthersVisitedViews(this.selectedTag);
    this.moveToCurrentTag();
  }

  closeAllTags() {
    TagsViewModule.delAllVisitedViews();
    setTimeout(() => {
      this.$router.push('/');
    }, 100);
  }

  openMenu(tag: any, e: any) {
    const menuMinWidth = 105;
    const offsetLeft = this.$el.getBoundingClientRect().left; // container margin left
    const el: any = this.$el;
    const offsetWidth: any = el.offsetWidth; // container width
    const maxLeft = offsetWidth - menuMinWidth; // left boundary
    const left = e.clientX - offsetLeft + 15; // 15: margin right

    if (left > maxLeft) {
      this.left = maxLeft;
    } else {
      this.left = left;
    }
    this.top = e.clientY;

    this.visible = true;
    this.selectedTag = tag;
  }

  closeMenu() {
    this.visible = false;
  }
}
</script>

<style lang="scss" scoped>
.tags-view-container {
  height: 34px;
  width: 100%;
  background: #fff;
  border-bottom: 1px solid #d8dce5;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .12), 0 0 3px 0 rgba(0, 0, 0, .04);
  .tags-view-wrapper {
    .tags-view-item {
      display: inline-block;
      position: relative;
      cursor: pointer;
      height: 26px;
      line-height: 26px;
      border: 1px solid #d8dce5;
      color: #495060;
      background: #fff;
      padding: 0 8px;
      font-size: 12px;
      margin-left: 5px;
      margin-top: 4px;
      &:first-of-type {
        margin-left: 15px;
      }
      &:last-of-type {
        margin-right: 15px;
      }
      &.active {
        background-color: #409EFF;
        color: #fff;
        border-color: #409EFF;
        &::before {
          content: '';
          background: #fff;
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          position: relative;
          margin-right: 2px;
        }
      }
    }
  }
  .contextmenu {
    margin: 0;
    background: #fff;
    z-index: 100;
    position: absolute;
    list-style-type: none;
    padding: 5px 0;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 400;
    color: #333;
    box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, .3);
    li {
      margin: 0;
      padding: 7px 16px;
      cursor: pointer;
      &:hover {
        background: #eee;
      }
    }
  }
}
</style>

<style rel="stylesheet/scss" lang="scss">
//reset element css of el-icon-close
.tags-view-wrapper {
  .tags-view-item {
    .el-icon-close {
      width: 16px;
      height: 16px;
      vertical-align: 2px;
      border-radius: 50%;
      text-align: center;
      transition: all .3s cubic-bezier(.645, .045, .355, 1);
      transform-origin: 100% 50%;
      &:before {
        transform: scale(.6);
        display: inline-block;
        vertical-align: -3px;
      }
      &:hover {
        background-color: #b4bccc;
        color: #fff;
      }
    }
  }
}
</style>
