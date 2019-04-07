<template>
<el-row v-loading="loading">
  <el-col :span="12">
    <line-chart 
        :id="Math.random()"
        seriesName="QPS"
        :data="chart.qps"
        height="239px"
        width="100%"
        title="QPS">
    </line-chart>
  </el-col>
  <el-col :span="12">
    <line-chart
        :id="Math.random()"
        seriesName="延迟"
        unit="ms"
        :data="chart.delay"
        height="239px"
        width="100%"
        title="延迟"/>
      </line-chart>
  </el-col>
</el-row> 
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import { startTime, endTime } from '@/utils/index';
import LineChart from '@/components/echarts/line-one.vue';
import { AppModule } from '@/store/modules/app';
import { getGraph } from '@/api/monitor';
@Component({components: {LineChart}})
export default class DomainChart extends Vue {
  @Prop({ default: '' }) domain!: string;
  startTime = startTime();
  endTime = endTime();
  loading = false;
  chart = { qps: {}, delay: {}} as any;

  get dateResult() {
    return AppModule.dateResult;
  }

  @Watch('dateResult')
  onDateResult(rest: any) {
    this.startTime = rest.startTime;
    this.endTime = rest.endTime;
    this.getChart();
  }

  mounted() {
    this.getChart();
  }

  getChart() {
    const params = {
      start_time: this.startTime,
      end_time: this.endTime,
      domain: this.domain,
    };
    this.loading = true;
    getGraph('domain/graph/', params).then((rest: any) => {
      this.loading = false;
      this.chart = rest;
    })
    .catch((err: any) => {
      this.chart = { qps: {}, delay: {}};
      this.loading = false;
    });
  }
}
</script>
