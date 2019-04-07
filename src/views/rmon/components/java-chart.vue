 <template>
  <!-- <td-chart :id="Math.random()" v-loading="loading" :seriesName="数量(个)" :data="chart" height="273px" width="100%" title="error(个)"/> -->
    <line-chart :id="Math.random()"
        v-loading="loading"
        :seriesName="seriesName"
        :data="chart"
        height="273px"
        width="100%"
        :title="title"/>
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import { startTime, endTime } from '@/utils/index';
import {importantBusiness } from '@/api/java';
import LineChart from '@/components/echarts/line-one.vue';
import { AppModule } from '@/store/modules/app';
@Component({components: {LineChart}})
export default class JavaChart extends Vue {
  @Prop({ default: '' }) api!: string;
  @Prop({ default: '' }) url!: string;
  @Prop({ default: '' }) seriesName!: string;
  @Prop({ default: '' }) title!: string;
  startTime = startTime();
  endTime = endTime();
  loading = false;
  chart = {};

  get dateResult() {
    return AppModule.dateResult;
  }

  @Watch('dateResult')
  onDateResult(rest: any) {
    this.startTime = rest.startTime;
    this.endTime = rest.endTime;
    this.getChart();
  }

  mounted() {
   this.getChart();
  }

  getChart() {
    const params = {
      startTime: this.startTime,
      endTime: this.endTime,
      url: this.url,
    };
    this.loading = true;
    importantBusiness(this.api, params).then((rest: any) => {
      this.loading = false;
      let list = rest.data;
      if (!list) {
        list = [];
      }
      const arr = [] as any;
      for (const k of list) {
        const arr2 = [] as any;
        arr2.push(new Date(k.date).getTime());
        arr2.push(k.value);
        arr.push(arr2);
      }
      this.chart = {max_value: rest.max, min_value: rest.min, values: arr};
    })
    .catch((err: any) => {
      this.loading = false;
    });
  }
}
</script>