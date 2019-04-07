<template>
 <line-chart 
    :id="Math.random()"
    :series="data.list"
    :minY="data.min"
    :title="title">
  </line-chart>
</template>
<script lang="ts">
import { Component, Vue, Prop} from 'vue-property-decorator';
import LineChart from '@/components/echarts/line-more.vue';
import { getTcpConnectionStatus } from '@/api/monitor';
@Component({components: {LineChart}})
export default class TcpConnectionStatus extends Vue {
  @Prop() title!: string;
  data: any = {list: []};
  async getChart(params: any) {
    try {
      this.data = await getTcpConnectionStatus(params);
    } catch (err) {
      console.error(err);
    }
  }
}
</script>