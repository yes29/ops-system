<template>
<div class="rmon-search">
  <div class="search">
    <el-form :inline="true" :model="params">
      <el-form-item label="选择域名">
        <el-select 
            v-model="params.domain"
            clearable
            filterable
            multiple
            placeholder="请选择域名">
          <el-option
              v-for="item in domainList"
              :key="item.id"
              :label="item.name"
              :value="item.name">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item class="ml20" label="搜索URL关键字">
        <el-input v-model="params.keyWorld" placeholder="请输入要搜索的URL关键字"></el-input>
      </el-form-item>
      <el-form-item class="ml30">
        <el-button type="primary" @click="getSearchList">搜索</el-button>
      </el-form-item>
    </el-form>
  </div>
  <div class="result" v-loading="loading">
    <el-row :gutter="30">
      <el-col :span="12">
        <div class="item-header">
          <div class="title">搜索结果列表</div>
        </div>
        <line-table class="table"
            :cliRow="getGrapData"
            :expandList="[]"
            :tableData="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
            :optList="optList">
          <el-pagination
            @current-change="currentChange"
            v-if="tableData.length>10"
            slot="pagination"
            layout="prev, pager, next"
            :total="tableData.length">
          </el-pagination>
        </line-table>
        <div class="search-msg">只取120分钟内数据排序</div>
      </el-col>
      <el-col :span="12">
        <search-chart :row="row"></search-chart>
      </el-col>
    </el-row>
  </div>
</div>
</template>
<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import LineTable from '@/components/echarts/line-table.vue';
import SearchChart from './components/search-chart.vue';
import { getListDomain, getSearchFuzzy} from '@/api/monitor';
@Component({components: {LineTable, SearchChart}})
export default class QpsDSearch extends Vue {
  loading = false;
  currentPage = 1;
  pagesize = 10;
  row = {};
  domainList = [] as any;
  optList = [
    {label: 'NO', prop: '', width: '60', align: 'center'},
    {label: '域名', prop: 'domain'},
    {label: 'URL', prop: 'url'},
  ];
  tableData = [];
  params = {
    domain: ['www.tuandai.com'],
    keyWorld: '',
  };

  mounted() {
     this.getDataList();
     this.getSearchList();
  }

  getDataList() {
    getListDomain({page: 1, size: 1000}).then((rest: any) => {
      this.domainList = rest;
    });
  }

  getSearchList() {
    const endTime = Math.floor(new Date().valueOf() / 1000) as any;
    const params = {
      start_time: endTime - 120 * 60,
      end_time: endTime,
      domains: this.params.domain,
      url: this.params.keyWorld,
    };
    this.tableData = [];
    this.row = {};
    this.loading = true;
    getSearchFuzzy(params).then((list: any) => {
      this.loading = false;
      if (list && list.length > 0) {
        this.getGrapData(list[0]);
      }
      this.tableData = list;
    });
  }

  currentChange(index: any) {
    this.currentPage = index;
  }

  getGrapData(row: any) {
    this.row = row;
  }

}
</script>
<style lang="scss">
.rmon-search {
  .el-button{
    padding: 12px 28px;
  }
  .ml30{
    margin-left: 30px;
  }
  .item-header{
    border-radius: 0;
    height: 42px;
  }
  .search-msg{
    font-size: 12px;
    color: #999;
    margin: -20px 0 0 20px;
    width: 150px;
    margin-top: -45px;
    position: relative;
  }
  .el-loading-mask{
    background: #fff;
  }
  .el-pagination{
    text-align: right;
    margin-top: 10px;
    margin-right: -10px;
  }
  .search{
    padding: 40px 30px 20px 30px;
    background: #fff;
  }
  .result{
    background: #fff;
    margin-top: 20px;
  }
  .table{
    padding: 10px 20px 20px 20px;
    height: 550px;
    td .cell{
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      cursor: pointer;
    }
  }
  .el-form-item--medium.el-form-item{
    margin-bottom: 0;
  }
  .el-input__inner{
    width: 320px;
  }
  .mt20{margin-top: 20px;}
}
</style>
