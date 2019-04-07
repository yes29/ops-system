<template>
<div class="host-detail" :class="loading? 'host-detail-loading': ''" v-loading="loading">
  <el-row class="list" v-for="(item, index) in dataList" :key="index">
    <div class="item-header">
      <div class="title">{{item.domain}}</div>
    </div>
    <d-chart :domain="item.domain"></d-chart>
    <el-row :gutter="30">
      <el-col :span="12">
        <ngnix-card
            type="base"
            api="domain/url/graph/"
            title="URL的QPS Top10"
            :domain="item.domain"
            :tableData="item.qps_top"
            :optList="urlQpsOps">
        </ngnix-card>
      </el-col>
      <el-col :span="12">
        <ngnix-card
            type="msURL"
            api="domain/url/graph/"
            title="URL延迟 Top10"
            :domain="item.domain"
            :tableData="item.delay_top"
            :optList="urlDelayOps">
        </ngnix-card>
      </el-col>
    </el-row>
  </el-row>
</div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import NgnixCard from '@/components/ngnixCard/ngnix-card.vue';
import DChart from './components/domain-chart.vue';
import {getDomainDetail} from '@/api/monitor';
@Component({components: {NgnixCard, DChart}})
export default class DomainCtrl extends Vue {
  loading = false;
  dataList: any = [];

  urlQpsOps = [
    {label: 'NO', prop: '', width: '60', align: 'center'},
    {label: 'URL', prop: 'url'},
    {label: 'QPS', prop: 'value',  width: '100',  align: 'center'},
  ];
  urlQpsList = [];

  urlDelayOps = [
    {label: 'NO', prop: '', width: '60', align: 'center'},
    {label: 'URL', prop: 'url'},
    {label: '延迟(ms)', prop: 'value', width: '100', align: 'center'},
  ];
  urlDelayList: any = [];

  mounted() {
    this.getDataList();
  }

  getDataList() {
    this.loading = true;
    const endTime = Math.floor(new Date().valueOf() / 1000) as any;
    const params = {
      start_time: endTime - 1 * 60,
      end_time: endTime,
    };
    getDomainDetail(params).then((rest: any) => {
      this.loading = false;
      this.dataList = rest;
    });
  }

}
</script>
<style lang="scss">
.host-detail {
  .item-header{
    border-radius: 0;
    height: 42px;
  }
  .list {
    background: #fff;
    margin-bottom: 20px;
  }
  .result{padding-top: 0}
  .el-table::before{height: 0;}
  .el-loading-mask{
    background: #fff;
  }
  .el-table--medium td, .el-table--medium th {
    padding:4px 0;
  }
}
body .host-detail-loading{
  padding: 0;
  margin-top: 150px;
}
</style>
