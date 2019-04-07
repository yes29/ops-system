<template>
 <td-detail title="机柜详情">
   <base-card :row="row" :optList="baseOptList"></base-card>
    <table-card
        title="机柜"
        :keyword="row.name"
        path="/resource/cabinet"
        :columns ="row.cabinet_list"
        :optList="cabinetOptList">
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
export default class DDataCenter extends Vue {

  baseOptList = [
    {title: '机房名称', key: 'name'},
    {title: '机房类型', key: 'data_center_type_detail'},
    {title: '机柜数量', key: 'cabinet_count', align: 'center'},
    {title: 'ip地址段', key: 'ip'},
    {title: '带宽', key: 'bind_width'},
    {title: '联系人', key: 'link_name'},
    {title: '联系人电话', key: 'contact_phone'},
    {title: '机房地址', key: 'address', className: 'all'},
  ];

  cabinetOptList = [
    {title: '机柜名称', key: 'name', align: 'center', className: 'cname'},
    {title: '所属公司', key: 'company_name', align: 'center'},
    {title: '物理机数量', key: 'pm_server_count', align: 'center'},
  ];

  get row() {
    return DetailModule.row;
  }
}
</script>
