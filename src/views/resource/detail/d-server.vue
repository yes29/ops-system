<template>
<div ref="service">
  <td-detail title="服务器详情">
    <base-card
        width="50%"
        :showNull="false"
        :row="row"
        :optList="baseOptList">
    </base-card>
    <table-card
        v-if="diskList.length > 0"
        title="硬盘分区"
        :columns="diskList"
        :optList="diskOptList">
    </table-card>
    <table-card
        v-if="netCardList.length > 0"
        title="关联网卡"
        :columns="netCardList"
        :optList="netCardOptList">
    </table-card>
    <table-card
        title="关联VM"
        :columns ="row.virtual_machines ? row.virtual_machines : []"
        :keyword="row.name"
        path="/resource/server"
        :optList="virtualsList"
        v-if="row.server_type === 1">
    </table-card>
    <div v-for="(item, index) in servicesList" :key="index">
      <table-card
          :keyword="item.name"
          path="/attribute/"
          :title="item.title"
          :columns="item.columns"
          :optList="item.optList">
      </table-card>
    </div>
    <td-card title="监控概览">
      <el-row class="mt10">
        <el-col :span="12">
          <td-cpu class="mt_12" ref="cpu" title="CPU负载" :isLegend="false"></td-cpu>
        </el-col>
        <el-col :span="12">
          <td-memory class="mt_12" ref="memory" title="内存使用" :isLegend="false"></td-memory>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="row.server_type_detail === 'VM' ? 24 : 12">
          <network-all class="mt_12" ref="network" title="网卡流量" :isLegend="false"></network-all>
        </el-col>
        <el-col :span="12" v-if="row.server_type_detail !== 'VM'">
          <disk-io class="mt_12" ref="diskIO" title="硬盘读写" :isLegend="false"></disk-io>
        </el-col>
      </el-row>
    </td-card>
  </td-detail>
</div>
</template>
<script lang="ts">
import { Component, Vue, Watch} from 'vue-property-decorator';
import { rscListServices } from '@/api/cmdb';
import { getDiskSpace } from '@/api/monitor';
import { DetailModule } from '@/store/modules/detail';
import TdDetail from '@/components/detail/detail.vue';
import TdCard from '@/components/detail/card/card.vue';
import BaseCard from '@/components/detail/card/base-card.vue';
import TableCard from '@/components/detail/card/table-card.vue';
import TdCpu from '@/views/resource/monitor/components/cpu.vue';
import TdMemory from '@/views/resource/monitor/components/memory.vue';
import NetworkAll from '@/views/resource/monitor/components/network-all.vue';
import DiskIo from '@/views/resource/monitor/components/disk-io.vue';
import { setTimeout } from 'timers';
@Component({
  components: {
    TdDetail,
    TdCard,
    BaseCard,
    TableCard,
    TdCpu,
    TdMemory,
    NetworkAll,
    DiskIo,
  },
})
export default class  DService extends Vue {
  netCardList = [];
  servicesList = [];
  diskList: any = [];
  // overviewData = {};

  baseOptList = [
    {title: '物理机', key: 'pm_server_name', path: '/resource/pm-server'},
    {title: '宿主机', key: 'pserver_name', path: '/resource/server'},
    {title: '主机名', key: 'name'},
    {title: '类型', key: 'server_type_detail'},
    {title: '系统', key: 'os'},
    {title: '系统版本', key: 'os_version'},
    {title: 'CPU(核)', key: 'cpu'},
    {title: '内存(G)', key: 'memory'},
    {title: '硬盘(G)', key: 'disk'},
    {title: '主IP', key: 'primary_ip'},
    {title: '远程端口', key: 'remote_port'},
    {title: 'minion名称', key: 'minion_name'},
    {title: 'minion状态', key: 'minion_status'},
    {title: '网关', key: 'gateway'},
    {title: '子网掩码', key: 'subnet_mask'},
    {title: '区域', key: 'region'},
  ];

  // overviewOptList = [
  //   {title: 'System Uptime', key: 'system_uptime', color: '#ffd005'},
  //   {title: 'CPU Idel Time', key: 'cpu_idle_time', unit: '%'},
  //   {title: 'Free Memory', key: 'free_memory_percent', unit: '%'},
  //   {title: 'Available Memory', key: 'available_memory', unit: 'G'},
  //   {title: 'Run Porcess', key: 'running_processes_total'},
  //   {title: 'SystemLoginUsers', key: 'login_users_total'},
  //   {title: 'Agent Stat', key: 'agent_stat'},
  //   {title: 'PING', key: 'ping_stat'},
  //   {title: 'CPU Nums', key: 'cpu_num'},
  //   {title: 'MaxnumProcess', key: 'maximum_number_of_process'},
  //   {title: 'MaxnumOpenFile', key: 'maximum_number_of_opened_file'},
  // ];

  netCardOptList = [
    {title: 'name', key: 'name'},
    {title: 'ip', key: 'ip'},
    {title: 'mac', key: 'mac'},
    {title: 'speed', key: 'speed'},
  ];

  diskOptList = [
    {title: '分区', key: 'partition', align: 'center'},
    {title: '总量', key: 'total', align: 'center'},
    {title: '空闲量', key: 'free', align: 'center'},
    {title: '空闲率', key: 'percent', align: 'center'},
  ];

  virtualsList = [
    {title: '主机名', key: 'name', width: 180, className: 'cname'}, // className: 'cname'
    {title: 'IP地址', key: 'primary_ip'},
    {title: '系统', key: 'os'},
    {title: '硬盘', key: 'disk'},
    {title: '内存(G)', key: 'memory', align: 'center'},
  ];

  agentOptList = [
    {title: '应用名', key: 'name', className: 'cname'},
    {title: '类型', key: 'type'},
    {title: '版本', key: 'version'},
    {title: '集群模式', key: 'mode'},
    {title: '标签', key: 'label'},
  ];

  dbOptList = [
    {title: '应用名', key: 'name', className: 'cname'},
    {title: '类型', key: 'type'},
    {title: '版本', key: 'version'},
    {title: '连接地址', key: 'mode'},
  ];

  javaOptList = [
    {title: '应用名', key: 'name', className: 'cname'},
    {title: '类型', key: 'type'},
    {title: '负责人', key: 'version'},
    {title: '项目组', key: 'pjt_name'},
  ];

  get row() {
    return DetailModule.row;
  }

  // 监听row的变化
  @Watch('row')
  handleRow(row: any) {
    if (!row.network_card) {
      row.network_card = '[]';
    }
    this.netCardList = JSON.parse(row.network_card);
    setTimeout(() => {
      this.getMonitor(row);
    }, 50);
    // 如果是VM，则显示服务列表
    if (row.server_type === 0) {
      this.getServiceList(row.id);
    }
  }

  // 获取监控数据
  async getMonitor(row: any) {
    const params = {
      ip: row.primary_ip,
      name: row.name,
      id: row.id,
    };
    this.getDiskSpace(params);
    const refs: any = this.$refs;
    refs.cpu.getChart(params);
    refs.memory.getChart(params);
    refs.network.getChart(params);
    if (refs.diskIO) { // 某些模块隐藏了，所以需要判断
      refs.diskIO.getChart(params);
    }
  }

  // 获取硬盘数据
  async getDiskSpace(params: any) {
    try {
      this.diskList = await getDiskSpace(params);
    } catch (err) {
      console.error(err);
    }
  }
  // async  getOverview(params: any) {
  //   try {
  //   const result: any = await getSystemOverview(params);
  //   if (result.ping_stat) {
  //     result.ping_stat = 'OK';
  //   } else {
  //     result.ping_stat = 'ERR';
  //   }
  //   if (result.agent_stat) {
  //     result.agent_stat = 'UP';
  //   } else {
  //     result.agent_stat = 'DOWN';
  //   }
  //   this.overviewData = result;
  //   } catch (err) {
  //     console.error(err);
  //   }
  // }

  // 获取服务器关联服务的数据
  async getServiceList(id: any) {
    try {
      const rest: any = await rscListServices({id});
      const arr: any = [];
      const agent = rest.agent;
      if (agent && agent.data.length > 0) {
        arr.push({
          title: '关联serve',
          columns: agent.data,
          optList: this.agentOptList,
        });
      }
      const db = rest.db;
      if (db && db.data.length > 0) {
        arr.push({
          title: '关联DB',
          columns: db.data,
          optList: this.dbOptList,
        });
      }
      const java = rest.java;
      if (java && java.data.length > 0) {
        arr.push({
          title: '关联proxy',
          columns: java.data,
          optList: this.javaOptList,
        });
      }
      this.servicesList = arr;
    } catch (err) {
      console.error(err);
    }
  }
}
</script>
