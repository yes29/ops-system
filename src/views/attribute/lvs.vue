<template>
  <td-table
      :columns="columns"
      opt-width="240"
      ref="table"
      proxy="service/proxy_service"
      service="lvs">
    <td-detail></td-detail>  
  </td-table>
</template>
<script lang="ts">
import { Component, Vue} from 'vue-property-decorator';
import TdTable from '@/components/baseTable/table.vue';
import TdDetail from './detail/d-lvs.vue';
@Component({components: {TdTable, TdDetail}})
export default class Lvs extends Vue {
  columns = [
    {title: '应用名', key: 'name', width: 130},
    {title: '标签', key: 'label', width: 130},
    {title: '会话保持', key: 'session_time', width: 130},
    {title: '模式', key: 'mode', width: 130},
    {title: '版本', key: 'version'},
    {title: 'vip', key: 'vip'},
  ];
}
</script>
