<template>
  <td-table 
      :columns="columns"
      ref="table"
      proxy="cmdb/rsc"
      service="raid">
    <td-detail></td-detail>
  </td-table>
</template>
<script lang="ts">
import { Component, Vue} from 'vue-property-decorator';
import TdTable from '@/components/baseTable/table.vue';
import TdDetail from './detail/d-raid.vue';
@Component({components: {TdTable, TdDetail}})
export default class Raid extends Vue {
  columns = [
    {title: '硬盘', key: 'disk_type'},
    {title: '标签', key: 'label'},
    {title: '类型', key: 'type'},
    {title: '数量', key: 'disk_num', unit: '条'},
    {title: '容量', key: 'space', unit: 'G'},
    {title: '物理机', key: 'pm_server_name'},
    {title: '备注', key: 'remark'},
  ];
}
</script>
