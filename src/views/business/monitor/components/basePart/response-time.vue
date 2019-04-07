<template>
<div class="clear w_100">
  <el-row class="b-row" v-if="showTrend">
    <el-col :span="7">&nbsp;</el-col>
    <el-col :span="7">
      <span class="c217">{{trend.tp90}}</span>
      <span class="trir" :class="trend.tp90_trend < 0 ? 'decline': 'go-up'"></span>
      <span class="pl3" :class="trend.tp90_trend < 0 ? 'cff4': 'c39d'">{{Number(trend.tp90_trend).toFixed(2)}}%</span><br>
      <div class="fs12">TP90</div>
    </el-col>
    <el-col :span="7"> 
      <span class="c217">{{trend.tp99}}</span>
      <span class="trir" :class="trend.tp99_trend < 0 ? 'decline': 'go-up'"></span>
      <span class="c39d pl3" :class="trend.tp99_trend < 0 ? 'cff4': 'c39d'">{{Number(trend.tp99_trend).toFixed(2)}}%</span><br>
      <div> TP99</div>
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
import { getTp9x, getTp9xTrend } from '@/api/monitor';
@Component({components: {LineChart}})
export default class ResponseTime extends Vue {
  @Prop() title!: string;
  @Prop() height!: string;
  @Prop() top!: string;
  @Prop({default: true}) showTrend!: boolean;
  data: any = [];
  trend = {};

  async getChart(params: any) {
    this.getTp9x(params);
    this.getTp9xTrend(params);
  }

  async getTp9x(params: any) {
    try {
      this.data = await getTp9x(params);
    } catch (err) {
      console.error(err);
    }
  }

  async getTp9xTrend(params: any) {
    try {
      this.trend = await getTp9xTrend(params);
    } catch (err) {
      console.error(err);
    }
  }
}
</script>
