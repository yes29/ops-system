<template>
<div class="card-detail">
  <el-dialog
      custom-class="detail"
      :width="width"
      :modal="false"
      :visible.sync="show"
      :before-close="handleClose">
    <div slot="title" class="title">{{title}}</div>
    <el-scrollbar class="scrollbar">
      <slot></slot>
    </el-scrollbar>
  </el-dialog>
</div>
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch} from 'vue-property-decorator';
import { DetailModule } from '@/store/modules/detail';
@Component
export default class Detail extends Vue {
  @Prop({default: ''}) title!: string;
  @Prop({default: '820px'}) width!: string;

  // 获取是否显示
  get show() {
    return DetailModule.show;
  }

  // 获取行数据
  get row() {
    return DetailModule.row;
  }
  // 关闭
  handleClose() {
    DetailModule.handleClose();
  }
}
</script>
<style lang="scss">
.card-detail{
  .el-dialog__wrapper{
    left: inherit;
  }
}
.detail{
  background: rgb(248,249,250);
  height: 100%;
  float: right;
  margin-top: 0 !important;
  border-radius: 0;
  border-left: 1px solid #e8eaec;
  .scrollbar{
    height: calc(100vh - 60px);
    .el-scrollbar__wrap{
      padding: 20px;
      overflow-x: hidden;
      .el-scrollbar__thumb{
        background-color: rgba(144,147,153,.8);
      }
    }
  }
  .title{
    border-bottom: 1px solid #e8eaec;
    padding-bottom: 12px;
    text-align: center;
    line-height: 24px;
    font-size: 18px;
    color: #303133;
    font-weight: 700;
  }
  .base {
    padding-right: 10px;
    margin-top: 0;
    float: left;
    padding-left: 10px;
  }
  .c-888 {
    color: #888;
    float: left;
    text-align: right;
  }
  .el-dialog__header {
    padding: 20px 0 0 0;
    background: #fff;
  }
  .el-card__header{
    color: #17233d;
    font-weight: 700;
    font-size: 15px;
  }
  .s-title {
    font-weight: normal;
    color: #ed4014;
    font-size: 12px;
    padding-left: 10px;
  }
  .el-dialog__body{
    padding: 0;
  }
  .el-dialog__headerbtn{
    left:20px;
    right: initial;
    font-size: 20px;
  }
}
</style>
