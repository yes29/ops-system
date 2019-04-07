<template>
  <td-table 
      :columns="columns"
      opt-width="240"
      proxy="cmdb/rsc"
      service="company">
    <td-detail></td-detail>
  </td-table>
</template>
<script lang="ts">
import { Component, Vue} from 'vue-property-decorator';
import TdTable from '@/components/baseTable/table.vue';
import TdDetail from './detail/d-company.vue';
@Component({components: {TdTable, TdDetail}})
export default class Company extends Vue {
  columns = [
    {title: '公司名称', key: 'name'},
    {title: '组织', key: 'organization'},
    {title: '备注', key: 'remark'},
  ];
}
</script>
