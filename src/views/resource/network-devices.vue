<template>
  <td-table 
      :columns="columns"
      ref="table"
      proxy="cmdb/rsc"
      service="device">
    <td-detail @upup="$refs.table.getDataList()"></td-detail> 
  </td-table>
</template>
<script lang="ts">
import { Component, Vue} from 'vue-property-decorator';
import TdTable from '@/components/baseTable/table.vue';
import TdDetail from './detail/d-network-devices.vue';
@Component({components: {TdTable, TdDetail}})
export default class NetworkDevices extends Vue {
  columns = [
    {title: '名称', key: 'name', width: '300'},
    {title: '型号', key: 'model_number', width: '300'},
    {title: '类型', key: 'device_type_detail', width: '100'},
    {title: '所属机柜', key: 'cabinet_name'},
    // {title: '设备vlan', key: 'vlan'},
    {title: '端口速率', key: 'port_speed_detail'},
    {title: '端口类型', key: 'port_type_detail'},
    // {title: '管理地址', key: 'mgt_addr'},
    // {title: '管理方式', key: 'mgt_method'},
    // {title: '管理用户', key: 'manager'},
    // {title: '购买日期', key: 'purchase_date'},
    // {title: '保修起始日期', key: 'repair_start_date'},
    // {title: '保修终止日期', key: 'repair_end_date'},
    {title: '状态', key: 'status_detail', width: '100'},
    {title: '保修结束日期', key: 'repair_end_date', className: 'repair-end-date'},
    // {title: '上架时间', key: 'active_time'},
    // {title: '下架时间', key: 'deactive_time'},
    // {title: '留言', key: 'remark'}
  ];
}
</script>
