<template>
  <td-table
      :columns="columns"
      ref="table"
      proxy="service/proxy_service"
      service="zookeeper">
    <td-detail></td-detail>  
  </td-table>
</template>
<script lang="ts">
import { Component, Vue} from 'vue-property-decorator';
import TdTable from '@/components/baseTable/table.vue';
import TdDetail from './detail/d-zookeeper.vue';
@Component({components: {TdTable, TdDetail}})
export default class Zookeeper extends Vue {
  columns = [
    {title: '应用名', key: 'name'},
    {title: '标签', key: 'label'},
    {title: '版本', key: 'version'},
    {title: '模式', key: 'mode', width: 100},
    {title: '连接地址', key: 'connect_address', width: 260},
    {title: '后台地址', key: 'manage_address', width: 220},
    {title: '备注', key: 'remark'},
  ];
}
</script>
