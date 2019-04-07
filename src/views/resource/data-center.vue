<template>
  <td-table 
      :columns="columns"
      proxy="cmdb/rsc"
      service="datacenter">
    <td-detail></td-detail>
  </td-table>
</template>
<script lang="ts">
import { Component, Vue} from 'vue-property-decorator';
import TdTable from '@/components/baseTable/table.vue';
import TdDetail from './detail/d-datacenter.vue';
@Component({components: {TdTable, TdDetail}})
export default class DataCenter extends Vue {
  columns = [
    {title: '机房名称', key: 'name', width: '120'},
    {title: '机房类型', key: 'data_center_type_detail', width: '90'},
    {title: '机柜数量', key: 'cabinet_count', align: 'center', width: '80'},
    {title: '带宽', key: 'bind_width', align: 'center', width: '130'},
    {title: '联系人', key: 'link_name', width: '100'},
    {title: '联系人电话', key: 'contact_phone', width: '120'},
    {title: '地址', key: 'address', width: '380'},
    {title: '备注', key: 'remark', width: '300'},
  ];
}
</script>
