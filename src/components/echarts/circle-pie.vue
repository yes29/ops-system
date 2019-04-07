<template>
  <div :id="id" :style="{height:height,width:width}"/></div>
</template>
<script lang="ts">
import * as echarts from 'echarts';
import { Component, Vue, Prop, Watch} from 'vue-property-decorator';
import { mixins } from 'vue-class-component';
import ResizeMixin from './resizeMixin';
@Component
export default class CirclePie extends mixins(ResizeMixin) {
  screenWidth = document.body.clientWidth;
  chart = null as any;
  @Prop({ default: [] }) data!: any;
  @Prop({ default: [] }) legend!: any;
  @Prop({ default: '' }) title!: string;
  @Prop({ default: '000' }) id!: any;
  @Prop({ default: '250px' }) height!: string;
  @Prop({ default: '100%' }) width!: string;
  @Prop({ default: '#fff' }) background!: string;

  // 监听data数据，更新echars
  @Watch('data')
  onChildChanged(rest: any) {
    if (this.chart && this.chart.clear) {
      this.chart.clear();
    }
    setTimeout(() => {
      this.initChart();
    });
  }

  // screenWidth来自继承的ResizeMixin
  @Watch('screenWidth')
  async init() {
    const ele = document.getElementById(this.id) as any;
    this.chart = echarts.init(ele);
    this.chart.resize();
  }

  // 当有data值时，init echarts
  mounted() {
    if (this.data.length > 0) {
      this.initChart();
    }
  }

  // 启动echarts
  initChart() {
    const EC = echarts as any;
    this.chart = EC.init(document.getElementById(this.id), require('./walden'));
    this.chart.setOption({
      backgroundColor: this.background,
      title: {
        text: this.title,
        x: '10',
        top: '12',
        textStyle: {
          fontSize: '15',
        },
      },
      tooltip : {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)',
      },
      legend: {
        orient: 'vertical',
        left: '20',
        top: '50',
        data: this.legend,
        textStyle: {
          fontSize: '12',
        },
      },
      series: [
        {
          name: '访问来源',
          type: 'pie',
          roseType : 'radius',
          radius : '50%',
          itemStyle: {
            left: '20',
            normal : {
              label : {
                position : 'outer',
                formatter(params: any) {
                  return (params.percent - 0) + '%';
                  // return params.name + ' ' + (params.percent - 0) + '%';
                },
                textStyle: {
                  color: '#888',
                },
              },
            },
          },
          data: this.data,
        },
      ],
    });
  }
}
</script>

