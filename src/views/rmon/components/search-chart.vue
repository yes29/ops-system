 <template>
  <div class="search-chart">
    <div class="item-header">
      <!-- www.tuandao.com/pages/weplan/welist -->
      <div class="title fs14">	{{row.domain}}{{row.url}}</div>
    </div>
    <div v-loading="loading">
      <line-chart
          :id="Math.random()"
          seriesName="QPS"
          :data="chart.qps"
          height="273px"
          width="100%"
          title="QPS" />
      <line-chart
          :id="Math.random()"
          seriesName="延迟"
          unit="ms"
          :data="chart.delay"
          height="273px"
          width="100%"
          title="延迟"/>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import { startTime, endTime } from '@/utils/index';
import LineChart from '@/components/echarts/line-one.vue';
import { AppModule } from '@/store/modules/app';
import { getDUGraph } from '@/api/monitor';
@Component({components: {LineChart}})
export default class SearchChart extends Vue {
  @Prop({ default: {} }) row!: any;
  startTime = startTime();
  endTime = endTime();
  loading = false;
  chart: any = { qps: {}, delay: {}};

  get dateResult() {
    return AppModule.dateResult;
  }

  @Watch('row')
  handlerRow(row: any) {
    if (row && row.url) {
      this.getChart();
    } else {
      this.chart = { qps: {}, delay: {}};
    }
  }

  @Watch('dateResult')
  onDateResult(rest: any) {
    this.startTime = rest.startTime;
    this.endTime = rest.endTime;
    this.getChart();
  }

  getChart() {
    const params = {
      start_time: this.startTime,
      end_time: this.endTime,
      domain: this.row.domain,
      url: this.row.url,
    };
    getDUGraph(params).then((rest) => {
      this.loading = false;
      this.chart = rest;
    })
    .catch((err) => {
      this.loading = false;
    });
  }
}
</script>
