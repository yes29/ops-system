<template>
  <td-table
      :columns="columns"
      proxy="cmdb/rsc"
      service="maintenance/record">
    <td-detail></td-detail>
  </td-table>
</template>
<script lang="ts">
import { Component, Vue} from 'vue-property-decorator';
import TdTable from '@/components/baseTable/table.vue';
import TdDetail from './detail/d-maintain-record.vue';
@Component({components: {TdTable, TdDetail}})
export default class MaintainRecord extends Vue {
  columns = [
    {title: '维修对象', key: 'maintenance_object_display'},
    {title: '故障类型', key: 'breakdown_type'},
    {title: '维修日期', key: 'maintenance_time'},
    {title: '故障处理', key: 'fault_treatment'},
    {title: '故障详情', key: 'breakdown_details'},
    {title: '备注', key: 'remark'},
];
}
</script>
