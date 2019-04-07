<template>
  <td-table 
      :columns="columns"
      opt-width="320"
      ref="table"
      :render="btn"
      proxy="uums/user"
      service="permission_group">
    <td-detail></td-detail>
    <ade-power-user @upup="$refs.table.getDataList()"></ade-power-user>
  </td-table>
</template>
<script lang="ts">
import { Component, Vue} from 'vue-property-decorator';
import TdTable from '@/components/baseTable/table.vue';
import BtnPowerSystem from './tableBtn/btn-power-system.vue';
import TdDetail from './detail/d-power-system.vue';
import AdePowerUser from './editor/ade-power-user.vue';
@Component({components: {TdTable, TdDetail, AdePowerUser}})
export default class PowerSystem extends Vue {
  btn = {
    type: 'render',
    render: (h: any, data: any) => {
      return h(BtnPowerSystem, {
        props: {
          row: data.row,
          reqDelete: data.reqDelete,
          handleEdit: data.handleEdit,
        },
      });
    },
  };
  columns = [
    {title: '名称', key: 'name'},
    {title: '项目组', key: 'project_team_name'},
  ];
}
</script>
