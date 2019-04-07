<template>
<div class="ba-fff">
  <div class="empha-title">{{serviceName}}</div>
  <el-row>
    <el-col :span="6">
      <pv-tps ref="pvTps"></pv-tps>
    </el-col>
    <el-col :span="6">
      <response-time ref="responseTime"></response-time>
    </el-col>
    <el-col :span="6">
      <response-rate ref="responseRate"></response-rate>
    </el-col>
    <el-col :span="6"> 
      <status-code ref="statusCode"></status-code>
    </el-col>
  </el-row>
</div>
</template>
<script lang="ts">
import { Component, Vue, Prop} from 'vue-property-decorator';
import { AppModule } from '@/store/modules/app';
import PvTps from './businessService/pv-tps.vue';
import ResponseTime from './businessService/response-time.vue';
import StatusCode from './businessService/status-code.vue';
import ResponseRate from './businessService/response-rate.vue';
import { setTimeout } from 'timers';
@Component({components: {PvTps, ResponseTime, StatusCode, ResponseRate}})
export default class BusinessService extends Vue {
  @Prop({default: ''}) serviceName!: string;
  @Prop() params!: any;
  mounted() {
    setTimeout(() => {
      this.getCharts();
    }, 100);
  }
  getCharts() {
    const refs: any = this.$refs;
    const params: any = this.params;
    params.service_name = this.serviceName;
    refs.pvTps.getChart(params);
    refs.responseTime.getChart(params);
    refs.statusCode.getChart(params);
    refs.responseRate.getChart(params);
  }
}
</script>
