<template>
<div>
  <el-row :gutter="20">
    <el-col :span="12" v-loading="domainQpsLoading">
      <ngnix-card
        type="base"
        api="domain/graph/"
        title="全站域名QPS Top10"
        :tableData="domainQpsList"
        :optList="domainQpsOps">
      </ngnix-card>
    </el-col>
    <el-col :span="12" v-loading="domainDelayLoading">
      <ngnix-card
        type="msQPS"
        api="domain/graph/"
        title="全站域名延迟 Top10"
        :tableData="domainDelayList"
        :optList="domainDelayOps">
      </ngnix-card>
    </el-col>
  </el-row>  
  <el-row class="mt20" :gutter="20">
    <el-col :span="12" v-loading="urlQpsLoading">
      <ngnix-card
          type="base"
          api="domain/url/graph/"
          title="全站URL的QPS Top10"
          :tableData="urlQpsList"
          :optList="urlQpsOps">
      </ngnix-card>
    </el-col>
    <el-col :span="12" v-loading="urlDelayLoading">
      <ngnix-card
        type="msURL"
        api="domain/url/graph/"
        title="全站URL延迟 Top10"
        :tableData="urlDelayList"
        :optList="urlDelayOps">
      </ngnix-card>
    </el-col>
  </el-row>
</div>
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import NgnixCard from '@/components/ngnixCard/ngnix-card.vue';
import {
  getDomainQpsTop10,
  getDomainDelayTop10,
  getUrlQpsTop10,
  getUrlDelayTop10,
} from '@/api/monitor';
@Component({components: {NgnixCard}})
export default class Header extends Vue {
  domainQpsLoading = false;
  domainDelayLoading = false;
  urlQpsLoading = false;
  urlDelayLoading = false;

  domainQpsOps = [
    {label: 'NO', prop: '', width: '60', align: 'center'},
    {label: '域名', prop: 'domain'},
    {label: 'QPS', prop: 'value',  width: '80',  align: 'center'},
  ];

  domainQpsList: any  = [];
  domainDelayOps = [
    {label: 'NO', prop: '', width: '60', align: 'center'},
    {label: '域名', prop: 'domain'},
    {label: '延迟(ms)', prop: 'value', width: '100', align: 'center'},
  ];

  domainDelayList: any  = [];
  urlQpsOps = [
    {label: 'NO', prop: '', width: '60', align: 'center'},
    {label: '域名', prop: 'domain'},
    {label: 'QPS', prop: 'value',  width: '100',  align: 'center'},
  ];

  urlQpsList: any = [];
  urlDelayOps = [
    {label: 'NO', prop: '', width: '60', align: 'center'},
    {label: '域名', prop: 'domain'},
    {label: '延迟(ms)', prop: 'value', width: '100', align: 'center'},
  ];

  urlDelayList: any  = [];
  mounted() {
    this.getDataList();
  }

  getDataList() {
    const endTime = Math.floor(new Date().valueOf() / 1000);
    const params = {
      start_time: endTime - 1 * 60,
      end_time: endTime,
    };
    // 全站域名QPS Top10
    this.domainQpsLoading = true;
    getDomainQpsTop10(params).then((rest) => {
      this.domainQpsLoading = false;
      this.domainQpsList = rest;
    });
    // 全站域名延迟 Top10
    this.domainDelayLoading = true;
    getDomainDelayTop10(params).then((rest) => {
      this.domainDelayLoading = false;
      this.domainDelayList = rest;
    });
    // 全站URL的QPS Top10
    this.urlQpsLoading = true;
    getUrlQpsTop10(params).then((rest) => {
      this.urlQpsLoading = false;
      this.urlQpsList = rest;
    });
    // 全站URL延迟 Top10
    this.urlDelayLoading = true;
    getUrlDelayTop10(params).then((rest) => {
      this.urlDelayLoading = false;
      this.urlDelayList = rest;
    });
  }
}
</script>
