<template>
 <td-detail title="项目组详情">
    <base-card
      :row="row"
      :optList="baseOptList">
    </base-card>
    <table-card
        title="项目成员"
        :columns ="row.members_detail?row.members_detail:[]"
        :optList="membersOptList">
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
export default class DProTeam extends Vue {
  baseOptList = [
    {title: '组名', key: 'name'},
    {title: '负责人', key: 'leader'},
    {title: '标签', key: 'label'},
    {title: '备注', key: 'remark'},
  ];
  membersOptList = [
    {title: '姓名', key: 'name'},
    {title: '账号', key: 'account'},
    {title: '密码', key: 'password'},
    {title: '备注', key: 'remark'},
  ];
  get row() {
    return DetailModule.row;
  }
}
</script>
