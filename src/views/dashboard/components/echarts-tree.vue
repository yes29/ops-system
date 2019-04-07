<template>
<el-row class="tree" :gutter="20">
  <el-col :span="24" style="background: #fff">
    <div id="tree" :style="{width: '40%', height: '720px'}"></div>
  </el-col>
</el-row>
</template>
<script lang="ts">
import { Component, Vue} from 'vue-property-decorator';
import * as echarts from 'echarts';
import { rscIndex } from '@/api/cmdb';
@Component
export default class EchartsTree extends Vue {
  chart = null as any;
  data = [];

  mounted() {
    this.getData();
  }

 async getData() {
    const rest: any = await rscIndex();
    const list: any = this.recursionId(rest);
    if (list.length > 0) {
      this.data = list[0];
    } else {
      this.data = [];
    }
    // 数组、对象
    this.initTree(this.data);
  }

  // 由于id一样，会让树产生bug, 故将ID变成随机
  recursionId(result: any) {
    const eachData = (data: any) => {
      for (const k of data) {
        k.nid = k.id;
        k.id = Math.random();
        k.symbol = 'image://' + require('./chart.png');
        k.symbolSize = [18, 18];
        if (k.children) {
          eachData(k.children);
        }
      }
    };
    eachData(result);
    return result;
  }

  initTree(data: any) {
    const EC = echarts as any;
    this.chart = EC.init(document.getElementById('tree'));
    // myChart.on('click', (node) => {
    //   if (node.data.type === '机柜') {
    //     myChart.clear()
    //     this.setCabinet(data, node.data)
    //   }
    // })
    this.setOption(data);
  }

  // 遍历节点
  setCabine(data: any, node: any) {
    for (const m of data.children) {
      if (m.children) {
        for (const n of m.children) {
          if (n.id === node.id) {
            n.collapsed = false;
          } else {
            n.collapsed = true;
          }
        }
      }
    }
    this.setOption(data);
  }

  setOption(data: any) {
    // 节点点击事件
    this.chart.setOption({
      title: {
        text: '拓扑图',
        top: '15',
        left: '15',
      },
      tooltip: {
        trigger: 'item',
        triggerOn: 'mousemove',
        formatter: (params: any) => {
          const color: any = params.color; // 图例颜色
          const result: any = params.data;
          // 为了保证和原来的效果一样，这里自己实现了一个点的效果
          const dot = '<span style="margin-right:5px;display:inline-block;width:10px;height:10px;border-radius:5px;background-color:' + color + ';"></span>';
          let htmlStr = '<div>';
          //  style="color:#ffd005;"
          htmlStr += '<div>' + result.type + '<span>（' + params.name + '</span>）</div>'; // 标题
          // 加s的是宿主机
          if (result.s_host_count) {
            htmlStr += '<div style="margin-left:10px;">' + dot + '宿主机：' + result.s_host_count + '个</div>';
          }
          // 加V的是虚拟机
          if (result.v_host_count) {
            htmlStr += '<div style="margin-left:10px;">' + dot + '虚拟机：' + result.v_host_count + '个</div>';
          }
          // 服务器
          if (result.host_count) {
            htmlStr += '<div style="margin-left:10px;">' + dot + '服务器：' + result.host_count + '个</div>';
          }
          htmlStr += '</div>';
          return htmlStr;
        },
      },
      series: [
        {
          type: 'tree',
          // animation: false,
          data: [data],
          symbolSize: 10,
          left: '68px',
          right: '68px',
          itemStyle: {
            borderColor: '#57a3f3',
          },
          label: {
            normal: {
              position: 'left',
              verticalAlign: 'middle',
              align: 'right',
              fontSize: 12,
            },
          },
          leaves: {
            label: {
              normal: {
                position: 'right',
                verticalAlign: 'middle',
                align: 'left',
              },
            },
          },
          animationDuration: 550,
          animationDurationUpdate: 750,
        },
      ],
    }, true);
  }
}
</script>
