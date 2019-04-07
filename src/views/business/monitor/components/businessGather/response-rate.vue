<template>
<div class="clear w_100">
  <line-chart
      :id="Math.random()"
      :showMaxMin="false"
      :data="data"
      height="320px"
      unit="%"
      left="62"
      bottom="68"
      width="100%"
      title="成功率"/>
  </line-chart>
</div>
</template>
<script lang="ts">
import { Component, Vue, Prop} from 'vue-property-decorator';
import LineChart from '@/components/echarts/line-one.vue';
import { getBusinesSuccessRateMix } from '@/api/monitor';
@Component({components: {LineChart}})
export default class PvTps extends Vue {
  data: any = [];
  async getChart(params: any) {
    try {
      this.data = await getBusinesSuccessRateMix(params);
    } catch (err) {
      console.error(err);
    }
  }
}
</script>

