<template>
  <line-chart
      :id="Math.random()"
      unit="BPS"
      left="78"
      :series="data.data"
      :minY="data.min"
      :isLegend="isLegend"
      :title="title">
  </line-chart>
</template>
<script lang="ts">
import { Component, Vue, Prop} from 'vue-property-decorator';
import LineChart from '@/components/echarts/line-more.vue';
import { getDiskIO } from '@/api/monitor';
@Component({components: {LineChart}})
export default class MDiskIO extends Vue {
  @Prop() title!: string;
  @Prop() background!: string;
  @Prop() isLegend!: boolean;
  data: any = {data: []};
  async getChart(params: any) {
    try {
      this.data = await getDiskIO(params);
    } catch (err) {
      console.error(err);
    }
  }
}
</script>
