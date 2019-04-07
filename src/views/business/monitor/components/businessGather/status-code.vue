<template>
 <circle-pie 
    :id="Math.random()"
    :data="circleList"
    :legend="legend"
    height="320px"
    title="响应状态码">
  </circle-pie>
</template>
<script lang="ts">
import { Component, Vue, Prop} from 'vue-property-decorator';
import CirclePie from '@/components/echarts/circle-pie.vue';
import { getBusineSstatusCodeMix } from '@/api/monitor';
@Component({components: {CirclePie}})
export default class BusineSstatusCode extends Vue {
  @Prop() title!: string;
  @Prop() height!: string;
  circleList: any = [];
  legend: any = [];

  async getChart(params: any) {
    try {
      const list: any = await getBusineSstatusCodeMix(params);
      for (const k of list) {
        k.name = k.code;
        this.legend.push(k.code);
      }
      this.circleList = list;
    } catch (err) {
      console.error(err);
    }
  }
}
</script>