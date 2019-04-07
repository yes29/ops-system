<template>
<div class="clear w_100">
  <line-chart 
      :id="Math.random()"
      :series="data"
      height="320px"
      title="访问量"
      bottom="68"
      left="62"
      width="100%">
  </line-chart>
</div>
</template>
<script lang="ts">
import { Component, Vue, Prop} from 'vue-property-decorator';
import LineChart from '@/components/echarts/line-more.vue';
import { getBusinessPvTps} from '@/api/monitor';
@Component({components: {LineChart}})
export default class PvTps extends Vue {
  data: any = [];
  async getChart(params: any) {
    try {
      this.data = await getBusinessPvTps(params);
    } catch (err) {
      console.error(err);
    }
  }
}
</script>

