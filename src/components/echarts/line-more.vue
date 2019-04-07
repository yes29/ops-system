<template>
  <div :id="id" :style="{height:height, width:width}"/></div>
</template>
<script lang="ts">
import * as echarts from 'echarts';
import { Component, Vue, Prop, Watch} from 'vue-property-decorator';
import { mixins } from 'vue-class-component';
import ResizeMixin from './resizeMixin';
import { required } from '@/utils/validate';

@Component
export default class LineMore extends mixins(ResizeMixin) {
  screenWidth = document.body.clientWidth;
  chart = null as any;
  data: any = [];
  legend: string[] = [];
  @Prop() title!: string;
  @Prop() top!: string;
  @Prop({ default: '000' }) id!: any;
  @Prop({ default: [] }) series!: any;
  @Prop({ default: true }) isLegend!: boolean;
  @Prop({ default: '' }) unit!: string;
  @Prop({ default: 0 }) minY!: number;
  @Prop({ default: '250px' }) height!: string;
  @Prop({ default: '100%' }) width!: string;
  @Prop({ default: '60' }) left!: string;
  @Prop({ default: '80' }) bottom!: string;
  @Prop({ default: '#fff' }) background!: string;

  // 监听series数据，更新echars
  @Watch('series')
  onChildChanged(rest: any) {
    if (this.chart && this.chart.clear) {
      this.chart.clear();
    }
    this.eachSeries(rest);
    setTimeout(() => {
      this.initChart();
    });
  }

  // screenWidth来自继承的ResizeMixin
  @Watch('screenWidth')
  async resize() {
    const ele: any = document.getElementById(this.id);
    this.chart = echarts.init(ele);
    this.chart.resize();
  }

   // 当有data值时，init echarts
  mounted() {
    if (this.series.length > 0) {
      this.eachSeries(this.series);
      this.initChart();
    }
  }

  // 给每条线加规则
  eachSeries(list: any) {
    const set = {
      sampling: 'average',
      smooth: true,
      symbol: 'circle',
      symbolSize: 0,
      type: 'line',
    };
    const arr = [];
    for (const k of list) {
      arr.push(Object.assign({}, k, set));
    }
    this.data = arr;
  }

  // 启动echarts
  initChart() {
    for (const k of this.series) {
      if (k.name && this.isLegend) {
        this.legend.push(k.name);
      }
    }
    const EC: any = echarts;
    this.chart = EC.init(document.getElementById(this.id), require('./walden'));
    this.chart.setOption({
      backgroundColor: this.background,
      grid: {
        top: this.top ? this.top : this.title ? 58 : 32,
        left: this.left,
        bottom: this.legend.length > 0 ? this.bottom : '50',
      },
      title: {
        text: this.title,
        x: '10',
        top: '12',
        textStyle: {
          fontSize: '15',
        },
      },
      legend: {
        bottom: '12',
        itemWidth: 6, // 图例的宽度
        itemHeight: 8, // 图例的高度
        data: this.legend,
      },
      tooltip: {
        trigger: 'axis',
      },
      xAxis: [{
        type: 'time',
        splitLine: {
          show: false,
        },
      }],
      yAxis: [{
        type: 'value',
        min: this.minY,
        axisLabel: {formatter: '{value} ' + this.unit},
        splitLine: {
          show: false,
        },
      }],
      series: this.data,
    });
  }
}
</script>
