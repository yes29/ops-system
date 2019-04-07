<template>
 <line-chart 
    :id="Math.random()"
    :series="data.list"
    :minY="data.min"
    :title="title"
    left="40"
    bottom="106">
  </line-chart>
</template>
<script lang="ts">
import { Component, Vue, Prop} from 'vue-property-decorator';
import LineChart from '@/components/echarts/line-more.vue';
import { getCpuTime } from '@/api/monitor';
@Component({components: {LineChart}})
export default class MPerformance extends Vue {
  data: any = {list: []};
  @Prop() title!: string;
  async getChart(params: any) {
    try {
      this.data = await getCpuTime(params);
    } catch (err) {
      console.error(err);
    }
  }
}
</script>