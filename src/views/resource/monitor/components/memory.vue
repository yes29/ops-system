<template>
  <line-chart 
    :id="Math.random()"
    unit="G"
    left="68"
    :series="data.list"
    :minY="data.min"
    :isLegend="isLegend"
    :title="title">
  </line-chart>
</template>
<script lang="ts">
import { Component, Vue, Prop} from 'vue-property-decorator';
import LineChart from '@/components/echarts/line-more.vue';
import { getMemory } from '@/api/monitor';
@Component({components: {LineChart}})
export default class MMemory extends Vue {
  @Prop() title!: string;
  @Prop() isLegend!: boolean;
  data: any = {list: []};
  async getChart(params: any) {
    try {
      this.data = await getMemory(params);
    } catch (err) {
      console.error(err);
    }
  }
}
</script>
