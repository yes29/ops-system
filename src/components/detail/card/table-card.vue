<template>
<el-card class="box-card mt20 table-card">
  <div slot="header" class="clearfix">
    <span>{{title}}</span>
    <span class="s-title">数量&nbsp;{{columns.length}}</span>
    <slot name="button"></slot>
    <el-button class="next icon iconfont icon-dd-copy" v-if="keyword!==''" type="text" @click="handleList()"></el-button>
  </div>
  <el-table
      max-height="285"
      :data="columns"
      @row-click="handleRow">
    <el-table-column
        v-if="index"
        type="index"
        width="40"
        class-name="c-table-index"
        align="center">
    </el-table-column>
    <el-table-column
        :class-name="item.className"
        :align="item.align"
        :width="item.width"
        :label="item.title"
        v-for="(item, index) in optList"
        :key="index">
      <template slot-scope="scope">
        <!-- 处理一些经过算法处理的字段 -->
        <div v-if="!item.render">{{scope.row[item.key]}}</div>
        <div v-else>{{item.render(scope.row)}}</div>
      </template>  
    </el-table-column>
  </el-table>
</el-card>
</template>
<script lang="ts">
import { Component, Vue, Prop} from 'vue-property-decorator';
@Component
export default class TableCard extends Vue {
  @Prop({default: true}) index!: boolean;
  @Prop({default: ''}) title!: string;
  @Prop({default: ''}) keyword!: string[];
  @Prop({default: ''}) path!: string[];
  @Prop({default: []}) columns!: string[];
  @Prop({default: []}) optList!: string[];

  // 模块跳转
  handleList() {
    const path: any = {
      path: this.path,
      query: {
        keyword: this.keyword,
      },
    };
    this.$router.push(path);
  }

  // 行跳转
  handleRow(row: any) {
    let path: any = this.path;
    if (path === '/attribute/') {
      path = path + row.type;
    }
    // 一个是物理资源跳转、一个是服务器跳转到服务
    const router: any = {
      path,
      query: {
        keyword: row.name,
        openDetail: true,
      },
    };
    this.$router.push(router);
  }
}
</script>
<style lang="scss" >
 .table-card{
   .el-card__body{
    padding: 6px 20px 22px;
  }
  .next {
    float: right;
    font-size: 16px !important;
    padding: 3px 0 !important;
  }
 }
</style>
