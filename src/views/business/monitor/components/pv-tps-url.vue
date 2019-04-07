<template>
<div class="clear w_100">
  <el-row class="b-row mt10">
    <el-col :span="4">&nbsp;</el-col>
    <el-col :span="5">
      <span class="c217">{{trend.tps_1min}}</span>
      <span class="trir" :class="trend.tps_1min_trend < 0 ? 'decline': 'go-up'"></span>
      <span class="pl3" :class="trend.tps_1min_trend < 0 ? 'cff4': 'c39d'">{{Number(trend.tps_1min_trend).toFixed(2)}}%</span><br>
      <div class="fs12">1min(TPS)</div>
    </el-col>
   <el-col :span="5">
      <span class="c217">{{trend.tp90}}</span>
      <span class="trir" :class="trend.tp90_trend < 0 ? 'decline': 'go-up'"></span>
      <span class="pl3" :class="trend.tp90_trend < 0 ? 'cff4': 'c39d'">{{Number(trend.tp90_trend).toFixed(2)}}%</span><br>
      <div class="fs12">TP90</div>
    </el-col>
    <el-col :span="5"> 
      <span class="c217">{{trend.tp99}}</span>
      <span class="trir" :class="trend.tp99_trend < 0 ? 'decline': 'go-up'"></span>
      <span class="c39d pl3" :class="trend.tp99_trend < 0 ? 'cff4': 'c39d'">{{Number(trend.tp99_trend).toFixed(2)}}%</span><br>
      <div> TP99</div>
    </el-col>
   <el-col :span="5"> 
    <span class="c217">{{trend.error_rate}}</span>
    <span class="trir" :class="trend.error_trend < 0 ? 'decline': 'go-up'"></span>
    <span class="c39d pl3" :class="trend.error_trend < 0 ? 'cff4': 'c39d'">{{Number(trend.tp99_trend).toFixed(2)}}</span><br>
    <div> 5XX</div>
  </el-col>
    <el-col>&nbsp;</el-col>
  </el-row>
  <line-chart 
      :id="Math.random()"
      :series="data"
      height="340px"
      bottom="62"
      left="62"
      top="100"
      width="100%"
      :title="item.uri">
  </line-chart>
</div>
</template>
<script lang="ts">
import { Component, Vue, Prop} from 'vue-property-decorator';
import LineChart from '@/components/echarts/line-more.vue';
import { getTpsTrend, getTp9xTrend, getStatusError, getTpvTpsUrl} from '@/api/monitor';
@Component({components: {LineChart}})
export default class PvTpsUrl  extends Vue {
  @Prop({default: {}}) item!: any;
  @Prop({default: {}}) params!: any;
  trend: any = {
    tps_1min: 0,
    tps_1min_trend: 0,
    tp90: 0,
    tp90_trend: 0,
    tp99: 0,
    tp99_trend: 0,
    error_rate: 0,
    error_trend: 0,
  };
  data: any = [];

  mounted() {
    this.params.uri = this.item.uri;
    this.getFocus();
    this.getTpvTps();
  }

  async getFocus() {
    try {
      const tps = await getTpsTrend(this.params);
      const tp9x = await getTp9xTrend(this.params);
      const error = await getStatusError(this.params);
      this.trend = Object.assign(tps, tp9x, error);
    } catch (err) {
      console.error(err);
    }
  }

  async getTpvTps() {
    try {
      this.data = await getTpvTpsUrl(this.params);
    } catch (err) {
      console.error(err);
    }
  }
}
</script>

