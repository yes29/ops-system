<template>
  <td-table
      :columns="columns"
      opt-width="240"
      proxy="cmdb/rsc"
      service="manufacture">
    <td-detail></td-detail> 
  </td-table>
</template>
<script lang="ts">
import { Component, Vue} from 'vue-property-decorator';
import TdTable from '@/components/baseTable/table.vue';
import TdDetail from './detail/d-manufacturer.vue';
@Component({components: {TdTable, TdDetail}})
export default class Manufacturer extends Vue {
  columns = [
    {title: '厂商名称', key: 'name', width: 200},
    {title: '电话', key: 'phone'},
    {title: '备注', key: 'remark'},
  ];
}
</script>
