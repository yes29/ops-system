<template>
 <line-chart 
    :id="Math.random()"
    :series="data.data"
    :minY="data.min"
    :title="title">
  </line-chart>
</template>
<script lang="ts">
import { Component, Vue, Prop} from 'vue-property-decorator';
import LineChart from '@/components/echarts/line-more.vue';
import { getTcpConnection } from '@/api/monitor';
@Component({components: {LineChart}})
export default class TcpConnection extends Vue {
  data: any = {data: []};
  @Prop() title!: string;
  async getChart(params: any) {
    try {
      this.data = await getTcpConnection(params);
    } catch (err) {
      console.error(err);
    }
  }
}
</script>