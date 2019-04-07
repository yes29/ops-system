<template>
  <td-table 
      :columns="columns"
      ref="table"
      proxy="cmdb/rsc"
      service="disk">
    <td-detail></td-detail>
  </td-table>
</template>
<script lang="ts">
import { Component, Vue} from 'vue-property-decorator';
import TdTable from '@/components/baseTable/table.vue';
import TdDetail from './detail/d-disk.vue';
@Component({components: {TdTable, TdDetail}})
export default class Disk extends Vue {
  columns = [
    {title: '型号', key: 'type'},
    {title: '品牌', key: 'brand'},
    {title: '类型', key: 'disk_type_detail'},
    {title: '容量', key: 'space', unit: 'G'},
    {title: '转速', key: 'speed'},
    {title: '备注', key: 'remark'},
  ];
}
</script>
