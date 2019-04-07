<template>
  <td-table 
      :columns="columns"
      :render="btn"
      :optMinWidth="180"
      proxy="cmdb/rsc"
      service="server">
    <td-detail></td-detail> 
  </td-table>
</template>
<script lang="ts">
import { Component, Vue} from 'vue-property-decorator';
import { AppModule } from '@/store/modules/app';
import TdTable from '@/components/baseTable/table.vue';
import BtnServer from './tableBtn/btn-server.vue';
import TdDetail from './detail/d-server.vue';
@Component({components: {TdTable, TdDetail}})
export default class Server extends Vue {
  btn = {
    type: 'render',
    render: (h: any, data: any) => {
      return h(BtnServer, {
        props: {
          row: data.row,
          reqDelete: data.reqDelete,
          handleEdit: data.handleEdit,
        },
      });
    },
  };
  columns = [
    {
      title: '类型',
      key: 'server_type_detail',
      width: '90',
      filters: [
        {type: '', text: '全部'},
        {type: 0, text: 'VM'},
        {type: 1, text: '宿主机'},
        // {id: 2, name: '容器'},
        {type: 3, text: '主机'},
        {type: 4, text: '阿里云'},
        {type: 5, text: '腾讯云'},
      ],
      filterMultiple: false,
      filterMethod(val: any) {
        const params = { key: 'server_type', val};
        AppModule.FiltersMethod(params);
      },
    },
    {title: '主机名', key: 'name', width: '180'},
    {title: '主IP', key: 'primary_ip', width: '120'},
    {title: '系统', key: 'os', align: 'center'},
    {title: '系统版本', key: 'os_version', align: 'center'},
    {title: 'CPU', key: 'cpu', align: 'center', unit: '核'},
    {title: '内存', key: 'memory', align: 'center', unit: 'G'},
    {title: '硬盘', key: 'disk', align: 'center', unit: 'G'},
    {title: 'minion名称', key: 'minion_name', align: 'center'},
    {title: 'minion状态', key: 'minion_status_detail', align: 'center'},
  ];
}
</script>
