<template>
<div class="ba-fff">
  <div class="empha-title">{{item.service_name}}：{{item.uri}}</div>
  <el-row>
    <el-col :span="6">
      <pv-tps ref="pvTps" title="访问量" height="320px" top="90"></pv-tps>
    </el-col>
    <el-col :span="6">
      <response-time ref="responseTime" title="响应时间" height="320px" top="90"></response-time>
    </el-col>
    <el-col :span="6">
      <response-rate ref="responseRate" title="成功率" height="320px" top="90"></response-rate>
    </el-col>
    <el-col :span="6"> 
      <status-code ref="statusCode" title="响应状态码"  height="320px" top="90"></status-code>
    </el-col>
  </el-row>
</div>

</template>
<script lang="ts">
import { Component, Vue, Prop} from 'vue-property-decorator';
import PvTps from './basePart/pv-tps.vue';
import ResponseTime from './basePart/response-time.vue';
import StatusCode from './basePart/status-code.vue';
import ResponseRate from './basePart/response-rate.vue';
@Component({components: { PvTps, ResponseTime, StatusCode, ResponseRate}})
export default class EmphaUrl  extends Vue {
  @Prop({default: {}}) params!: any;
  @Prop({default: {}}) item!: any;
  mounted() {
    const refs: any = this.$refs;
    const params = {
      startTime: this.params.startTime,
      endTime: this.params.endTime,
      service_name: this.item.service_name,
      uri: this.item.uri,
    };
    refs.pvTps.getChart(params);
    refs.responseTime.getChart(params);
    refs.statusCode.getChart(params);
    refs.responseRate.getChart(params);
  }
}
</script>

