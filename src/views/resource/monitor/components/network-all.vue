<template>
  <line-chart 
    :id="Math.random()"
    :series="data.data"
    :minY="data.min"
    unit="kb/s"
    left="80"
    :isLegend="isLegend"
    :title="title">
  </line-chart>
</template>
<script lang="ts">
import { Component, Vue, Prop} from 'vue-property-decorator';
import LineChart from '@/components/echarts/line-more.vue';
import { getNetworkTrafficAll } from '@/api/monitor';
@Component({components: {LineChart}})
export default class NetworkAll extends Vue {
  @Prop() title!: string;
  @Prop() background!: string;
  @Prop() isLegend!: boolean;
  data: any = {data: []};
  async getChart(params: any) {
    try {
      this.data = await getNetworkTrafficAll(params);
    } catch (err) {
      console.error(err);
    }
  }
}
</script>
