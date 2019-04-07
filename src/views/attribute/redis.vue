<template>
  <td-table
      :columns="columns"
      ref="table"
      proxy="service/db_service"
      service="redis">
    <td-detail></td-detail>  
  </td-table>
</template>
<script lang="ts">
import { Component, Vue} from 'vue-property-decorator';
import TdTable from '@/components/baseTable/table.vue';
import TdDetail from './detail/d-redis.vue';
@Component({components: {TdTable, TdDetail}})
export default class Raids extends Vue {
  columns = [
    {title: '应用名', key: 'name'},
    {title: '标签', key: 'label'},
    {title: '版本', key: 'version'},
    {title: '模式', key: 'mode'},
    {title: '集群名', key: 'master_name'},
    {title: '哨兵地址', key: 'sentinel_address'},
    {title: 'HA连接地址', key: 'ha_address'},
  ];
}
</script>
