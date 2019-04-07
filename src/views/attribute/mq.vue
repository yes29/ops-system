<template>
  <td-table
      :columns="columns"
      opt-width="240"
      ref="table"
      proxy="service/db_service"
      service="mq">
    <td-detail></td-detail>  
  </td-table>
</template>
<script lang="ts">
import { Component, Vue} from 'vue-property-decorator';
import TdTable from '@/components/baseTable/table.vue';
import TdDetail from './detail/d-mq.vue';
@Component({components: {TdTable, TdDetail}})
export default class Mq extends Vue {
  columns = [
    {title: '应用名', key: 'name', width: 180},
    {title: '标签', key: 'label', width: 180},
    {title: '模式', key: 'mode', width: 120},
    {title: '版本', key: 'version', width: 280},
    {title: '角色', key: 'role', width: 120},
    {title: 'HA连接地址', key: 'ha_address'},
  ];
}
</script>
