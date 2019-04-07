<template>
  <td-table
      :columns="columns"
      ref="table"
      proxy="service/db_service"
      service="mysql">
    <td-detail></td-detail>  
  </td-table>
</template>
<script lang="ts">
import { Component, Vue} from 'vue-property-decorator';
import TdTable from '@/components/baseTable/table.vue';
import TdDetail from './detail/d-mysql.vue';
@Component({components: {TdTable, TdDetail}})
export default class MySql extends Vue {
  columns = [
    {title: '应用名', key: 'name'},
    {title: '标签', key: 'label'},
    {title: '版本', key: 'version'},
    {title: '集群模式', key: 'mode'},
    {title: '读写地址', key: 'rw_address'},
    {title: '写地址', key: 'read_address'},
    {title: '库', key: 'library'},
    {title: '备注', key: 'remark'},
  ];
}
</script>
