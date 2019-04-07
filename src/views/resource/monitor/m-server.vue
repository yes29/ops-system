<template>
<div class="m-server">
  <td-overview></td-overview>
  <!-- cpu、memory、performance、Interrupts -->
  <el-row class="mt20" :gutter="20">
    <el-col :span="8">
      <td-cpu ref="cpu" title="CPU负载"></td-cpu>
    </el-col>
    <el-col :span="8">
      <td-memory ref="memory" title="内存使用"></td-memory>
    </el-col>
    <el-col :span="8">
      <td-performance ref="performance" title="CPU性能"></td-performance>
    </el-col>
  </el-row>
  <!-- 网卡 -->
  <el-row :gutter="20">
    <el-col :span="8" class="mt20">
      <td-interrupts ref="interrupts" title="中断 / 上下文切换"></td-interrupts>
    </el-col>
    <el-col :span="8" class="mt20">
      <tcp-connection ref="tcp" title="协议连接"></tcp-connection>
    </el-col>
     <el-col :span="8" class="mt20">
      <tcp-connection-status ref="tcpStatus" title="TCP状态"></tcp-connection-status>
    </el-col>
    <el-col :span="8" class="mt20"
        v-for="(item, index) in networkList"
        :key="index">
      <line-chart 
          :id="Math.random()"
          unit="kB/s"
          left="80"
          :series="item.data"
          :minY="item.min"
          :title="'网卡 ' + item.name">
      </line-chart>  
    </el-col>
   <!-- circle-pie -->
    <!-- <el-col 
        :span="12"
        class="mt20"
        v-for="item in diskList"
        :key="item.name">
      <circle-pie 
          :id="Math.random()"
          :data="item.data"
          :legend="legend"
          :title="item.title">
      </circle-pie>  
    </el-col> -->
    <!-- Protocol Connection -->
  </el-row>
</div>
</template>
<script lang="ts">
import { Component, Vue, Watch} from 'vue-property-decorator';
import { AppModule } from '@/store/modules/app';
import { startTime60, endTime } from '@/utils/index';
import TdOverview from './components/overview.vue';
import TdCpu from './components/cpu.vue';
import TdMemory from './components/memory.vue';
import TdPerformance from './components/performance.vue';
import TdInterrupts from './components/interrupts.vue';
import TdNetwork from './components/network.vue';
import TcpConnection from './components/tcp-connection.vue';
import TcpConnectionStatus from './components/tcp-connection-status.vue';
// import CirclePie from '@/components/echarts/circle-pie.vue';
import LineChart from '@/components/echarts/line-more.vue';
import { getNetworkTraffic, getDiskSpace } from '@/api/monitor';
@Component({
  components: {
    TdOverview,
    TdCpu,
    TdMemory,
    TdPerformance,
    TdInterrupts,
    TcpConnection,
    TcpConnectionStatus,
    LineChart,
    // CirclePie,
  },
})
export default class MServer extends Vue {
  startTime = startTime60();
  endTime = endTime();
  networkList: any = [];
  // diskList: any = [];
  tcpConnectionList: any = [];
  // legend = ['used space', 'free space'];


  mounted() {
    this.getCharts();
  }

 get dateResult() {
    return AppModule.dateResult;
  }

  @Watch('dateResult')
  onDateResult(rest: any) {
    if (rest.startTime === 0) {
      this.startTime = startTime60();
      this.endTime = endTime();
    } else {
      this.startTime = rest.startTime;
      this.endTime = rest.endTime;
    }
    this.getCharts();
  }

  getCharts() {
    const params = {
      start_time: this.startTime,
      end_time: this.endTime,
      ip: this.$route.query.ip,
    };
    const refs: any = this.$refs;
    refs.cpu.getChart(params);
    refs.memory.getChart(params);
    refs.performance.getChart(params);
    refs.interrupts.getChart(params);
    refs.tcp.getChart(params);
    refs.tcpStatus.getChart(params);
    this.getNetworkTraffic(params);
    // this.getDiskSpace(params);
  }

  async getNetworkTraffic(params: any) {
    try {
      this.networkList = await getNetworkTraffic(params);
    } catch (err) {
      console.error(err);
    }
  }

  async getDiskSpace(params: any) {
    try {
      const list: any = await getDiskSpace(params);
      // for (const k of list) {
      //   k.data = [];
      //   k.title = 'Partition ' + k.partition + ' space';
      //   k.data.push({value: (k.total - k.free), name: 'used space'});
      //   k.data.push({value: k.free, name: 'free space'});
      // }
      // this.diskList = list;
    } catch (err) {
      console.error(err);
    }
  }

}
</script>
<style lang="scss">
.m-server{
  .name{
    color:rgba(237, 129, 40, 0.89);
    margin-top: -20px;
    padding: 5px 5px 5px 0;
    font-size: 16px;
    font-weight: bold;
  }
}
</style>