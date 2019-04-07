<template>
  <td-table
      :columns="columns"
      ref="table"
      proxy="service/service"
      service="java">
    <td-detail></td-detail>  
  </td-table>
</template>
<script lang="ts">
import { Component, Vue} from 'vue-property-decorator';
import TdTable from '@/components/baseTable/table.vue';
import TdDetail from './detail/d-java.vue';
@Component({components: {TdTable, TdDetail}})
export default class Java extends Vue {
  columns = [
    {title: '名称', key: 'name'},
    {title: '简称', key: 'short_name'},
    {title: '项目组', key: 'project_team_name'},
    {title: '负责人', key: 'manager'},
    {title: '语言', key: 'development_language'},
    {title: '服务描述', key: 'describe'},
    {title: '部署路径', key: 'dpy_path'},
    {title: '启动参数', key: 'run_arg'},
];
}
</script>
