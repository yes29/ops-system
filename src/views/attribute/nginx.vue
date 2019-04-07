<template>
  <td-table
      :columns="columns"
      opt-width="260"
      ref="table"
      proxy="service/proxy_service"
      service="nginx">
    <td-detail></td-detail>  
  </td-table>
</template>
<script lang="ts">
import { Component, Vue} from 'vue-property-decorator';
import TdTable from '@/components/baseTable/table.vue';
import TdDetail from './detail/d-nginx.vue';
@Component({components: {TdTable, TdDetail}})
export default class Nginx extends Vue {
  columns = [
    {title: '应用名', key: 'name'},
    {title: '标签', key: 'label'},
    {title: '版本', key: 'version'},
    {title: '模式', key: 'mode'},
    {title: '备注', key: 'remark'},
  ];
}
</script>
