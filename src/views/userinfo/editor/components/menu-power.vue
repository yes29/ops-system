<template>
<el-tree
  ref="tree"
  :data="data"
  class="menu-power"
  show-checkbox
  node-key="id"
  @check-change="setParamsMenu"
  :props="props">
</el-tree>
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch} from 'vue-property-decorator';
import { getMenuList } from '@/api/uums';
import { uniqueKey } from '@/utils/index';
import { setTimeout } from 'timers';
import { constants } from 'fs';
@Component
export default class MenuPower extends Vue {
  @Prop({ default: {} }) params!: any;
  @Prop({ default: {} }) item!: any;
  props = {
    children: 'children',
    label: 'title',
  };
  data = [{title: '全部菜单', children: []}];
  num = 0;

  @Watch('params')
  async getMenu(params: any) {
    if (this.num > 0) {
      return;
    }
    this.num++;
    try {
      const list: any = await getMenuList();
      this.data[0].children = list;
      setTimeout(() => {
        this.setKeys(list, params);
      }, 10);
    } catch (err) {
      console.error(err);
    }
  }

  setKeys(list: any, params: any) {
    let menu: any = params.menu;
    if (menu) {
      menu = JSON.parse(menu);
      const arr: string[] = [];
      for (const item of menu) {
        for (const row of list) {
          for (const col of row.children) {
            if (col.id === item.id) {
              arr.push(item.id);
            }
          }
        }
      }
      const tree: any = this.$refs.tree;
      tree.setCheckedKeys(arr);
    }
  }

  setParamsMenu() {
    // 先提取全部menu值
    const arr: any = [];
    const list: any = this.data[0].children;
    for (const item of list) {
      const obj = {id: item.id};
      arr.push(obj);
      for (const col of item.children) {
        const child = {
          id: col.id,
          parent_id: item.id,
        };
        arr.push(child);
      }
    }
    // 拼接提交的keys数据
    const tree: any = this.$refs.tree;
    const keys = tree.getCheckedKeys();
    const ids: any = [];
    for (const M of keys) {
      for (const N of arr) {
        if (M === N.id) {
          if (N.parent_id) {
            ids.push({id: N.parent_id});
          }
          ids.push(N);
        }
      }
    }
    this.params.menu = uniqueKey(ids, 'id');
  }

}
</script>
<style lang="scss" scoped>
.menu-power {
  border: 1px solid #dcdfe6;
  padding: 10px;
  height: 300px;
  overflow: auto;
  border-radius: 4px;
 }
</style>