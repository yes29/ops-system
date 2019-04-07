<template>
<el-row class="ba-fff w_100">
  <el-col :span="8">
    <td-cpu ref="cpu" title="CPU负载"></td-cpu>
  </el-col>
  <el-col :span="8">
    <td-memory ref="memory" title="内存使用"></td-memory>
  </el-col>
  <el-col :span="8">
    <network-all ref="network" title="网卡流量"></network-all>
  </el-col>
</el-row>
</template>
<script lang="ts">
import { Component, Vue, Prop} from 'vue-property-decorator';
import TdCpu from '@/views/resource/monitor/components/cpu.vue';
import TdMemory from '@/views/resource/monitor/components/memory.vue';
import NetworkAll from '@/views/resource/monitor/components/network-all.vue';
@Component({components: {TdCpu, TdMemory, NetworkAll}})
export default class HostInstance extends Vue {
  @Prop() ip!: string;
  @Prop() startTime!: string;
  @Prop() endTime!: string;

  mounted() {
    this.getChart();
  }

  getChart() {
    const params = {
      start_time: this.startTime,
      end_time: this.endTime,
      ip: this.ip,
    };
    const refs: any = this.$refs;
    refs.cpu.getChart(params);
    refs.memory.getChart(params);
    refs.network.getChart(params);
  }
}
</script>

