<template>
<div class="clear w_100">
  <el-row class="b-row" v-if="showTrend">
    <el-col :span="5">&nbsp;</el-col>
    <el-col :span="6">
      <span class="c217">{{trend.tps_1min}}</span>
      <span class="trir" :class="trend.tps_1min_trend < 0 ? 'decline': 'go-up'"></span>
      <span class="pl3" :class="trend.tps_1min_trend < 0 ? 'cff4': 'c39d'">{{Number(trend.tps_1min_trend).toFixed(2)}}%</span>
      <div class="fs12">1min(TPS)</div>
    </el-col>
    <el-col :span="6"> 
      <span class="c217">{{trend.tps_5min}}</span>
      <span class="trir" :class="trend.tps_5min_trend < 0 ? 'decline': 'go-up'"></span>
      <span class="c39d pl3" :class="trend.tps_5min_trend < 0 ? 'cff4': 'c39d'">{{Number(trend.tps_5min_trend).toFixed(2)}}%</span><br>
      <div>5min(TPS)</div>
    </el-col>
    <el-col :span="6">
      <span class="c217">{{Number(tpsMax).toFixed(2)}}</span>
      <div>TPS</div>
    </el-col>
    <el-col>&nbsp;</el-col>
  </el-row>
  <line-chart 
      :id="Math.random()"
      :series="data"
      :height="height"
      :top="top"
      :title="title"
      bottom="68"
      left="62"
      width="100%">
  </line-chart>
</div>
</template>
<script lang="ts">
import { Component, Vue, Prop} from 'vue-property-decorator';
import LineChart from '@/components/echarts/line-more.vue';
import { getPvTps, getTpsTrend} from '@/api/monitor';
@Component({components: {LineChart}})
export default class PvTps extends Vue {
  @Prop() title!: string;
  @Prop() height!: string;
  @Prop() top!: string;
  @Prop({default: true}) showTrend!: boolean;
  data: any = [];
  tpsMax = 0;
  trend: any = {
    tps_1min_trend: 0.00,
  };

  getChart(params: any) {
    this.getgetPvTps(params);
    this.getTpsTrend(params);
  }

  async getgetPvTps(params: any) {
    try {
      const data: any = await getPvTps(params);
      if (data && data.length > 2) {
        this.tpsMax = data[1].max;
      }
      this.data = data;
    } catch (err) {
      console.error(err);
    }
  }

  async getTpsTrend(params: any) {
    try {
      this.trend = await getTpsTrend(params);
    } catch (err) {
      console.error(err);
    }
  }

}
</script>

