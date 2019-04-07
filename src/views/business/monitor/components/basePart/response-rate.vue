<template>
<div class="clear w_100">
  <el-row class="b-row" v-if="showTrend">
    <el-col :span="7">&nbsp;</el-col>
     <el-col :span="7">
      <span>max：</span>
      <span class="c217">{{data.max_value}}%</span>
    </el-col>
     <el-col :span="7">
      <span class="pl20">min：</span>
      <span class="c217">{{data.min_value}}%</span>
    </el-col>
    <el-col>&nbsp;</el-col>
  </el-row>
  <line-chart
      :id="Math.random()"
      :showMaxMin="false"
      :data="data"
      :height="height"
      :top="top"
      unit="%"
      left="62"
      bottom="68"
      width="100%"
      :title="title"/>
  </line-chart>
</div>
</template>
<script lang="ts">
import { Component, Vue, Prop} from 'vue-property-decorator';
import LineChart from '@/components/echarts/line-one.vue';
import { getResponseRate } from '@/api/monitor';
@Component({components: {LineChart}})
export default class ResponseRate extends Vue {
  @Prop() title!: string;
  @Prop() height!: string;
  @Prop() top!: string;
  @Prop({default: true}) showTrend!: boolean;
  data: any = {};

  async getChart(params: any) {
    try {
      this.data = await getResponseRate(params);
    } catch (err) {
      console.error(err);
    }
  }

}
</script>
