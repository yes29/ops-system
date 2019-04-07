<template>
<el-card class="box-card mt20 table-card">
  <div slot="header" class="clearfix">
    <span>{{title}}</span>
    <span class="s-title">数量&nbsp;{{tableData.length}}</span>
    <el-button class="next" type="text" @click="handleEditor({})">
      <span style="font-size: 14px;">新增{{title}}</span>
    </el-button>
  </div>
  <el-table
      max-height="285"
      @row-click="rowClick"
      v-loading="loading"
      :data="tableData">
    <el-table-column type="index" width="50" class-name="c-table-index" align="center"></el-table-column>
    <el-table-column
        :class-name="item.className"
        :align="item.align"
        :width="item.width"
        :prop="item.key"
        :label="item.title"
        v-for="(item, index) in columns"
        :key="index">
    </el-table-column>
    <el-table-column
        min-width="116"
        fixed="right"
        label="操作">
      <template slot-scope="scope">
        <div @click="stopProp">
          <el-button type="text" size="small" icon="el-icon-edit" @click="handleEditor(scope.row)">编辑</el-button>
          <popover-delete :row="scope.row" @onDelete="reqDelete"></popover-delete>
        </div>
      </template>
    </el-table-column>
  </el-table>
</el-card>
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch} from 'vue-property-decorator';
import { ModalEditorModule } from '@/store/modules/modalEditor';
import { get, post } from '@/api/common';
import PopoverDelete from '@/components/baseTable/components/popover-delete.vue';
@Component({components: {PopoverDelete}})
export default class SampleCard extends Vue {
  @Prop() idKey!: string;
  @Prop({default: '实例'}) title!: string;
  @Prop({default: true}) path!: boolean;
  @Prop({default: ''}) proxy!: string;
  @Prop({default: ''}) service!: string;
  @Prop({ default: {} }) row!: any;
  @Prop({default: []}) columns!: string[];
  tableData = [];
  loading = false;
  // 表格参数
  params: any = {
    page: 1,
    size: 1000,
  };

  // 第一次请求时用
  mounted() {
    this.geDataList();
  }

  // 当切换详情时，重新请求
  @Watch('row')
  handleRow() {
    this.geDataList();
  }

  // 阻止冒泡
  stopProp(e: any) {
    e.stopPropagation();
  }

  // 编辑实例
  handleEditor(row: any) {
    row[this.idKey] = this.row.id;
    ModalEditorModule.modalView(row);
  }

  // 点击行
  rowClick(row: any) {
    const path: any = '/resource/server';
    if (!this.path) { return; }
    // 一个是物理资源跳转、一个是服务器跳转到服务
    const router: any = {
      path,
      query: {
        keyword: row.hostname,
        openDetail: true,
      },
    };
    this.$router.push(router);
  }

  // 获取table数据
  async geDataList() {
    this.loading = true;
    const filter: any = {};
    filter[this.idKey] = this.row.id;
    this.params.filter = JSON.stringify(filter);
    // 处理传入的url，便于代理
    const url: string = this.proxy + '/list/' + this.service + '/';
    try {
      const result: any = await get(url, this.params);
      let list: any = result.data;
      this.loading = false;
      if (!list) {
        list = [];
      }
      this.tableData = list;
    } catch (err) {
      this.loading = false;
      console.error(err);
    }
  }

  // 删除列表数据
  async reqDelete(arr: any) {
    const url: string = this.proxy + '/delete/' + this.service + '/';
    const ids: any = [];
    for (const k of arr) {
      ids.push(k.id);
    }
    try {
      await post(url, {ids});
      this.$message({
        type: 'success',
        message: '删除数据成功！',
      });
      this.geDataList();
    } catch (err) {
      console.error(err);
    }
  }
}
</script>
