<template>
  <td-table 
      :columns="columns"
      opt-width="240"
      ref="table"
      proxy="cmdb/rsc"
      service="memory">
    <td-detail></td-detail>
  </td-table>
</template>
<script lang="ts">
import { Component, Vue} from 'vue-property-decorator';
import TdTable from '@/components/baseTable/table.vue';
import TdDetail from './detail/d-memory.vue';
@Component({components: {TdTable, TdDetail}})
export default class Memory extends Vue {
  columns = [
    {title: '品牌', key: 'brand', width: 120},
    {title: '型号', key: 'type', width: 180},
    {title: '容量', key: 'space', unit: 'G', width: 120},
    {title: '电压', key: 'voltage', width: 120},
    {title: '频率', key: 'frequency', width: 120},
    {title: '制造商', key: 'manufacturer'},
    {title: '备注', key: 'remark'},
  ];
}
</script>
