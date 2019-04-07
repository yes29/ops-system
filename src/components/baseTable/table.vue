<template>
  <div class="base-table">
    <slot></slot>
    <el-row class="btn">
      <el-col :span="18">
        <el-button type="danger" v-if="permit.delete || root" icon="el-icon-minus" plain @click="handleDelete(selection)">删除</el-button>&nbsp;
        <el-button type="primary" v-if="permit.create || root" icon="el-icon-plus" @click="handleAdd">新增</el-button>
      </el-col>
      <el-col :span="6">
        <el-input
            placeholder="请输入搜索关键字"
            clearable
            v-model="keyword"
            @clear="handleSearch"
            @keyup.enter.native="handleSearch">
          <el-button slot="append" icon="el-icon-search" @click="handleSearch"></el-button>
        </el-input>
      </el-col>
    </el-row>
    <el-table
       class="list-table"
        height="calc(100vh - 345px)"
        ref="table"
        v-loading="loading"
        :data="tableData"
        @row-click="handleRow"
        @selection-change="handleSelection">
      <div slot="empty">
        <svg-empty v-if="!loading"></svg-empty>
      </div>
      <el-table-column type="selection" width="40" align="right"></el-table-column>
      <el-table-column type="index" width="40" class-name="c-table-index"></el-table-column>
      <el-table-column
          :cell-class-name="item.className"
          :prop="item.key"
          :align="item.align"
          :width="item.width"
          v-for="(item, index) in columns"
          :key="index">
        <template slot="header" slot-scope="scope">
          <el-dropdown v-if="item.filters" @command="item.filterMethod">
            <span class="el-dropdown-link">
              {{item.title}}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item
                  v-for="(row, index) in item.filters"
                  :command="row.type"
                  :key="index">{{row.text}}
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <p v-else class="nowrap lh23">{{item.title}}</p>
        </template>  
        <template slot-scope="scope">
          <!-- 处理一些经过算法处理的字段 -->
          <div v-if="!item.render" class="nowrap">
            {{scope.row[item.key]}}
            <span v-if="item.unit&&scope.row[item.key] > 0">{{item.unit}}</span>
          </div>
          <div v-else class="nowrap">
            {{item.render(scope.row)}}
          </div>
        </template>  
      </el-table-column>
      <el-table-column
          v-if="permit.delete || permit.update || render || root"
          :min-width="optMinWidth"
          :width="optWidth"
          fixed="right"
          label="操作">
        <template slot-scope="scope">
          <render-column
              v-if="render"
              @click.native="stopProp"
              :render="render.render"
              :row="scope.row"
              :reqDelete="reqDelete"
              :handleEdit="handleEdit">
          </render-column>
          <div v-else @click="stopProp">
            <el-button type="text" v-if="permit.update || root" size="small" icon="el-icon-edit" @click="handleEdit(scope.row)">编辑</el-button>
            <popover-delete v-if="permit.delete || root" :row="scope.row" @onDelete="reqDelete"></popover-delete>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
        class="pagination"
        @size-change="handleSize"
        @current-change="handleCurrent"
        :current-page="params.page"
        :page-sizes="[12, 20, 30, 40]"
        :page-size="params.size"
        layout="total, prev, pager, next, sizes"
        :total="total">
    </el-pagination>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch} from 'vue-property-decorator';
import { AppModule } from '@/store/modules/app';
import { DetailModule } from '@/store/modules/detail';
import { PermitModule } from '@/store/modules/routerPermit';
import { get, post } from '@/api/common';
import { setObjLocal } from '@/utils/index';
import PopoverDelete from './components/popover-delete.vue';
import SvgEmpty from './components/svg-empty.vue';
import RenderColumn from './render-column';
import Detail from '@/components/detail/detail.vue';
@Component({components: {PopoverDelete, RenderColumn, SvgEmpty}})
export default class Table extends Vue {
  @Prop({default: ''}) proxy!: string;
  @Prop({default: ''}) service!: string;
  @Prop({default: null}) filter!: any;
  @Prop({default: 116}) optMinWidth!: number;
  @Prop({default: null}) optWidth!: number;
  @Prop({default: []}) columns!: string[];
  @Prop({default: false}) render!: any;
  @Prop({default: false}) root!: boolean; // 权限绿色通道
  loading = false;
  // 表格参数
  params: any = {
    page: 1,
    size: 12,
  };
  keyword: string = '';
  selection: string[] = []; // 多选选中的值
  total: number = 0; // 表格总数
  tableData: string[] = []; // 表格数据

  // 物理资源--服务器--类型搜索
  get filtersRemote() {
    return AppModule.filtersRemote;
  }

  // 获取权限
  get permit() {
    return PermitModule.permit;
  }

  // dom完成后，获取请求
  mounted() {
    this.getKeyword();
  }

  // 服务器头部过滤, 当表格为空时，会出bug
  @Watch('filtersRemote')
  changeFilters(obj: any) {
    if (!this.params.filter) {
      this.params.filter = {};
    }
    if (this.params.filter[obj.key] === obj.val) {
      return;
    }
    this.params.filter[obj.key] = obj.val;
    this.params.page = 1;
    this.getDataList();
  }

  // 主要用于物理资源-->服务器-->宿主机跳转虚拟机
  @Watch('$route.query.keyword')
  getKeyword() {
     // 搜索其它页面跑过来的关键字
    this.keyword = this.$route.query.keyword as any;
    if (this.keyword) {
      this.params.search = JSON.stringify({keyword: this.keyword});
    }
    this.getDataList();
  }

  // 阻止冒泡
  stopProp(e: any) {
    e.stopPropagation();
  }

  // 获取表格数据
  async getDataList() {
    if (this.filter) {
      this.params.filter = this.filter;
    }
    this.loading = true;
    // 处理传入的url，便于代理
    const url: string = this.proxy + '/list/' + this.service + '/';
    try {
      const result: any = await get(url, this.params);
      this.loading = false;
      this.total = result.count;
      let list = result.data;
      if (!list) {
        list = [];
      }
      this.tableData = list;
      // -----------详情打开详情------------
      const query: any = this.$route.query;
      if (query.openDetail && query.openDetail !== 'false' && list.length > 0) {
        DetailModule.handleView(list[0]);
      }
      query.openDetail = false;
    } catch (err) {
      this.loading = false;
      console.error(err);
    }
  }

  //  点击查看详情
  handleRow(row: any) {
    DetailModule.handleView(row);
  }

  // 批量删除
  handleDelete(arr: any) {
    if (arr.length < 1) {
      this.$message({
        type: 'warning',
        message: '请选择要删除的数据！',
      });
      return;
    }
    this.$confirm('此操作将永久删除数据, 是否继续?', '提示', {
      type: 'warning',
    }).then(() => {
      this.reqDelete(arr);
    });
  }
  // cliFilter(value: any, key: any, column: any) {
  //   console.log(value);
  //   console.log(key);
  //   console.log(column);
  // }

  // 删除请求接口
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
      this.getDataList();
    } catch (err) {
      console.error(err);
    }
  }

  // 新增
  handleAdd() {
    const query: any = {
      type: 'create',
      api: this.proxy + '/create/' + this.service + '/',
    };
    this.goEditor(query);
  }

  // 编辑
  handleEdit(row: object) {
    const query: any = {
      type: 'update',
      api: this.proxy + '/update/' + this.service + '/',
      edit: true,
    };
    this.goEditor(query);
    setObjLocal(query.api, row);
  }

  // 进入编辑页面
  goEditor(query: any) {
    // 如果是动态导航，导航参数传给新增编辑
    if (this.filter) {
      query = Object.assign(query, this.filter);
    }
    this.$router.push({
      name: query.type + '_' + this.service,
      query,
    });
  }

  // 选中的内容
  handleSelection(arr: string[]) {
    this.selection = arr;
  }

  // 点击搜索
  handleSearch() {
    this.params.page = 1;
    this.tableData = [];
    this.params.search = JSON.stringify({keyword: this.keyword.trim()});
    this.getDataList();
  }

  // 点击每页显示多少条数据
  handleSize(size: number) {
    this.params.page = 1;
    this.params.size = size;
    this.getDataList();
  }

  // 点击分页
  handleCurrent(current: number) {
    this.params.page = current;
    this.getDataList();
  }
}
</script>

<style lang="scss">
.base-table{
  padding: 30px;
  background: #fff;
  border-radius: 2px;
  .lh23{
    line-height: 18px;
  }
  .el-loading-mask{
    margin-top: 60px;
  }
  .el-button--text{
    padding: 0px 16px 0 0;
    font-size: 13px !important;
  }
  .el-dropdown{
    padding: 0;
  }
  // 此样式 会影响详情
  .el-table{
    border-top: 1px solid #ebeef5;
    margin-top: 15px;
    th {
      padding: 10px 0;
      background-color: #f8f8f9;
      line-height: 0;
    }
    .el-button [class*=el-icon-]+span {
      margin-left: 3px;
    }
    .cell{
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      cursor: pointer;
    }
  }
  .list-table{
    th {
      padding: 0;
     .cell{
        line-height: 0;
      }
    }
  }
  .btn .el-button {
    padding: 10px 18px;
  }
  .el-button--medium {
    padding: 9px 18px;
  }
  .pagination{
    margin-top: 20px;
    text-align: right;
    margin-right: -22px;
  }
}
</style>
