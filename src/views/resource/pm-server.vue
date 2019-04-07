<template>
  <td-table
      :columns="columns"
      proxy="cmdb/rsc"
      service="pmserver">
    <td-detail></td-detail> 
  </td-table>
</template>
<script lang="ts">
import { Component, Vue} from 'vue-property-decorator';
import TdTable from '@/components/baseTable/table.vue';
import TdDetail from './detail/d-pm-server.vue';
@Component({components: {TdTable, TdDetail}})
export default class PmServer extends Vue {
  columns = [
    {title: '名称', key: 'name'},
    {title: 'SN编号', key: 'sn'},
    {title: '所属机柜', key: 'cabinet_name'},
    {title: '虚拟机', key: 'vm_count', unit: '台'},
    {title: 'CPU', key: 'cpu_core', unit: '核'},
    {title: '内存', key: 'memory_space', unit: 'G'},
    {title: '硬盘', key: 'disk_core', unit: 'G'},
    {title: '状态', key: 'status_detail', width: '80'},
    {title: '保修结束日期', key: 'repair_end_date', className: 'repair-end-date'},
  ];
}
</script>
