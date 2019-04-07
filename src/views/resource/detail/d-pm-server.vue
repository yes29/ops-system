<template>
<div class="clear">
  <edit-port
      ref="editPort"
      @upup="$emit('upup')"
      v-model="row.port_detail"
      :list="row.port_detail ? row.port_detail : []">
  </edit-port>
  <td-detail title="物理机详情">
   <base-card
        width="50%"
        :row="row"
        :optList="baseOptList">
      <p class="base w_100"
        slot="content"
        v-if="row.maintenance_records && row.maintenance_records.length > 0">
        <span class="c-888">维修记录：</span>
        {{row.maintenance_records.length}} 条
        <router-link
          class="c-link pl10 cp"
          :to="{
            path: '/resource/maintain-record',
            query:{
              keyword: row.name,
              openDetail: false
            }
          }">查看明细</router-link>
      </p>
    </base-card>
    <base-card
        class="mt20"
        title="CPU配置"
        width="50%"
        :row="row.cpu"
        :optList="cpuList">
      <!-- <span class="s-title">数量&nbsp;{{row.cpu_num ? row.cpu_num : 0}}</span> -->
    </base-card>
    <base-card
        class="mt20"
        title="内存配置"
        width="50%"
        :row="row.memory"
        :optList="memoryList">
      <!-- <span class="s-title">数量&nbsp;{{row.memory_num ? row.memory_num : 0}}</span> -->
    </base-card>
    <table-card
        title="raids配置"
        :columns ="row.raids"
        :optList="raidsList">
    </table-card>
    <table-card
        title="端口信息"
        :index="false"
        :columns ="row.port_detail ? row.port_detail : []"
        :optList="portOptList">
      <el-button
          slot="button"
          class="next"
          type="text"
          @click="$refs.editPort.show = true">
        <span style="font-size: 14px;">端口编辑</span>
      </el-button>
    </table-card>
    <table-card
        title="关联VM"
        :keyword="row.name"
        path="/resource/server"
        :columns ="row.virtual_machines ? row.virtual_machines: []"
        :optList="virtualsList">
    </table-card>
    <table-card
        title="维修记录"
        :keyword="row.name"
        path="/resource/maintain-record"
        :columns ="row.maintenance_records ? row.maintenance_records: []"
        :optList="maintenanceOptList">
    </table-card>
  </td-detail>
</div>  
</template>
<script lang="ts">
import { Component, Vue} from 'vue-property-decorator';
import { DetailModule } from '@/store/modules/detail';
import TdDetail from '@/components/detail/detail.vue';
import BaseCard from '@/components/detail/card/base-card.vue';
import TableCard from '@/components/detail/card/table-card.vue';
import EditPort from '@/views/resource/detail/modal/edit-port.vue';
@Component({components: {TdDetail, BaseCard, TableCard, EditPort}})
export default class DPmService extends Vue {

  baseOptList = [
    {title: '所属机柜', key: 'cabinet_name', path: '/resource/cabinet'},
    {title: '名称', key: 'name'},
    {title: 'SN编号', key: 'sn'},
    {title: '所属公司', key: 'company_name'},
    {title: '型号', key: 'model_number'},
    {title: '系统', key: 'os'},
    {title: 'cpu颗数', key: 'cpu_num', unit: '个'},
    {title: 'cpu总核', key: 'cpu_core', unit: '核'},
    {title: '内存颗数', key: 'memory_num', unit: '个'},
    {title: '内存总数', key: 'memory_space', unit: 'GB'},
    {title: '系统', key: 'os'},
    {title: '远程管理IP', key: 'remote_mgt'},
    {title: '状态', key: 'status_detail'},
    {title: '服务代码', key: 'service_code'},
    {title: '购买日期', key: 'purchase_date'},
    {title: '保修开始日期', key: 'repair_start_date'},
    {title: '保修结束日期', key: 'repair_end_date'},
    {title: '距离保修到期', key: 'remain_days'},
  ];

  cpuList = [
    {title: '品牌', key: 'brand'},
    {title: '型号', key: 'type'},
    {title: '核心数', key: 'core_num'},
    {title: '线程数', key: 'thread_num'},
    {title: '基本频率', key: 'base_freq'},
    {title: '最大频率', key: 'max_freq'},
    {title: '缓存', key: 'cache'},
    {title: '总线速率', key: 'bus'},
    {title: '备注', key: 'remark'},
  ];

  memoryList = [
    {title: '品牌', key: 'brand'},
    {title: '型号', key: 'type'},
    {title: '容量', key: 'space', align: 'center', unit: 'G'},
    {title: '工作电压', key: 'voltage', align: 'center'},
    {title: '制造商', key: 'manufacturer'},
    {title: '备注', key: 'remark'},
  ];

  raidsList = [
    {title: '类型', key: 'type'},
    {title: '硬盘', key: 'disk_type'},
    {title: '数量', key: 'disk_num'},
    {title: '容量', key: 'space'},
    {title: '标签', key: 'label'},
    {title: '备注', key: 'remark'},
  ];

  virtualsList = [
    {title: '主机名', key: 'name', className: 'cname'},
    {title: 'IP地址', key: 'primary_ip'},
    {title: '系统', key: 'os'},
    {title: '硬盘', key: 'disk'},
    {title: '内存', key: 'memory'},
  ];

  portOptList = [
    {title: '端口', key: 'port_name', width: 60, align: 'center'},
    {title: '端口类型', key: 'port_type_detail', width: 80, align: 'center'},
    {title: '设备类型', key: 'o_device_type_detail', align: 'center'},
    {title: '设备名称', key: 'o_device_name', align: 'center'},
    {title: '设备端口', key: 'o_port_name', align: 'center'} ,
  ];


  maintenanceOptList = [
    {title: '故障类型', key: 'breakdown_type'},
    {title: '故障处理', key: 'fault_treatment'},
    {title: '故障详情', key: 'breakdown_details'},
    {title: '维修日期', key: 'maintenance_time'},
    {title: '备注', key: 'remark'},
  ];

  get row() {
    return DetailModule.row;
  }

}
</script>
