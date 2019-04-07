<template>
<div class="clear">
  <edit-port
      ref="editPort"
      @upup="$emit('upup')"
      v-model="row.port_detail"
      :list="row.port_detail ? row.port_detail : []">
  </edit-port>
  <td-detail title="网络设备详情">
    <base-card width="50%" :row="row" :optList="baseOptList">
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
import { Component, Vue, Watch} from 'vue-property-decorator';
import { DetailModule } from '@/store/modules/detail';
import TdDetail from '@/components/detail/detail.vue';
import BaseCard from '@/components/detail/card/base-card.vue';
import TableCard from '@/components/detail/card/table-card.vue';
import EditPort from './modal/edit-port.vue';
@Component({components: {TdDetail, BaseCard, TableCard, EditPort}})
export default class DDetworkDevices extends Vue {

 baseOptList = [
    {title: '设备名称', key: 'name'},
    {title: '设备型号', key: 'model_number'},
    {title: '设备类型', key: 'device_type_detail'},
    {title: '所属机柜', key: 'cabinet_name'},
    {title: '设备vlan', key: 'vlan'},
    {title: '端口速率', key: 'port_speed_detail'},
    {title: '端口类型', key: 'port_type_detail'},
    {title: '管理地址', key: 'mgt_addr'},
    {title: '管理方式', key: 'mgt_method'},
    {title: '管理用户', key: 'manager'},
    {title: '购买日期', key: 'purchase_date'},
    {title: '保修起始日期', key: 'repair_start_date'},
    {title: '保修结束日期', key: 'repair_end_date'},
    {title: '上架时间', key: 'active_time'},
    {title: '下架时间', key: 'deactive_time'},
    {title: '距离保修到期', key: 'remain_days'},
    {title: '状态', key: 'status_detail'},
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
