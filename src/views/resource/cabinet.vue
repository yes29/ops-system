<template>
  <td-table 
      :columns="columns"
      opt-width="240"
      proxy="cmdb/rsc"
      service="cabinet">
    <td-detail></td-detail>  
  </td-table>
</template>
<script lang="ts">
import { Component, Vue} from 'vue-property-decorator';
import TdTable from '@/components/baseTable/table.vue';
import TdDetail from './detail/d-cabinet.vue';
@Component({components: {TdTable, TdDetail}})
export default class Cabinet extends Vue {
  columns = [
    {title: '机柜名称', key: 'name', width: '150'},
    {title: '所属机房', key: 'data_center_name', width: '220'},
    {title: '所属公司', key: 'company_name', width: '100'},
    {title: '物理机数量', key: 'pm_server_count', align: 'center', width: '220'},
    {title: '备注', key: 'remark'},
  ];
}
</script>
