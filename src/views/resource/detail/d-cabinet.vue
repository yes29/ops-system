<template>
 <td-detail title="机柜详情">
   <base-card :row="row" :optList="baseOptList"></base-card>
    <table-card
        title="物理机"
        :keyword="row.name"
        path="/resource/pm-server"
        :columns ="row.pm_server_list"
        :optList="pmServerOptList">
    </table-card>
 </td-detail>
</template>
<script lang="ts">
import { Component, Vue} from 'vue-property-decorator';
import { DetailModule } from '@/store/modules/detail';
import TdDetail from '@/components/detail/detail.vue';
import BaseCard from '@/components/detail/card/base-card.vue';
import TableCard from '@/components/detail/card/table-card.vue';
@Component({components: {TdDetail, BaseCard, TableCard}})
export default class DCabinet extends Vue {

  baseOptList = [
    {title: '所属机房', key: 'data_center_name', path: '/resource/data-center'},
    {title: '机柜名称', key: 'name'},
    {title: '所属公司', key: 'company_name'},
  ];

  pmServerOptList = [
    {title: '名称', key: 'name', className: 'cname', width: 200},
    {title: 'SN编号', key: 'sn'},
    {title: '系统', key: 'os'},
    {title: '归属', key: 'company_name'},
  ];

  get row() {
    return DetailModule.row;
  }
}
</script>
