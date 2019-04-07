<template>
  <td-table 
      :columns="columns"
      opt-width="280"
      proxy="uums/user"
      service="project_team">
    <td-detail></td-detail>
  </td-table>
</template>
<script lang="ts">
import { Component, Vue} from 'vue-property-decorator';
import TdTable from '@/components/baseTable/table.vue';
import TdDetail from './detail/d-pro-team.vue';
@Component({components: {TdTable, TdDetail}})
export default class ProTeam extends Vue {
  columns = [
    {title: '组名', key: 'name'},
    {title: '负责人', key: 'leader'},
    {title: '标签', key: 'label'},
    {title: '备注', key: 'remark'},
  ];
}
</script>
