<template>
<el-dialog
    width="560px"
    class="attr-transfer"
    :visible.sync="show"
    :before-close="handleClose">
  <el-tabs slot="title" v-model="tabActive" @tab-click="handleTab">
    <el-tab-pane :label="item.name" :name="item.name" v-for="(item, index) in columns" :key="index">
      <el-transfer
          filterable
          filter-placeholder="请输入关键字"
          v-model="item.keys"
          @on-change="onChange($event, columns)"
          :data="item.children">
      </el-transfer>
    </el-tab-pane>
  </el-tabs>
  <span slot="footer" class="dialog-footer">
    <el-button @click="handleClose">取 消</el-button>
    <el-button type="primary" @click="onSubmit(columns)">确 定</el-button>
  </span>
</el-dialog>
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch} from 'vue-property-decorator';
@Component
export default class Ttransfer extends Vue {
  @Prop({ default: [] }) columns!: string[];
  show: boolean = false;
  tabActive = '';

  // 选项卡设置
 @Watch('columns')
  setTabActive(columns: any) {
    if (columns.length > 0) {
      this.handleTab(columns[0]);
    }
  }

   // 选项卡设置
  handleTab(row: any) {
    this.tabActive = row.name;
  }

    // 确认
  onSubmit(columns: any) {
    const keys = [];
    for (const k of columns) {
      for (const n of k.keys) {
       keys.push(n);
      }
    }
    this.$emit('input', keys);
    this.$emit('getNames', columns);
    this.handleClose();
  }

  // 监听change变化，设置change
  onChange(keys: string[], columns: any) {
    const arr = [];
    for (const k of columns) {
      if (k.name === this.tabActive) {
        columns[k].keys = keys;
      }
      arr.push(columns[k]);
    }
  }

  // 关闭
  handleClose() {
    this.show = false;
  }
}
</script>
<style lang="scss">
.attr-transfer{
  .el-dialog__header{
    background: #fff;
    padding: 12px 20px 14px;
  }
  .el-transfer-panel__filter{
    margin: 10px;
  }
  .el-tabs__item{
    font-size: 15px;
    font-weight: 600;
  }
  .el-dialog__body{
    padding: 0;
  }
  .el-tabs__nav-wrap::after{
    height: 1px;
  }
}
</style>
