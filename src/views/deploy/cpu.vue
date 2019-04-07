<template>
  <td-table 
      :columns="columns"
      ref="table"
      proxy="cmdb/rsc"
      service="cpu">
    <td-detail></td-detail>
  </td-table>
</template>
<script lang="ts">
import { Component, Vue} from 'vue-property-decorator';
import TdTable from '@/components/baseTable/table.vue';
import TdDetail from './detail/d-cpu.vue';
@Component({components: {TdTable, TdDetail}})
export default class Cpu extends Vue {
  columns = [
    {title: '品牌', key: 'brand'},
    {title: '型号', key: 'type'},
    {title: '核心数', key: 'core_num', align: 'center'},
    {title: '线程数', key: 'thread_num', align: 'center'},
    {title: '基本频率', key: 'base_freq', align: 'center'},
    {title: '最大频率', key: 'max_freq', align: 'center'},
    {title: '缓存', key: 'cache', align: 'center'},
    {title: '总线速率', key: 'bus', align: 'center'},
  ];
}
</script>
