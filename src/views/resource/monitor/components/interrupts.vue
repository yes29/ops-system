<template>
 <line-chart 
        :id="Math.random()"
        unit="K"
        :series="data.list"
        :minY="data.min"
        :title="title">
      </line-chart>
</template>
<script lang="ts">
import { Component, Vue, Prop} from 'vue-property-decorator';
import LineChart from '@/components/echarts/line-more.vue';
import { getCpuInterrupt } from '@/api/monitor';
@Component({components: {LineChart}})
export default class MInterrupts extends Vue {
  data: any = {list: []};
  @Prop() title!: string;
  async getChart(params: any) {
    try {
      this.data = await getCpuInterrupt(params);
    } catch (err) {
      console.error(err);
    }
  }
}
</script>
