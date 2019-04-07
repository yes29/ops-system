<template>
  <div class="line-one">
    <div class="max-min" v-if="showMaxMin">
      <div class="fl" v-if="col.max_value">max:<span class="c-ffa"> {{ col.max_value ? col.max_value : 0 }}</span> </div>
      <div class="fl ml15" v-if="col.min_value">min:<span class="c-ffa"> {{ col.min_value ? col.min_value : 0 }}</span></div>
      <div class="fl ml15" v-if="col.cur_value">current:<span class="c-ffa"> {{ col.cur_value ? col.cur_value : 0 }}</span></div>
    </div>
    <div :class="className" :id="id" :style="{height:height,width:width}"/>
  </div>
</template>
<script lang="ts">
import * as echarts from 'echarts';
import { Component, Vue, Prop, Watch} from 'vue-property-decorator';
import { mixins } from 'vue-class-component';
import ResizeMixin from './resizeMixin';
@Component
export default class LineOne extends mixins(ResizeMixin) {
  screenWidth = document.body.clientWidth;
  col = {values: []};
  chart = null as any;
  @Prop() top!: string;
  @Prop({ default: '000' }) id!: any;
  @Prop({ default: {} }) data!: any;
  @Prop({ default: '' }) title!: string;
  @Prop({ default: '' }) seriesName!: string;
  @Prop({ default: '' }) unit!: string;
  @Prop({ default: true }) showMaxMin!: boolean;
  @Prop({ default: 'chart' }) className!: string;
  @Prop({ default: '60' }) left!: string;
  @Prop({ default: '250px' }) height!: string;
  @Prop({ default: 50 }) bottom!: string;
  @Prop({ default: '100%' }) width!: string;
  @Prop({ default: '#fff' }) background!: string;

  // 监听data数据，更新echars
  @Watch('data')
  onChildChanged(rest: any) {
    this.col = rest ? rest : {};
    if (this.chart && this.chart.clear) {
      this.chart.clear();
    }
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
    // 重点域名监控 用到
    if (this.data) {
      this.col = this.data;
      this.initChart();
    }
  }

  // 启动echarts
  initChart() {
    const EC = echarts as any;
    this.chart = EC.init(document.getElementById(this.id), require('./walden'));
    this.chart.setOption({
      backgroundColor: this.background,
       grid: {
        top: this.top ? this.top : this.title ? 58 : 32,
        left: this.left,
        bottom: this.bottom,
      },
      title: {
        text: this.title,
        x: '10',
        top: '10',
        textStyle: {
          fontSize: '15',
        },
      },
      tooltip: {
        trigger: 'axis',
      },
      xAxis: [{
        type: 'time',
        axisLine: {
          lineStyle: {
            color: '#90979c',
          },
        },
        splitLine: {
          show: false,
        },
      }],
      yAxis: [{
        type: 'value',
        axisLabel: {formatter: '{value} ' + this.unit},
        splitLine: {
          show: false,
        },
        axisLine: {
          lineStyle: {
            color: '#90979c',
          },
        },
      }],
      series: [{
        name: this.seriesName,
        type: 'line',
        sampling: 'average',
        smooth: true,
        symbol: 'circle',
        symbolSize: 0,
        data: this.col.values,
      }],
    });
  }
}
</script>
<style lang="scss" scoped>
.line-one{
  position: relative;
  width: 100%;
  .max-min{
    position: absolute;
    z-index: 9;
    left: 100px;
    top: 15px;
    font-size: 13px;
    line-height: 24px;
    color: #909399;
  }
  .c-ffa{color: red;}
  .fl{float: left; font-size: 12px;}
  .ml15{margin-left: 15px}
}
</style>
